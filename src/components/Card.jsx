import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Ensure correct import
import 'react-toastify/dist/ReactToastify.css';
import './Card.css';
import Display from './Display';
import Pagination from '../pagination/Pagination';
import { ToastContainer } from 'react-toastify'; // Correct import for ToastContainer

export default function Card() {
  const [Data, setData] = useState([]);
  const [Title, setTitle] = useState('');
  const [Tagline, setTagline] = useState('');
  const [Body, setBody] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // Items to display per page

  const totalPages = Math.ceil(Data.length / itemsPerPage);

  // Sort pinned notes first
  const sortedData = [...Data].sort((a, b) => b.pinned - a.pinned);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSubmit = () => {
    if (Body.length < 10) {
      toast.error('Body must be at least 10 characters long!', {
        position: 'top-center', // Correct usage of the position
        autoClose: 3000, // Auto-close after 3 seconds
      });
      return;
    }

    const newObject = { Title, Tagline, Body, timeStamp: new Date(), pinned: false };
    setData((prevData) => [...prevData, newObject]);
    setTitle('');
    setTagline('');
    setBody('');
    toast.success('Note added successfully!', {
      position: 'top-center',
    });
  };

  const togglePin = (index) => {
    const updatedNote = paginatedData[index]; // Find the note in the paginated data
    const globalIndex = Data.findIndex((item) => item.timeStamp === updatedNote.timeStamp);
  
    if (globalIndex !== -1) {
      setData((prevData) =>
        prevData.map((item, idx) =>
          idx === globalIndex ? { ...item, pinned: !item.pinned } : item
        )
      );
    }
  };
  

  const handleEdit = (index, updatedNote) => {
    setData((prevData) =>
      prevData.map((item, idx) => (idx === index ? updatedNote : item))
    );
  };

  return (
    <>
      <div className="Box">
        <div id="Title">
          <input
            type="text"
            placeholder="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div id="Tagline">
          <input
            type="text"
            placeholder="Tagline"
            value={Tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>
        <div id="Body">
          <textarea
            placeholder="Body"
            value={Body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>

        <Display
          Data={paginatedData}
          togglePin={togglePin}
          handleEdit={handleEdit}
        />

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  );
}
