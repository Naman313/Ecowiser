import React, { useState } from 'react';
import './Display.css';
import { FaEdit } from 'react-icons/fa'; 

export default function Display({ Data, togglePin, handleEdit }) {
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editedNote, setEditedNote] = useState({}); 
  const handleEditClick = (index, note) => {
    setEditingIndex(index);
    setEditedNote({ ...note }); 
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      handleEdit(editingIndex, editedNote); 
      setEditingIndex(null); 
      setEditedNote({}); 
    }
  };

  const handleCancel = () => {
    setEditingIndex(null); 
    setEditedNote({}); 
  };

  return (
    <div className="notes-container">
      {Data.map((item, index) =>
        editingIndex === index ? (
          <div className="note" key={index}>

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
