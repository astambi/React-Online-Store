import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchForm = props => {
  const { onChange, onSubmit, search } = props;
  const { query } = search;

  return (
    <form className="form-inline md-form form-sm row mb-2">
      <input
        className="form-control form-control-sm col"
        type="text"
        placeholder="Search for the book you are looking for..."
        aria-label="Search"
        name="query"
        value={query}
        onChange={onChange}
      />
      <button type="submit" className="btn btn-info ml-1" onClick={onSubmit}>
        <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchForm;
