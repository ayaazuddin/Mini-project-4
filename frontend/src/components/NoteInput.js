import React from "react";

function NoteInput({ notes, setNotes }) {
  return (
    <div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Paste your notes here..."
        rows="8"
        cols="50"
      ></textarea>
    </div>
  );
}

export default NoteInput;
