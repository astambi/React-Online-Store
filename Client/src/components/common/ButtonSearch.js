import React from "react";
import CustomButton from "./CustomButton";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ButtonSearch = props => (
  <CustomButton
    type="submit"
    color="info"
    icon={faSearch}
    {...props} // handleAction, size
  />
);

export default ButtonSearch;
