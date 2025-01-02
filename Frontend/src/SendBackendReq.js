import axios from "axios";

async function SendBackendReq(
  attendanceArray,
  rollNumbers,
  selectedSubject,
  semester
) {
  // Log the incoming attendance data and roll numbers
  console.log("Attendance Array:", attendanceArray);
  console.log("Roll Numbers:", rollNumbers);
  console.log("Semester:", semester);

  // Ensure attendanceArray is indexed by roll numbers
  const payload = [];
  for (let i = 0; i < attendanceArray.length; i++) {
    payload.push({
      rollNo: attendanceArray[i]?.rollNo,
      subject: selectedSubject,
      attendence: attendanceArray[i]?.present || false, // Default to false if not found
      bookletNumber: attendanceArray[i]?.booklet || -1,
      semester: semester, // Include semester number in payload
    });
  }

  console.log("Log2 Payload being sent:", payload);

  try {
    const response = await axios.post(
      "http://localhost:5000/Students",
      payload
    );
    console.log("Response from server:", response.data);
    return true; // Return true on successful post
  } catch (err) {
    console.error(
      "Error in SendBackendReq:",
      err.response?.data || err.message
    );
    return false; // Return false if an error occurs
  }
}

export default SendBackendReq;
