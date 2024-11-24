import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"  // Adjust position (top-right, bottom-left, etc.)
      autoClose={3000}       // Close after 3 seconds
      hideProgressBar={false} // Show/hide progress bar
      newestOnTop={true}     // Display newest toast on top
      closeOnClick           // Close when clicked
      rtl={false}            // Right-to-left for specific languages
      pauseOnFocusLoss       // Pause auto-close on focus loss
      draggable              // Allow dragging
      pauseOnHover           
    />
  );
};

export default Toast;
