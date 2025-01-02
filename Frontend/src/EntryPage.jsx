/* eslint-disable react/prop-types */
import { useState } from "react";
import AttendenceEntries from "./AttendenceEntries";
import ShowAllEntries from "./ShowAllEntries";
import ShowAbsenties from "./ShowAbsenties";

function EntryPage({
  selectedSubject,
  setSelectedSubject,
  setViewEntries,
  viewEntries,
  showAbsenties,
  setShowAbsenties,
}) {
  const [noOfStud, setNoOfStud] = useState(""); // State for number of students
  const [startNo, setStartNo] = useState(""); // State for starting roll number
  const [startBookletNo, setStartBookletNo] = useState(""); // State for starting booklet number
  const [showAttendenceEntries, setShowAttendenceEntries] = useState(false); // State to toggle components

  function renderNextPg() {
    console.log(noOfStud, startNo, startBookletNo);
    setShowAttendenceEntries(true); // Toggle to show AttendenceEntries
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
      </>
    );
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
          className="ml-30 bg-red-500 text-white p-3 rounded mt-4"
        >
          Back
        </button>
      </>
    );
  }

  if (showAttendenceEntries) {
    return (
      <div>
        <AttendenceEntries
          noOfStud={noOfStud}
          startNo={startNo}
          startBookletNo={startBookletNo}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          viewEntries={viewEntries}
          setViewEntries={setViewEntries}
          showAbsenties={showAbsenties}
          setShowAbsenties={setShowAbsenties}
        />
        <button
          onClick={() => setShowAttendenceEntries(false)}
          className="ml-30 bg-red-500 text-white p-3 rounded mt-4"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="ml-10 mt-10 font-bold text-2xl">
        Enter number of students and starting roll number:{" "}
      </h2>
      <input
        type="number"
        placeholder=" No. of students"
        value={noOfStud}
        onChange={(e) => setNoOfStud(e.target.value)}
        className="h-8 m-10 mr-0 bg-black p-2 rounded text-white border border-gray-600"
      />
      <input
        type="number"
        placeholder="Start roll no."
        value={startNo}
        onChange={(e) => setStartNo(e.target.value)}
        className="h-8 m-10 bg-black p-2 rounded text-white border border-gray-600"
      />
      <input
        type="number"
        placeholder="Start booklet no."
        value={startBookletNo}
        onChange={(e) => setStartBookletNo(e.target.value)}
        className="h-8 m-10 ml-0 bg-black p-2 rounded text-white border border-gray-600"
      />
      <input
        type="button"
        value="Submit"
        onClick={renderNextPg}
        className="bg-red-400 size-8 w-20 h-12"
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
    </>
  );
}
export default EntryPage;
