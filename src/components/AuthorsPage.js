import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AuthorList from "./AuthorList";
import { loadAuthors, deleteAuthor } from "../actions/authorAction";
import authorStore from "../store/authorStore";
import { toast } from "react-toastify";

function AuthorsPage() {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onChangeAuthor);

    if (authorStore.getAuthors().length === 0) loadAuthors();

    return () => authorStore.removeChangeListener(onChangeAuthor);
  }, []);

  function onChangeAuthor() {
    setAuthors(authorStore.getAuthors());
  }

  function handleDeleteAuthor(id) {
    deleteAuthor(id).then(() => {
      toast.error("Author deleted");
    });
  }

  return (
    <>
      <h2>Authors</h2>
      <Link className="btn btn-primary" to="/author">
        Add Author
      </Link>
      <AuthorList authors={authors} deleteAuthor={handleDeleteAuthor} />
    </>
  );
}

export default AuthorsPage;
