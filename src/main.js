const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;

// Azure communication
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let window;

// Create electron window
const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  window.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  }));

  window.on("closed", () => {
    window = null;
  });

  //window.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// CONNECT TO AZURE, INSERT SQL INTO DATABASE
ipc.on("insert_data", (event, arg) => {
  try {
    const config = {
      authentication: {
        options: {
          userName: arg[1],
          password: arg[2]
        },
        type: "default"
      },
      server: arg[3],
      options: {
        database: arg[4],
        encrypt: true
      }
    };

    const connection = new Connection(config);
    connection.connect();

    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", err => {
      if (err) {
        event.reply("err", [err.message]);
        console.error(err.message);
      } 
      else {
        event.reply("connect_success", ["Connected! Inserting data..."]);
        insertData();
      }
    });

    function insertData(){
      const setIdentity = "SET IDENTITY_INSERT dbo.CAMPSESSIONS ON;\n";
      console.log(setIdentity + arg[0]);
      const request = new Request(setIdentity + arg[0], (err, rowCount) => {
        if (err){
          if (err.toString().includes("duplicate")){
            event.reply("err", [err.message]);
          }
          else{
            event.reply("err", [err.message]);
          }
          console.error(err.message);
        }
      });
      connection.execSql(request);

      request.on("doneProc", (rowCount, more, returnStatus, rows) => {
        if (returnStatus == 0){
          event.reply("insert_success", ["Database updated!"]);
        }
      });
    }
  }
  catch (e){
    console.error(e);
  }  
});
