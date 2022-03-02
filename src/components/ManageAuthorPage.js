import React, { useEffect, useState } from "react";
import AuthorForm from "./AuthorForm";

import authorStore from "../store/authorStore";
import * as authorActions from "../actions/authorAction";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ManageAuthorPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [author, setAuthor] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (slug) {
      let _author = authorStore.getAuthorBySlug(slug);

      _author ? setAuthor(_author) : navigate("/error-page");
    }
    return () => authorStore.removeChangeListener(onChange);
  }, [slug, authors]);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleFormChange({ target }) {
    const updatedAuthor = {
      ...author,
      [target.name]: target.value,
    };

    setAuthor(updatedAuthor);
  }

  function isFormValid() {
    const _errors = {};
    if (!author.name) _errors.name = "Name is required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid()) return;

    authorActions.saveAuthor(author).then(() => {
      navigate("/authors");
      toast.success("Author saved");
    });
  }

  return (
    <>
      <h1>Manage Author</h1>
      <AuthorForm
        author={author}
        errors={errors}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
      />
    </>
  );
}
export default ManageAuthorPage;
