import React from 'react';

const Pagination = ({ page, totalPages, setPage }) => {
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-200 text-gray-700">{page} of {totalPages}</span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
