import React from "react";

const Pagination = props => {
  const getPages = () => {
    let pages = [1];
    for (let page = 2; page <= totalPages; page++) {
      pages.push(page);
    }
    return pages;
  };

  const {
    currentPage = 1,
    totalPages = 1,
    changePageTo,
    handlePageDecrease,
    handlePageIncrease
  } = props;
  const pages = getPages();

  return (
    <nav className="pagination">
      <ul className="pagination d-flex justify-content-center">
        {/* Next Page */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePageDecrease}>
            Previous
          </button>
        </li>

        {/* Pages */}
        {pages.map(page => (
          <li className={`page-item ${page === currentPage ? "active" : ""}`}>
            <button className="page-link" onClick={() => changePageTo(page)}>
              {page}
            </button>
          </li>
        ))}

        {/* Previous Page */}
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
