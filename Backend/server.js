const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "absentee-list",
});

// Schema (Run this manually or through migration scripts)
/*

*/

// Routes
app.get("/Students", async (req, res) => {
  try {
    const [students] = await db.query("SELECT * FROM Students");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.post("/Students", async (req, res) => {
  const studentData = req.body;

  if (!Array.isArray(studentData) || studentData.length === 0) {
    return res.status(400).json({ error: "Invalid or missing data" });
  }

  const transformedData = studentData.map((student) => [
    student.rollNo || 0,
    student.bookletNumber || 0,
    student.subject || "Unknown",
    typeof student.attendence === "boolean" ? student.attendence : false,
  ]);

  try {
    const query =
      "INSERT INTO Students (rollno, bookletNo, subject, attendence) VALUES ?";
    await db.query(query, [transformedData]);
    res.status(201).json({ message: "Students added successfully" });
  } catch (err) {
    console.error("Error while inserting students:", err);
    res.status(500).json({
      error: "Failed to save students",
      details: err.message,
    });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
