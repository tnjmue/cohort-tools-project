const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const PORT = 5005;
const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");
const User = require("./models/User.model");
const { isAuthenticated } = require("./middleware/jwt.middleware");


// STATIC DATA
const cohorts = require("./cohorts.json");
const students = require("./students.json");


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// CONNECT TO DATABASE
mongoose
.connect('mongodb://127.0.0.1:27017/cohort-tools-api')
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => console.error('Error connecting to mongo', err));


// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
  })
);


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


const cohortRouter = require("./routes/cohort.routes");
app.use("/api/cohorts", cohortRouter); 

const studentRouter = require("./routes/student.routes");
app.use("/api/students", studentRouter);

const userRouter = require("./routes/user.routes");
app.use("/api/users", isAuthenticated, userRouter)

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);


// ERROR HANDLING - always set up last!
const { errorHandler, notFoundHandler } = require('./middleware/error-handling');

app.use(notFoundHandler);
app.use(errorHandler);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});