import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";

import CourseForm from "./CourseForm";

const ManageCoursePage = (props) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    if (slug) {
      courseApi.getCourseBySlug(slug).then((_course) => {
        setCourse(_course);
      });
    }
  }, [slug]);

  // Inputs are managed by react
  // Without handlers values are lost
  function handleFormChange({ target }) {
    // Destructured in function parm
    // const target = event.target;

    const updatedCourse = {
      ...course,
      [target.name]: target.value,
    };

    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);

    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formIsValid()) return;

    courseApi.saveCourse(course).then(() => {
      navigate("/courses");
      toast.success("Course saved");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        errors={errors}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
