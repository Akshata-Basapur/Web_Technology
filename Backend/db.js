const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  rollno: { type: Number, required: true }, // Roll number
  subject: { type: String, required: true }, // Subject
  attendence: { type: Boolean, required: true }, // Attendance
  bookletNo: { type: Number, required: true },
});

const StudentModel = mongoose.model("Student", studentSchema);
module.exports = StudentModel;
