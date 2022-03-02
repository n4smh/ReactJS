import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import courseStore from "../store/courseStore";
import CourseList from "./CourseList";
import { loadAuthors } from "../actions/authorAction";
import authorStore from "../store/authorStore";
import { loadCourses, deleteCourse } from "../actions/courseAction";

// Smart function
function CoursesPage() {
  // Hook
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onChangeAuthor);

    if (authorStore.getAuthors().length === 0) loadAuthors();

    return () => authorStore.removeChangeListener(onChangeAuthor);
  }, []);

  function onChangeAuthor() {
    setAuthors(authorStore.getAuthors());
  }

  // Hook
  // Runs once when the component is loaded
  // Removing empty dependency list will result in rerender eachtime hence multiple API calls could be absorbed in networks
  // For flux initlization is used to load the initial data insted of API call
  // This removes the API call to the course API each time we land on course page
  useEffect(() => {
    courseStore.addChangeListener(onChange);

    if (courseStore.getCourses().length === 0) loadCourses();

    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleDeleteCourse(id) {
    deleteCourse(id).then(() => {
      toast.error("Course deleted");
    });
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses}
        authors={authors}
        deleteCourse={handleDeleteCourse}
      />
    </>
  );
}

// Default export is used when there is only one function exposed
export default CoursesPage;
