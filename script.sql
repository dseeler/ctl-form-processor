/****** Object:  Database [CTL-SQL]    Script Date: 5/17/2021 2:58:58 PM ******/
CREATE DATABASE [CTL-SQL]  (EDITION = 'Standard', SERVICE_OBJECTIVE = 'S1', MAXSIZE = 250 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS;
GO
ALTER DATABASE [CTL-SQL] SET COMPATIBILITY_LEVEL = 150
GO
ALTER DATABASE [CTL-SQL] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CTL-SQL] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CTL-SQL] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CTL-SQL] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CTL-SQL] SET ARITHABORT OFF 
GO
ALTER DATABASE [CTL-SQL] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CTL-SQL] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CTL-SQL] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CTL-SQL] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CTL-SQL] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CTL-SQL] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CTL-SQL] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CTL-SQL] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CTL-SQL] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [CTL-SQL] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CTL-SQL] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [CTL-SQL] SET  MULTI_USER 
GO
ALTER DATABASE [CTL-SQL] SET ENCRYPTION ON
GO
ALTER DATABASE [CTL-SQL] SET QUERY_STORE = ON
GO
ALTER DATABASE [CTL-SQL] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/*** The scripts of database scoped configurations in Azure should be executed inside the target database connection. ***/
GO
-- ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 8;
GO
/****** Object:  User [CTL]    Script Date: 5/17/2021 2:58:58 PM ******/
CREATE USER [CTL] FOR LOGIN [CTL] WITH DEFAULT_SCHEMA=[dbo]
GO
sys.sp_addrolemember @rolename = N'db_owner', @membername = N'CTL'
GO
/****** Object:  Table [dbo].[BillingData]    Script Date: 5/17/2021 2:58:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BillingData](
	[BillID] [smallint] IDENTITY(1,1) NOT NULL,
	[CampID] [smallint] NULL,
	[BillStatus] [varchar](31) NULL,
	[UserGroup1Projected] [smallint] NULL,
	[UserGroup110-Day] [smallint] NULL,
	[UserGroup1Actual] [smallint] NULL,
	[UserGroup2Projected] [smallint] NULL,
	[UserGroup210-Day] [smallint] NULL,
	[UserGroup2Actual] [smallint] NULL,
	[UserGroup3Projected] [smallint] NULL,
	[UserGroup310-Day] [smallint] NULL,
	[UserGroup3Actual] [smallint] NULL,
	[DepositRate] [money] NULL,
	[DepositReceived] [bit] NULL,
	[depositPartial] [bit] NULL,
	[depositWO] [bit] NULL,
	[Payment1Billed] [bit] NULL,
	[Payment1Received] [bit] NULL,
	[Payment1Partial] [bit] NULL,
	[Payment1WO] [bit] NULL,
	[Payment2Billed] [bit] NULL,
	[Payment2Received] [bit] NULL,
	[Payment2Partial] [bit] NULL,
	[Payment2WO] [bit] NULL,
	[MealsFee] [money] NULL,
	[DamagesFee] [money] NULL,
	[ExtraProgramFee] [money] NULL,
	[OtherFees] [money] NULL,
	[FeesNotes] [varchar](max) NULL,
	[DirPayment1Rate] [money] NULL,
	[DirPayment1Billed] [bit] NULL,
	[DirPayment1Received] [bit] NULL,
	[DirPayment1Partial] [bit] NULL,
	[DirPayment1WO] [bit] NULL,
	[DirPayment2Rate] [money] NULL,
	[DirPayment2Billed] [bit] NULL,
	[DirPayment2Received] [bit] NULL,
	[DirPayment2Partial] [bit] NULL,
	[DirPayment2WO] [bit] NULL,
	[DirFeesNotes] [varchar](max) NULL,
	[SFKCreditApplied] [bit] NULL,
	[AccountClosed] [bit] NULL,
	[LodgingFee] [money] NULL,
	[ExtraProgramFeeNotes] [varchar](max) NULL,
 CONSTRAINT [PK_BillingData] PRIMARY KEY CLUSTERED 
(
	[BillID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CampSessions]    Script Date: 5/17/2021 2:58:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CampSessions](
	[CampID] [smallint] IDENTITY(1,1) NOT NULL,
	[PartnerID] [smallint] NULL,
	[CampProgram] [varchar](500) NULL,
	[SummerOrNonSummer] [varchar](50) NULL,
	[SiteLocation] [varchar](20) NULL,
	[CamperType] [varchar](50) NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[CheckInTime] [varchar](8) NULL,
	[CheckOutTime] [varchar](8) NULL,
	[CamperDays] [smallint] NULL,
	[CamperMeals] [smallint] NULL,
	[VolunteerDays] [smallint] NULL,
	[VolunteerMeals] [smallint] NULL,
	[BillingContactName] [varchar](max) NULL,
	[BillingContactEmail] [varchar](max) NULL,
	[BillingContactPhone] [varchar](max) NULL,
	[BillingContactAddress] [varchar](max) NULL,
	[BillingContactCity] [varchar](max) NULL,
	[BillingContactState] [varchar](2) NULL,
	[BillingContactZip] [int] NULL,
	[CampContactName] [varchar](max) NULL,
	[CampContactEmail] [varchar](max) NULL,
	[CampContactPhone] [varchar](max) NULL,
	[CampContactAdress] [varchar](max) NULL,
	[CampContactCity] [varchar](max) NULL,
	[CampContactState] [varchar](2) NULL,
	[CampContactZip] [int] NULL,
	[CTLStaffContact] [varchar](max) NULL,
	[CTLDirected] [bit] NULL,
	[PreArrivalFormsComplete] [bit] NULL,
	[IntacctCampSessionID] [smallint] NULL,
	[ProgramNotes] [varchar](max) NULL,
	[FoodServiceNotes] [varchar](max) NULL,
	[FacilityNotes] [varchar](max) NULL,
	[IncidentNotes] [varchar](max) NULL,
	[PartnershipNotes] [varchar](max) NULL,
	[ProgramNeeds] [varchar](max) NULL,
	[MealsRequested] [varchar](max) NULL,
	[CabinsProjected] [varchar](max) NULL,
	[BuildingNeeds] [varchar](max) NULL,
	[EquipmentNeeds] [varchar](max) NULL,
	[FullProgramStaff] [smallint] NULL,
	[DayStaff] [smallint] NULL,
	[NeedsNotes] [varchar](max) NULL,
	[CampCancelled] [bit] NULL,
	[DirMedicalTeam] [bit] NULL,
	[DirMedicalTeamNotes] [varchar](max) NULL,
	[DirBillableHours] [smallint] NULL,
	[DirBillableHoursNotes] [varchar](max) NULL,
	[DirVolunteers] [smallint] NULL,
	[DirStaffingRatioNotes] [varchar](max) NULL,
	[DirAddlEveningProgram] [bit] NULL,
	[DirTshirts] [bit] NULL,
	[DirPhotography] [bit] NULL,
	[DirNotes] [varchar](max) NULL,
	[NSHorseback] [varchar](50) NULL,
 CONSTRAINT [PK_CampSessions] PRIMARY KEY CLUSTERED 
(
	[CampID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CampSessions2]    Script Date: 5/17/2021 2:58:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CampSessions2](
	[CampID] [int] NULL,
	[PartnerID] [int] NULL,
	[CampProgram] [varchar](500) NULL,
	[SummerOrNonSummer] [varchar](50) NULL,
	[SiteLocation] [varchar](50) NULL,
	[CamperType] [varchar](50) NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[CheckInTime] [varchar](8) NULL,
	[CheckOutTime] [varchar](8) NULL,
	[CamperDays] [smallint] NULL,
	[CamperMeals] [smallint] NULL,
	[VolunteerDays] [smallint] NULL,
	[VolunteerMeals] [smallint] NULL,
	[BillingContactName] [varchar](50) NULL,
	[BillingContactEmail] [varchar](50) NULL,
	[BillingContactPhone] [varchar](50) NULL,
	[BillingContactAddress] [varchar](50) NULL,
	[BillingContactCity] [varchar](50) NULL,
	[BillingContactState] [varchar](50) NULL,
	[BillingContactZip] [varchar](5) NULL,
	[CampContactName] [varchar](50) NULL,
	[CampContactEmail] [varchar](50) NULL,
	[CampContactPhone] [varchar](50) NULL,
	[CampContactAdress] [varchar](50) NULL,
	[CampContactCity] [varchar](50) NULL,
	[CampContactState] [varchar](2) NULL,
	[CampContactZip] [varchar](5) NULL,
	[CTLStaffContact] [varchar](50) NULL,
	[CTLDirected] [bit] NULL,
	[PreArrivalFormsComplete] [bit] NULL,
	[IntacctCampSessionID] [smallint] NULL,
	[ProgramNotes] [varchar](max) NULL,
	[FoodServiceNotes] [varchar](max) NULL,
	[FacilityNotes] [varchar](max) NULL,
	[IncidentNotes] [varchar](max) NULL,
	[PartnershipNotes] [varchar](max) NULL,
	[ProgramNeeds] [varchar](max) NULL,
	[MealsRequested] [varchar](max) NULL,
	[CabinsProjected] [varchar](max) NULL,
	[BuildingNeeds] [varchar](max) NULL,
	[EquipmentNeeds] [varchar](max) NULL,
	[FullProgramStaff] [smallint] NULL,
	[DayStaff] [smallint] NULL,
	[NeedsNotes] [varchar](max) NULL,
	[CampCancelled] [bit] NULL,
	[DirMedicalTeam] [bit] NULL,
	[DirMedicalTeamNotes] [varchar](max) NULL,
	[DirBillableHours] [smallint] NULL,
	[DirBillableHoursNotes] [varchar](max) NULL,
	[DirVolunteers] [smallint] NULL,
	[DirStaffingRatioNotes] [varchar](max) NULL,
	[DirAddlEveningProgram] [bit] NULL,
	[DirTshirts] [bit] NULL,
	[DirPhotography] [bit] NULL,
	[DirNotes] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContractData]    Script Date: 5/17/2021 2:58:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContractData](
	[ContractID] [smallint] IDENTITY(1,1) NOT NULL,
	[CampID] [smallint] NULL,
	[ContractIssued] [datetime] NULL,
	[ContractReceived] [datetime] NULL,
	[ExclusiveUse] [bit] NULL,
	[ExclusiveUseRate] [money] NULL,
	[ContractMinimum] [money] NULL,
	[UserGroup1] [varchar](35) NULL,
	[UserGroup2] [varchar](35) NULL,
	[UserGroup3] [varchar](35) NULL,
	[UserGroup1Rate] [money] NULL,
	[UserGroup2Rate] [money] NULL,
	[UserGroup3Rate] [money] NULL,
	[DirContractIssued] [datetime] NULL,
	[DirContractReceived] [datetime] NULL,
	[NonBillable] [bit] NULL,
	[DataReadyForInvoice] [bit] NULL,
 CONSTRAINT [PK_ContractData] PRIMARY KEY CLUSTERED 
(
	[ContractID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PartnerTable]    Script Date: 5/17/2021 2:58:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PartnerTable](
	[PartnerID] [smallint] IDENTITY(1,1) NOT NULL,
	[ParentOrganization] [varchar](100) NULL,
	[PopulationServed] [varchar](100) NULL,
	[PopulationType] [varchar](max) NULL,
	[PartnerType] [varchar](15) NULL,
	[ImmuneCompromised] [bit] NULL,
	[AgeGroupServed] [varchar](8) NULL,
	[NonMissionFocus] [varchar](21) NULL,
	[Mission] [bit] NULL,
	[FirstYearOfPartnership] [smallint] NULL,
	[IntacctCustomerID] [smallint] NULL,
	[IntacctCustomerName] [varchar](49) NULL,
	[CampName] [varchar](46) NULL,
	[COIExpiration] [date] NULL,
	[PartnerNotes] [varchar](max) NULL,
 CONSTRAINT [PK_PartnerTable] PRIMARY KEY CLUSTERED 
(
	[PartnerID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suggestions]    Script Date: 5/17/2021 2:58:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suggestions](
	[SuggestionID] [smallint] IDENTITY(1,1) NOT NULL,
	[StaffName] [varchar](50) NULL,
	[Date] [date] NULL,
	[Suggestion] [varchar](max) NULL,
 CONSTRAINT [PK_Suggestions] PRIMARY KEY CLUSTERED 
(
	[SuggestionID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ContractData]  WITH CHECK ADD  CONSTRAINT [FK_ContractData_CampSessions] FOREIGN KEY([CampID])
REFERENCES [dbo].[CampSessions] ([CampID])
GO
ALTER TABLE [dbo].[ContractData] CHECK CONSTRAINT [FK_ContractData_CampSessions]
GO
ALTER DATABASE [CTL-SQL] SET  READ_WRITE 
GO
