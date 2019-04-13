import React from "react";

const Pagination = props => {
  const {
    currentPage = 1,
    totalPages = 1,
    handlePageDecrease,
    handlePageIncrease
  } = props;

  return (
    <nav className="pagination">
      <ul className="pagination d-flex justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePageDecrease}>
            Previous
          </button>
        </li>

        <li className="page-item active">
          <button className="page-link">{currentPage}</button>
        </li>

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={handlePageIncrease}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
