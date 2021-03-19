const electron = require("electron");
const ipc = electron.ipcRenderer;
const reader = require("read-excel-file");
const fs = require("fs");

const input = document.getElementById("input");
const sendButton = document.getElementById("sendButton");
const statusMsg = document.getElementById("status");
const campID = document.getElementById("campID");
const azureDiv = document.getElementById("azure-div");
const campID_button = document.getElementById("campID-button");
const output = document.getElementById("raw-sql");
const outputContainer = document.getElementById("raw-sql-container");

// Send data to backend on Connect button click
sendButton.addEventListener("click", () => {
   try{
      const username = document.getElementById("username").value; // uga-ctl
      const password = document.getElementById("password").value; // 123abc_321
      const server = document.getElementById("server").value; // ctl.database.windows.net
      const database = document.getElementById("database").value; // CTL-SQL

      // Send
      ipc.send("insert_data", [bulkStmnt, username, password, server, database]);

      // Reset styling
      revertErrorStyling();
      statusMsg.innerHTML = "Connecting...";

      // On connection or insert error
      ipc.on("err", (event, arg) => {
         statusMsg.style.color = "red";

         if (arg[1].includes("Connection Error")){
            azureDiv.style.border = "1px solid red";
            statusMsg.innerHTML = arg[0];
         }
         else if (arg[1].includes("Duplicate Key")){
            campID.style.border = "1px solid red";
            statusMsg.innerHTML = arg[1];
            output.innerHTML = "<div style='color: red'>" + arg[0] + "<br><br><b>Update the CampID and re-upload the file</b></div>";

         }
         else if (arg[1].includes("Invalid SQL")){
            statusMsg.innerHTML = arg[1];
            outputContainer.style.border = "1px solid red";
            output.innerHTML = "<div style='color: red'>" + arg[0] + "</div>" + 
            "<span style='color: red'>------------------------------------------------------------</span><br>" + output.innerHTML; 
         }
      });

      // On connection/insert success
      ipc.on("success", (event, arg) => {
         statusMsg.innerHTML = arg[0];
         if (arg[0].includes("Database updated!")){
            statusMsg.style.color = "green";
         }
      });
   }
   catch (e){
      console.error(e);
   }
});

// Process Excel file
let insertStmnts = []; // Raw SQL inserts for copy and paste (not sent to backend -- only for display/reference)
let bulkStmnt = ""; // Bulk SQL statement to be inserted into DB
input.addEventListener("input", () => {
   try{

      // Clear existing output
      insertStmnts = [];
      bulkStmnt = insertPrefix;

      // Reset text and styling
      document.getElementById("raw-sql").innerHTML = "";
      document.getElementById("process-count").innerHTML = "Processing...";
      statusMsg.innerHTML = "";
      revertErrorStyling();

      // Extract .xlsx data by cell
      reader(input.files[0]).then((rows) => {
         for (let i = 1; i < rows.length; i++){
            let sql = "";

             /* -----GENERATE "FINAL VERSION" DATA----- */

            // code
            sql += insertPrefix + "(";
            bulkStmnt += "(";

            // CampID
            sql += "'" + (parseInt(campID.value) + i - 1) + "'"; // Retrieve CampID
            bulkStmnt += "'" + (parseInt(campID.value) + i - 1) + "'";
            

            // PartnerID
            sql += formatCell(partnerIDs[rows[i][5]]);
            bulkStmnt += formatCell(partnerIDs[rows[i][5]]);

            // CampProgram
            sql += formatCell(rows[i][6]);
            bulkStmnt += formatCell(rows[i][6]);

            // SummerOrNonSummer
            sql += formatCell(rows[i][9]);
            bulkStmnt += formatCell(rows[i][9]);

            // SiteLocation
            sql += formatCell(rows[i][7]);
            bulkStmnt += formatCell(rows[i][7]);

            // CamperType
            sql += formatCell(rows[i][8]);
            bulkStmnt += formatCell(rows[i][8]);

            // StartDate
            sql += formatCell(rows[i][17], "date");
            bulkStmnt += formatCell(rows[i][17], "date");

            // EndDate
            sql += formatCell(rows[i][18], "date");
            bulkStmnt += formatCell(rows[i][18], "date");

            // CheckInTime
            sql += formatCell(rows[i][19], "time"); 
            bulkStmnt += formatCell(rows[i][19], "time");

            // CheckOutTime
            sql += formatCell(rows[i][20], "time");
            bulkStmnt += formatCell(rows[i][20], "time");

            // CamperDays
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // CamperMeals
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // VolunteerDays
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // VolunteerMeals
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // BillingContactName
            sql += formatCell(rows[i][26]);
            bulkStmnt += formatCell(rows[i][26]);

            // BillingContactEmail
            sql += formatCell(rows[i][27]);
            bulkStmnt += formatCell(rows[i][27]);

            // BillingContactPhone
            sql += formatCell(rows[i][28]);
            bulkStmnt += formatCell(rows[i][28]);

            // BillingContactAddress
            sql += formatCell(rows[i][29]);
            bulkStmnt += formatCell(rows[i][29]);

            // BillingContactCity
            sql += formatCell(rows[i][30]);
            bulkStmnt += formatCell(rows[i][30]);

            // BillingContactState
            sql += formatCell(rows[i][31]);
            bulkStmnt += formatCell(rows[i][31]);

            // BillingContactZip
            sql += formatCell(rows[i][32], "zip");
            bulkStmnt += formatCell(rows[i][32], "zip");

            // CampContactName
            sql += formatCell(rows[i][33]);
            bulkStmnt += formatCell(rows[i][33]);

            // CampContactEmail
            sql += formatCell(rows[i][34]);
            bulkStmnt += formatCell(rows[i][34]);

            // CampContactPhone
            sql += formatCell(rows[i][35]);
            bulkStmnt += formatCell(rows[i][35]);

            // CampContactAdress
            sql += formatCell(rows[i][36]);
            bulkStmnt += formatCell(rows[i][36]);

            // CampContactCity
            sql += formatCell(rows[i][37]);
            bulkStmnt += formatCell(rows[i][37]);

            // CampContactState
            sql += formatCell(rows[i][38], "state");
            bulkStmnt += formatCell(rows[i][38], "state");

            // CampContactZip
            // Check if someone used "NA" for their second contact
            if (rows[i][33] == "NA"){
               sql += formatCell(rows[i][39], "zip");
               bulkStmnt += formatCell(rows[i][39], "zip");
            }
            else{
               sql += formatCell(0); // No value?
               bulkStmnt += formatCell(0);
            }
            
            // CTLStaffContact
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // CTLDirected
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // PreArrivalFormsComplete
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // IntacctCampSessionID
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // ProgramNotes
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // FoodServiceNotes
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // FacilityNotes
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // IncidentNodes
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // PartnershipNotes 
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // ProgramNeeds
            sql += formatCell(rows[i][25]);
            bulkStmnt += formatCell(rows[i][25]);

            // MealsRequested
            sql += formatCell(rows[i][21]);
            bulkStmnt += formatCell(rows[i][21]);

            // CabinsProjected
            sql += formatCell(rows[i][22]);
            bulkStmnt += formatCell(rows[i][22]);

            // BuildingNeeds
            sql += formatCell(rows[i][23]);
            bulkStmnt += formatCell(rows[i][23]);

            // EquipmentNeeds
            sql += formatCell(rows[i][24]);
            bulkStmnt += formatCell(rows[i][24]);

            // FullProgramStaff
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // DayStaff
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");
                           
            // NeedsNotes
            sql += formatCell(rows[i][40]);
            bulkStmnt += formatCell(rows[i][40]);

            // CampCancelled
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // DirMedicalTeam
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // DirMedicalTeamNotes
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // DirBillableHours
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // DirBillableHoursNotes
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // DirVolunteers
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // DirStaffingRatioNotes
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            // DirAddIEveningProgram
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // DirTshirts
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // DirPhotography
            sql += formatCell(0); // No value?
            bulkStmnt += formatCell(0);

            // DirNotes
            sql += formatCell(""); // No value?
            bulkStmnt += formatCell("");

            /*
            // Horseback
            // Change any 0's to blank cells
            if (rows[i][16] == null || rows[i][16] == 0){
               // Blank
               sql += formatCell(""); // No value?
            }
            else{
               sql += formatCell(rows[i][16]);
            }
            */
            
            // Close statement VALUES
            sql += ");";


            // Close bulk statement VALUES
            if (i != rows.length - 1){
               bulkStmnt += "),";
            }
            else{
               bulkStmnt += ");";
            }

            // Add SQL insert statement to list
            insertStmnts.push(sql);

            // Add raw SQL output
            document.getElementById("raw-sql").innerHTML += "<div>" + sql + "</div>" + "<br><span>---------------------------- <b>" + i + "</b> ----------------------------</span><br><br>";
            document.getElementById("process-count").innerHTML = insertStmnts.length + " forms processed";
         }

         sendButton.disabled = false;

      }).catch(error => console.log(error));
   }
   catch(e){ 
      input.style.border = "1px solid red";
      document.getElementById("raw-sql").innerHTML = "Invalid .xlsx file";
      console.error(e);
   }
});
   
function formatCell(data, type){
   if (data != null){
      data = data.toString().replaceAll("'", "").trim(); // Remove all '
   }
   else{
      data = ""; // Replace nulls
   }

   // Specific formatting
   switch (type){
      case "time":
         if (data.includes(":")){
            const hour = data.substring(0, data.indexOf(":"));
            const minute = data.substring(data.indexOf(":"), data.indexOf(":") + 3);
            if (data.toUpperCase().includes("AM")){
               data = hour + minute + " AM";
            }
            else if (data.toUpperCase().includes("PM")){
               data = hour + minute + " PM";
            }
         }
         else if (/\d/.test(data)){
            const hour = data.match(/\d/)[0];
            const minute = ":00";
            if (data.toUpperCase().includes("AM")){
               data = hour + minute + " AM";
            }
            else if (data.toUpperCase().includes("PM")){
               data = hour + minute + " PM";
            }
         }
      break; 
      case "date":
         data = data.substring(4, data.indexOf("202") + 4);
         const month = getMonth(data.substring(0, 3));
         data = data.substring(4);
         const day = data.substring(0, data.indexOf(" "));
         const year = data.substring(data.indexOf(" ") + 1, data.indexOf(" ") + 5);
         data = month + "/" + day + "/" + year;
      break;
      case "zip":
         if (data.length >= 5){
            data = data.substring(0, 5);
         }
      break;
      case "state":
         if (data.length > 2){
            for (let state in state_abbrev){
               if (data.toLowerCase().includes(state)){
                  data = state_abbrev[state];
                  break;
               }
            }
            data = "";
         }
         else{
            data = data.toUpperCase();
         }
      break;
   }
   return ",'" + data + "'";
}

function getMonth(month){
   switch (month){
      case "Jan": 
         return 1;
      case "Feb":
         return 2;
      case "Mar":
         return 3;
      case "Apr":
         return 4;
      case "May":
         return 5;
      case "Jun":
         return 6;
      case "Jul":
         return 7;
      case "Aug":
         return 8;
      case "Sep":
         return 9;
      case "Oct":
         return 10;
      case "Nov":
         return 11;
      case "Dec":
         return 12;
   }
}

// Static prefix
const insertPrefix = "INSERT into DBO.CAMPSESSIONS ([CampID],[PartnerID],[CampProgram],[SummerOrNonSummer],[SiteLocation],[CamperType],[StartDate],[EndDate],[CheckInTime],[CheckOutTime],[CamperDays],[CamperMeals],[VolunteerDays],[VolunteerMeals],[BillingContactName],[BillingContactEmail],[BillingContactPhone],[BillingContactAddress],[BillingContactCity],[BillingContactState],[BillingContactZip],[CampContactName],[CampContactEmail],[CampContactPhone],[CampContactAdress],[CampContactCity],[CampContactState],[CampContactZip],[CTLStaffContact],[CTLDirected],[PreArrivalFormsComplete],[IntacctCampSessionID],[ProgramNotes],[FoodServiceNotes],[FacilityNotes],[IncidentNotes],[PartnershipNotes],[ProgramNeeds],[MealsRequested],[CabinsProjected],[BuildingNeeds],[EquipmentNeeds],[FullProgramStaff],[DayStaff],[NeedsNotes],[CampCancelled],[DirMedicalTeam],[DirMedicalTeamNotes],[DirBillableHours],[DirBillableHoursNotes],[DirVolunteers],[DirStaffingRatioNotes],[DirAddlEveningProgram],[DirTshirts],[DirPhotography],[DirNotes]) VALUES ";

// Partner Organization dictionary
const partnerIDs = {
   "American Lung Association": 1,
   "Girl Scouts of Greater Atlanta": 2,
   "Annandale Village": 3,
   "Bethlehem Christian Academy": 4,
   "BlazeSports America, Inc.": 5,
   "Arthritis Foundation": 6,
   "Camp Blue Skies Foundation": 7,
   "FOCUS + Fragile Kids": 9,
   "Brain Injury Association of Georgia": 10,
   "Hearts Everywhere Reaching Out for Children, Inc.": 11,
   "Camp Horizon, Inc.": 12,
   "Abbey Hospice Foundation": 14,
   "Camp Kudzu": 15,
   "Sickle Cell Foundation of Georgia": 16,
   "CHOA - Transplant": 17,
   "Suicide Prevention Action Network, Georgia": 18,
   "Children's Healthcare of Georgia": 19,
   "Camp Sunshine, Inc.": 20,
   "Foster Siblings Reunited": 21,
   "Muscular Dystrophy Association": 22,
   "Hemophilia of Georgia": 23,
   "Georgia Celiac Foundation": 24,
   "CHOA - CarpeDiem": 25,
   "CHOA - Courage": 26,
   "CHOA - Marcus": 27,
   "CHOA - Strong4Life": 28,
   "CHOA - Braveheart": 29,
   "CHOA - KrazyLegs": 30,
   "CHOA - ThalPals": 31,
   "Developmental Disabilities Ministries": 32,
   "Fugees Family": 33,
   "Grace United Methodist Church": 34,
   "Jewish Family and Career Services": 35,
   "Kate's Club": 36,
   "Painless But Hopeful": 38,
   "Catholic Archdiocese of Atlanta": 39,
   "Tourette Information Center and Support": 40,
   "Trinity School, Inc.": 41,
   "University of Akron": 42,
   "Visiting Nurse Health System, Inc.": 43,
   "Wounded Warrior Project": 44,
   "Special Touch Ministry, Inc.": 45,
   "The Kyle Pease Foundation": 46,
   "CHOA - NoLimb": 49,
   "University of Georgia": 50,
   "Georgia Firefighters Burn Foundation, Inc.": 51,
   "Kidz2leaders, Inc.": 52,
   "Crohn's & Colitis Foundation": 54,
   "Georgia PKU Connect": 55,
   "The Tree House, Inc.": 56,
   "Trach Me Away": 57,
   "Marfan Foundation": 59,
   "Walton Options": 60,
   "Camp Corral": 62,
   "CHOA - Crescent Moon": 63,
   "Georgia Institute of Technology": 64,
   "Northside Hospital": 66,
   "Drew Charter School": 67,
   "Friends of L'Arche Atlanta": 68,
   "Hospice Atlanta": 71,
   "Spectrum Autism Support": 72,
   "The Galloway School": 73,
   "Extra Special People": 74,
   "Waldorf School": 75,
   "Hope Haven": 76,
   "Hope Loves Company": 77,
   "Camp Twin Lakes Program": 81,
   "Emory University": 82,
   "Children's Healthcare of Atlanta - Unspecified Group": 83,
   "Barrow County Chamber of Commerce": 84,
   "Social Skills Today": 85,
   "Brookwood Highschool": 86,
   "Leadership Atlanta": 87,
   "Destination Outreach": 91,
   "Experience Camps": 92
};

const state_abbrev = {
   'alabama': 'AL',
   'alaska': 'AK',
   'american samoa': 'AS',
   'arizona': 'AZ',
   'arkansas': 'AR',
   'california': 'CA',
   'colorado': 'CO',
   'connecticut': 'CT',
   'delaware': 'DE',
   'district of columbia': 'DC',
   'florida': 'FL',
   'georgia': 'GA',
   'guam': 'GU',
   'hawaii': 'HI',
   'idaho': 'ID',
   'illinois': 'IL',
   'indiana': 'IN',
   'iowa': 'IA',
   'kansas': 'KS',
   'kentucky': 'KY',
   'louisiana': 'LA',
   'maine': 'ME',
   'maryland': 'MD',
   'massachusetts': 'MA',
   'michigan': 'MI',
   'minnesota': 'MN',
   'mississippi': 'MS',
   'missouri': 'MO',
   'montana': 'MT',
   'nebraska': 'NE',
   'nevada': 'NV',
   'new hampshire': 'NH',
   'new jersey': 'NJ',
   'new mexico': 'NM',
   'new york': 'NY',
   'north carolina': 'NC',
   'north dakota': 'ND',
   'northern mariana islands':'MP',
   'ohio': 'OH',
   'oklahoma': 'OK',
   'oregon': 'OR',
   'pennsylvania': 'PA',
   'puerto Rico': 'PR',
   'rhode Island': 'RI',
   'south carolina': 'SC',
   'south dakota': 'SD',
   'tennessee': 'TN',
   'texas': 'TX',
   'utah': 'UT',
   'vermont': 'VT',
   'virgin islands': 'VI',
   'virginia': 'VA',
   'washington': 'WA',
   'west virginia': 'WV',
   'wisconsin': 'WI',
   'wyoming': 'WY'
}

campID_button.addEventListener("click", () => {
   if (campID.value != ""){
      input.disabled = false;
      input.style.backgroundColor = "white";
      campID.style.border = "1px solid black";
      document.getElementById("campID-notice").style.display = "none";
   }
   else{
      campID.style.border = "1px solid red";
   }
});

function reset(){

}

function revertErrorStyling(){
   statusMsg.style.color = "black";
   azureDiv.style.border = "1px solid black";
   campID.style.border = "1px solid black";
   input.style.border = "1px solid black";
   outputContainer.style.border = "1px solid black";
}