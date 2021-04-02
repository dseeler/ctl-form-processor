const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;
const fs = require("fs");

// Azure communication
const Connection = require("tedious").Connection;
const Request = require("tedious").Request;
const { ipcMain } = require("electron");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

let window;

// Create electron window
const createWindow = () => {
	window = new BrowserWindow({
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

// Connect to Azure Camp DB and insert data
ipc.on("insert_data", (event, arg) => {
	try {
		// Azure credentials + DB specification
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

		// Establish a connection
		const connection = new Connection(config);
		connection.connect();

		// On successful connection, insert data
		connection.on("connect", err => {
			if (err) {
				event.reply("err", [err.message, "Connection Error"]);
				console.error(err.message);
			}
			else {
				event.reply("success", ["Inserting data..."]);
				insertData();
			}
		});

		// Execute SQL queries
		function insertData() {
			const setIdentity = "SET IDENTITY_INSERT dbo.CAMPSESSIONS ON;\n";
			const request = new Request(setIdentity + arg[0], (err, rowCount) => {
				if (err) {
					if (err.toString().includes("duplicate")) {
						event.reply("err", [err.message, "Duplicate Key: The given CampID is already in use"]);
					}
					else {
						event.reply("err", [err.message, "Invalid SQL: Please fix the .xlsx file"]);
					}
					console.error(err.message);
				}
			});
			connection.execSql(request);

			// Query response
			request.on("doneProc", (rowCount, more, returnStatus, rows) => {
				if (returnStatus == 0) {
					event.reply("success", ["Database updated!"]);
				}
			});
		}
	}
	catch (e) {
		console.error(e);
	}
});

// Frontend will request remembered credentials when app is loaded
ipcMain.on("creds_req", (event, arg) => {
	try{
		const filePath = path.join(app.getPath("userData"), "credentials.txt");
		fs.readFile(filePath, (err, buf) => {
			if (err) {
				console.log(err);
			}
			else if (buf.toString().length > 0) {
				const credentials = buf.toString().split(" ");
				event.reply("creds_res", credentials);
			}
		});
	}
	catch (e){
		console.error(e);
	}
});

// Update remembered credentialss
ipcMain.on("update_creds", (event, arg) => {
	const filePath = path.join(app.getPath("userData"), "credentials.txt");
	fs.writeFileSync(filePath, arg);
});
