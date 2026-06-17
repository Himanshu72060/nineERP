const express =
    require("express");

const cors =
    require("cors");

const app =
    express();

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    "/api/schools",
    require("./routes/schoolRoutes")
);

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/teachers",
    require("./routes/teacherRoutes")
);

const studentRoutes =
    require("./routes/studentRoutes");

app.use(
    "/api/students",
    studentRoutes
);

const profileRoutes =
    require("./routes/profileRoutes");

app.use(
    "/api/profile",
    profileRoutes
);

const admissionRoutes =
    require("./routes/admissionRoutes");

app.use(
    "/api/admissions",
    admissionRoutes
);

const attendanceRoutes =
    require("./routes/attendanceRoutes");


app.use(
    "/api/attendance",
    attendanceRoutes
);

const feeReportRoutes =
    require("./routes/feeReportRoutes");


app.use(
    "/api/fee-report",
    feeReportRoutes
);

const feeStructureRoutes =
    require("./routes/feeStructureRoutes");


app.use(
    "/api/fee-structure",
    feeStructureRoutes
);

const liveClassRoutes =
    require("./routes/liveClassRoutes");


app.use(
    "/api/live-class",
    liveClassRoutes
);

const reportCardRoutes =
    require("./routes/reportCardRoutes");

app.use(
    "/api/report-card",
    reportCardRoutes
);


const timeTableRoutes =
    require("./routes/timeTableRoutes");

app.use(
    "/api/timetable",
    timeTableRoutes
);

const conversationRoutes =
    require("./routes/conversationRoutes");

app.use(
    "/api/conversations",
    conversationRoutes
);

const messageRoutes =
    require("./routes/messageRoutes");

app.use(
    "/api/messages",
    messageRoutes
);


module.exports = app;