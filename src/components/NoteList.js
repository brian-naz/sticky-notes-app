import React from "react";
import Note from "./Note";
import { AnimatePresence } from "framer-motion";

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <AnimatePresence>
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            timestamp={note.timestamp}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NoteList;
