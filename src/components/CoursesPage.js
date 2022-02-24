import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";

// Smart function
function CoursesPage() {
  // Hook
  const [courses, setCourses] = useState([]);

  // Hook
  // Runs once when the component is loaded
  // Removing empty dependency list will result in rerender eachtime hence multiple API calls could be absorbed in networks
  useEffect(() => {
    getCourses().then((_courses) => setCourses(_courses));
  }, []);

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} />
    </>
  );
}

// Default export is used when there is only one function exposed
export default CoursesPage;
