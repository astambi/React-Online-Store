import React from "react";
import BookAdmin from "./BookAdmin";
import { actions } from "../../../constants/constants";

const BookCreate = () => <BookAdmin action={actions.create} />;

export default BookCreate;
