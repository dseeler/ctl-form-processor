const electron = require("electron");
const ipc = electron.ipcRenderer;
const reader = require("read-excel-file");
const input = document.getElementById("input");

// Read file input
input.addEventListener("change", () => {
   const data = [];

   // Extract .xlsx data by cell
   reader(input.files[0]).then((rows) => {
      for (let i = 1; i < rows.length; i++){
         for (let j = 0; j < rows[i].length; j++){
            let sql = insertStatement;
            console.log(rows[i][j]);
         }
      }
   });
})

// First part of the SQL insert statement (static)
const insertStatement = "INSERT into DBO.CAMPSESSIONS ([CampID],[PartnerID],[CampProgram],[SummerOrNonSummer],[SiteLocation],[CamperType],[StartDate],[EndDate],[CheckInTime],[CheckOutTime],[CamperDays],[CamperMeals],[VolunteerDays],[VolunteerMeals],[BillingContactName],[BillingContactEmail],[BillingContactPhone],[BillingContactAddress],[BillingContactCity],[BillingContactState],[BillingContactZip],[CampContactName],[CampContactEmail],[CampContactPhone],[CampContactAdress],[CampContactCity],[CampContactState],[CampContactZip],[CTLStaffContact],[CTLDirected],[PreArrivalFormsComplete],[IntacctCampSessionID],[ProgramNotes],[FoodServiceNotes],[FacilityNotes],[IncidentNotes],[PartnershipNotes],[ProgramNeeds],[MealsRequested],[CabinsProjected],[BuildingNeeds],[EquipmentNeeds],[FullProgramStaff],[DayStaff],[NeedsNotes],[CampCancelled],[DirMedicalTeam],[DirMedicalTeamNotes],[DirBillableHours],[DirBillableHoursNotes],[DirVolunteers],[DirStaffingRatioNotes],[DirAddlEveningProgram],[DirTshirts],[DirPhotography],[DirNotes]) VALUES (";

// Partner Organization dictionary
const parterIDs = {
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