require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const EducationRoute = require("./routes/EducationRoute");
const WorkExperienceRoute = require("./routes/WorkExperienceRoute");
const SkillRoute  = require("./routes/SkillRoute");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/EducationRoute", EducationRoute);
app.use("/api/WorkExperienceRoute", WorkExperienceRoute);
app.use("/api/ProjectRoute",require('./routes/ProjectRoute'));
app.use("/api/SkillRoute",SkillRoute);
app.use("/api/connection",require('./routes/connection'));
app.use("/api/Appointment",require('./routes/Appointment'));
app.use("/api/funding",require('./routes/Funding'));

//Chat Module Routes
app.use("/api/chats",require('./routes/chatRoute'));
app.use("/api/messages",require('./routes/messageRoute'));

//Static Router for Image & Document Uploading  
app.use(express.static('../src/components/uploads'));
app.use(express.static('../src/components/document'));

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));