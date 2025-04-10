import React, { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import { Fab, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./index.css";
import Paper from "@mui/material/Paper";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("sticky-notes"));
    if (storedNotes) setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("sticky-notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: "",
      timestamp: new Date().toISOString(),
    };
    console.log("New note created with timestamp:", newNote.timestamp);
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => setNotes(notes.filter((n) => n.id !== id));

  const editNote = (id, newText) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, text: newText } : n)));
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Typography variant="h4" gutterBottom>
        Sticky Notes
      </Typography>

        <TextField
          hiddenLabel
          id="filled-hidden-label-normal"
          placeholder="Search"
          size="normal"
          fullWidth
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: 20 }}
        />
      <NoteList notes={filteredNotes} onDelete={deleteNote} onEdit={editNote} />
      <Fab
        color="primary"
        aria-label="add"
        onClick={addNote}
        style={{ position: "fixed", bottom: 30, right: 30 }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default App;
