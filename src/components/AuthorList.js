import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AuthorList(props) {
  function renderRow(author) {
    return (
      <tr key={author.id}>
        <td>{author.id}</td>
        <td>
          <Link to={"/author/" + author.id}>{author.name}</Link>
        </td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => props.deleteAuthor(author.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Author ID</th>
          <th>Author Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{props.authors.map(renderRow)}</tbody>
    </table>
  );
}

AuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteAuthor: PropTypes.func.isRequired,
};

AuthorList.defaultProps = {
  authors: [],
};

export default AuthorList;
