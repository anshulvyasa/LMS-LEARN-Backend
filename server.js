require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Routes
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const StudentViewCourseRoutes = require("./routes/student-routes/course-routes");
const StudentViewOrderRoutes = require("./routes/student-routes/order-route");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

//database connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Database is Connected"))
  .catch((e) => console.log(e.message));

app.get("/", (req, res) => {
  res.json({
    msg: "hey dude",
  });
});

//rotes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", StudentViewCourseRoutes);
app.use("/student/order", StudentViewOrderRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is Listening at Port ${PORT}`);
});
