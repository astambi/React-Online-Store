import React, { Fragment } from "react";
import BookDetailsRow from "../BookDetailsRow";
import ButtonRemove from "../../common/ButtonRemove";
import FileUploadForm from "./FileUploadForm";

const FileAdmin = props => {
  const {
    book,
    handleChangeUpload,
    handleSubmitUpload,
    handleFileDelete
  } = props;

  return (
    <Fragment>
      {/* Admin File Upload */}
      <FileUploadForm
        handleChange={handleChangeUpload}
        handleSubmit={handleSubmitUpload}
      />

      {/* Admin File Delete */}
      <BookDetailsRow title="File path" value={book.file}>
        {book.file && book.file !== "" ? (
          <ButtonRemove handleAction={handleFileDelete} />
        ) : null}
      </BookDetailsRow>
    </Fragment>
  );
};

export default FileAdmin;
