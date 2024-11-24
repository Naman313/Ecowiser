import React from 'react'
import './Pagination.css'
export default function Pagination({currentPage, setCurrentPage, totalPages}) {
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
      };
    
      const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };
  return (
    <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
  )
}
