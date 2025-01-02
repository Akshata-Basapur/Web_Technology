import "./App.css";
import EntryPage from "./EntryPage";
import { useState } from "react";
// import AbsenteeEntries from './AbsenteeEntries'

function App() {
  const [viewEntries, setViewEntries] = useState(false);
  const [showAbsenties, setShowAbsenties] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(
    "Data structure and algorithm"
  );
  return (
    <>
      <EntryPage
        viewEntries={viewEntries}
        setViewEntries={setViewEntries}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        showAbsenties={showAbsenties}
        setShowAbsenties={setShowAbsenties}
      />
    </>
  );
}

export default App;
