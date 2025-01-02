/* eslint-disable react/prop-types */
import { useState } from "react";
import SendBackendReq from "./SendBackendReq";
import ShowAllEntries from "./ShowAllEntries";
import ShowAbsenties from "./ShowAbsenties";
import subjects from "./subjects";

function AbsenteeEntries({
  noOfStud,
  startNo,
  startBookletNo,
  setViewEntries,
  viewEntries,
  selectedSubject,
  setSelectedSubject,
  showAbsenties,
  setShowAbsenties,
}) {
  noOfStud = parseInt(noOfStud);
  startNo = parseInt(startNo);
  startBookletNo = parseInt(startBookletNo);

  if (Number.isNaN(noOfStud)) noOfStud = 10;
  if (Number.isNaN(startNo)) startNo = 100;
  if (Number.isNaN(startBookletNo)) startBookletNo = 1;

  const [doneSending, setDoneSending] = useState(false);
  const [error, setError] = useState(false);
  const [semNo, setSemNo] = useState("3rd");

  const rollNumbers = Array.from(
    { length: noOfStud },
    (_, index) => startNo + 1 + index
  );
  const [attendanceData, setAttendanceData] = useState(() =>
    rollNumbers.reduce((acc, rollNo) => {
      acc[rollNo] = {
        present: true,
        booklet: startBookletNo + (rollNo - (startNo + 1)),
      };
      return acc;
    }, {})
  );

  const handleSubmit = async () => {
    const attendanceArray = rollNumbers.map((rollNo) => ({
      rollNo,
      present: attendanceData[rollNo].present,
      booklet: attendanceData[rollNo].booklet,
    }));

    const temp = await SendBackendReq(
      attendanceArray,
      startNo + 1,
      selectedSubject,
      semNo
    );

    if (temp) {
      setDoneSending(true);
    } else {
      setError(true);
    }
  };

  const updateAttendance = (rollNo, value) => {
    setAttendanceData((prev) => ({
      ...prev,
      [rollNo]: { ...prev[rollNo], present: value === "Present" },
    }));
  };

  const updateBooklet = (rollNo, bookletValue) => {
    setAttendanceData((prev) => ({
      ...prev,
      [rollNo]: { ...prev[rollNo], booklet: parseInt(bookletValue) || 0 },
    }));
  };

  if (error) {
    return <h1>There was an error, maybe your backend is down</h1>;
  }

  if (showAbsenties) {
    return (
      <>
        <ShowAbsenties
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <button
          onClick={() => setShowAbsenties(false)}
          className="bg-red-500 text-white p-3 rounded mt-4"
        >
          Back
        </button>
      </>
    );
  }

  if (doneSending) {
    return (
      <div className="flex mt-52 justify-center">
        <h1 className="text-3xl font-bold text-white">
          Your results have been updated in the database
        </h1>
        <input
          type="button"
          value="Show all entries till now"
          onClick={() => setViewEntries(true)}
          className="bg-green-500 text-white p-3 rounded ml-4"
        />
        <input
          type="button"
          value="Show the absentiee entries"
          onClick={() => setShowAbsenties(true)}
          className="bg-red-500 text-white p-3 rounded ml-4"
        />
      </div>
    );
  }

  if (viewEntries) {
    return (
      <>
        <ShowAllEntries
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <button
          onClick={() => setViewEntries(false)}
          className="bg-red-500 text-white p-3 rounded mt-4"
        >
          Back
        </button>
        <input
          type="button"
          value="Show the absentiee entries"
          onClick={() => setShowAbsenties(true)}
          className="bg-red-500 text-white p-3 rounded ml-4"
        />
      </>
    );
  }

  return (
    <>
      <div className="fixed top-5 right-10">
        Semister No:
        <select
          value={semNo}
          onChange={(e) => {
            setSemNo(e.target.value);
            setSelectedSubject(subjects[e.target.value][0]); // Set default subject for the selected semester
          }}
          className="border border-gray-600 bg-black p-2 rounded text-white mb-4"
        >
          <option value="3rd">3rd</option>
          <option value="5th">5th</option>
          <option value="7th">7th</option>
        </select>
      </div>

      <div className="fixed top-16 right-10">
        Subjects:
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border border-gray-600 bg-black p-2 rounded text-white"
        >
          {subjects[semNo].map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="p-4 text-white ml-20 mt-10">
        <h3 className="font-bold mb-4 text-2xl">Subject: {selectedSubject}</h3>
        {rollNumbers.map((rollNo) => (
          <InputBox
            key={rollNo}
            rollNo={rollNo}
            attendance={attendanceData[rollNo]}
            updateAttendance={updateAttendance}
            updateBooklet={updateBooklet}
          />
        ))}
      </div>

      <div className="ml-10 mt-6">
        <input
          type="button"
          value="Submit"
          onClick={handleSubmit}
          className="bg-yellow-500 text-black border border-gray-600 p-3 rounded ml-14"
        />
        <input
          type="button"
          value="Show all entries till now"
          onClick={() => setViewEntries(true)}
          className="bg-green-500 text-white p-3 rounded ml-4"
        />
        <input
          type="button"
          value="Show the absentiee entries"
          onClick={() => setShowAbsenties(true)}
          className="bg-red-500 text-white p-3 rounded ml-4"
        />
      </div>
    </>
  );
}

function InputBox({ rollNo, attendance, updateAttendance, updateBooklet }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="number"
        value={rollNo}
        readOnly
        className="border border-gray-600 p-2 rounded bg-gray-800 text-white"
      />
      <select
        value={attendance.present ? "Present" : "Absent"}
        onChange={(e) => updateAttendance(rollNo, e.target.value)}
        className="border border-gray-600 bg-black p-2 rounded text-white"
      >
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <input
        type="number"
        value={attendance.booklet}
        onChange={(e) => updateBooklet(rollNo, e.target.value)}
        className="border border-gray-600 p-2 rounded bg-gray-800 text-white"
        placeholder="Booklet No."
      />
    </div>
  );
}

export default AbsenteeEntries;
