const electron = require("electron");
const ipc = electron.ipcRenderer;
const reader = require("read-excel-file");
const input = document.getElementById("input");

// Read file input
input.addEventListener("change", () => {
   try{
      const insertStmnts = [];

      // Extract .xlsx data by cell
      reader(input.files[0]).then((rows) => {
         for (let i = 1; i < rows.length; i++){
            let sql = "";

             /* -----GENERATE "FINAL VERSION" FORM----- */

            // code
            sql += rows[i][0];

            // CampID
            sql += formatCell("temp");

            // PartnerID
            sql += formatCell(partnerIDs[rows[i][5]]);

            // CampProgram
            sql += formatCell(rows[i][6]);

            // SummerOrNonSummer
            sql += formatCell(rows[i][9]);

            // SiteLocation
            sql += formatCell(rows[i][7]);

            // CamperType
            sql += formatCell(rows[i][8]);

            // StartDate
            sql += formatCell(rows[i][17]);

            // EndDate
            sql += formatCell(rows[i][18]);

            // CheckInTime
            sql += formatCell(rows[i][19], true); // FORMAT THIS TIME

            // CheckOutTime
            sql += formatCell(rows[i][20], true); // FORMAT THIS TIME

            // CamperDays
            sql += formatCell(0); // No value?

            // CamperMeals
            sql += formatCell(0); // No value?

            // VolunteerDays
            sql += formatCell(0); // No value?

            // VolunteerMeals
            sql += formatCell(0); // No value?

            // BillingContactName
            sql += formatCell(rows[i][26]);

            // BillingContactEmail
            sql += formatCell(rows[i][27]);

            // BillingContactPhone
            sql += formatCell(rows[i][28]);

            // BillingContactAddress
            sql += formatCell(rows[i][29]);

            // BillingContactCity
            sql += formatCell(rows[i][30]);

            // BillingContactState
            sql += formatCell(rows[i][31]);

            // BillingContactZip
            sql += formatCell(rows[i][32]);

            // CampContactName
            sql += formatCell(rows[i][33]);

            // CampContactEmail
            sql += formatCell(rows[i][34]);

            // CampContactPhone
            sql += formatCell(rows[i][35]);

            // CampContactAdress
            sql += formatCell(rows[i][36]);

            // CampContactCity
            sql += formatCell(rows[i][37]);

            // CampContactState
            sql += formatCell(rows[i][38]);

            // CampContactZip
            // Check if someone used "NA" for their second contact
            if (rows[i][33] == "NA"){
               sql += formatCell(rows[i][39]);
            }
            else{
               sql += formatCell(0); // No value?
            }
            
            // CTLStaffContact
            sql += formatCell(""); // No value?

            // CTLDirected
            sql += formatCell(0); // No value?

            // PreArrivalFormsComplete
            sql += formatCell(0); // No value?

            // IntacctCampSessionID
            sql += formatCell(0); // No value?

            // ProgramNotes
            sql += formatCell(""); // No value?

            // FoodServiceNotes
            sql += formatCell(""); // No value?

            // FacilityNotes
            sql += formatCell(""); // No value?

            // IncidentNodes
            sql += formatCell(""); // No value?

            // PartnershipNotes 
            sql += formatCell(""); // No value?

            // ProgramNeeds
            sql += formatCell(rows[i][25]);

            // MealsRequested
            sql += formatCell(rows[i][21]);

            // CabinsProjected
            sql += formatCell(rows[i][22]);

            // BuildingNeeds
            sql += formatCell(rows[i][23]);

            // EquipmentNeeds
            sql += formatCell(rows[i][24]);

            // FullProgramStaff
            sql += formatCell(""); // No value?

            // DayStaff
            sql += formatCell(""); // No value?
                           
            // NeedsNotes
            sql += formatCell(rows[i][40]);

            // CampCancelled
            sql += formatCell(0); // No value?

            // DirMedicalTeam
            sql += formatCell(0); // No value?

            // DirMedicalTeamNotes
            sql += formatCell(""); // No value?

            // DirBillableHours
            sql += formatCell(""); // No value?

            // DirBillableHoursNotes
            sql += formatCell(""); // No value?

            // DirVolunteers
            sql += formatCell(""); // No value?

            // DirStaffingRatioNotes
            sql += formatCell(""); // No value?

            // DirAddIEveningProgram
            sql += formatCell(0); // No value?

            // DirTshirts
            sql += formatCell(0); // No value?

            // DirPhotography
            sql += formatCell(0); // No value?

            // DirNotes
            sql += formatCell(""); // No value?

            // Horseback
            // Change any 0's to blank cells
            if (rows[i][16] == 0){
               // Blank
               sql += formatCell(""); // No value?
            }
            else{
               sql += formatCell(rows[i][16]);
            }
            
            // Add SQL insert statement to list
            insertStmnts.push(sql);
         }

         // Send to backend
         ipc.send("data", insertStmnts);
      });
   }
   catch(e){
      console.error(e);
   }
});
   
function formatCell(data){
   return ",'" + data + "'";
}

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