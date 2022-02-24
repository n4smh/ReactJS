import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Dumb function
function CourseList(props) {
  const authors = { 1: "Cory House", 2: "Scott Allen" };

  // Sepration of logic for better readablity
  function renderRow(course) {
    return (
      <tr key={course.id}>
        <td>
          <Link to={"/course/" + course.slug}>{course.title}</Link>
        </td>
        <td>{course.authorId}</td>
        <td>{authors[course.authorId]}</td>
        <td>{course.category}</td>
      </tr>
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author ID</th>
          <th>Author</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>{props.courses.map(renderRow)}</tbody>
    </table>
  );
}

// Props validation`
// Only runs in Development & Watch mode of webpack
CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// React default prop-types
// If the props are not sent by the parent function default props are used
CourseList.defaultProps = {
  courses: [],
};
export default CourseList;
