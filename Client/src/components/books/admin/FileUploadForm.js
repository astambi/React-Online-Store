import React, { Component } from "react";
import InputSubmit from "../../common/InputSubmit";

class FileUploadForm extends Component {
  render() {
    const { handleChange, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="file" />
        <input type="file" name="file" id="file" onChange={handleChange} />

        <InputSubmit value="Upload file" color="primary" size="" />
      </form>
    );
  }
}

export default FileUploadForm;
