import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Dumb function
function CourseList(props) {
  // Sepration of logic for better readablity
  function renderRow(course) {
    return (
      <tr key={course.id}>
        <td>
          <Link to={"/course/" + course.slug}>{course.title}</Link>
        </td>
        <td>{course.authorId}</td>
        <td>
          {props.authors.find((_author) => _author.id === course.authorId)
            ? props.authors.find((_author) => _author.id === course.authorId)
                .name
            : "Author not found"}
        </td>
        <td>{course.category}</td>
        <td>
          <button
            className="btn btn-outline-danger"
            onClick={() => props.deleteCourse(course.id)}
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
          <th>Title</th>
          <th>Author ID</th>
          <th>Author</th>
          <th>Category</th>
          <th>&nbsp;</th>
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
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

// React default prop-types
// If the props are not sent by the parent function default props are used
CourseList.defaultProps = {
  courses: [],
  authors: [],
};
export default CourseList;
