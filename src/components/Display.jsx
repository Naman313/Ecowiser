import React, { useState } from 'react';
import './Display.css';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon from Font Awesome

export default function Display({ Data, togglePin, handleEdit }) {
  const [editingIndex, setEditingIndex] = useState(null); // Tracks which note is being edited
  const [editedNote, setEditedNote] = useState({}); // Tracks the edited note details

  const handleEditClick = (index, note) => {
    setEditingIndex(index); // Set the current editing index
    setEditedNote({ ...note }); // Preload the note details into the edit fields
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      handleEdit(editingIndex, editedNote); // Save changes through parent function
      setEditingIndex(null); // Exit edit mode
      setEditedNote({}); // Clear the edited note state
    }
  };

  const handleCancel = () => {
    setEditingIndex(null); // Exit edit mode
    setEditedNote({}); // Clear the edited note state
  };

  return (
    <div className="notes-container">
      {Data.map((item, index) =>
        editingIndex === index ? (
          <div className="note" key={index}>
            {/* Edit Mode */}
            <input
              type="text"
              value={editedNote.Title || ''}
              onChange={(e) => setEditedNote({ ...editedNote, Title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              value={editedNote.Tagline || ''}
              onChange={(e) =>
                setEditedNote({ ...editedNote, Tagline: e.target.value })
              }
              placeholder="Tagline"
            />
            <textarea
              value={editedNote.Body || ''}
              onChange={(e) =>
                setEditedNote({ ...editedNote, Body: e.target.value })
              }
              placeholder="Body"
            ></textarea>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="note" key={index}>
            {/* View Mode */}
            <div className="note-header">
              <h4>{item.Title}</h4>
              <FaEdit
                className="edit-icon"
                onClick={() => handleEditClick(index, item)}
                title="Edit Title"
              />
            </div>
            <p>{item.Tagline}</p>
            <p>{item.Body}</p>
            <button className="pin-btn" onClick={() => togglePin(index)}>
              {item.pinned ? 'Unpin' : 'Pin'}
            </button>
          </div>
        )
      )}
    </div>
  );
}
