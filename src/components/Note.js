import React from "react";

const Note = ({ id, text, onDelete, onEdit }) => {
  return (
    <div className="note">
      <textarea value={text} onChange={(e) => onEdit(id, e.target.value)} />
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Note;
