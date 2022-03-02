import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import * as courseActions from "../actions/courseAction";
import * as authorActions from "../actions/authorAction";
import courseStore from "../store/courseStore";
import authorStore from "../store/authorStore";
import CourseForm from "./CourseForm";

const ManageCoursePage = (props) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [_authors_select, setAuthorsSelect] = useState([]);

  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    // Reload edit page issue handler
    courseStore.addChangeListener(onChange);

    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      let _course = courseStore.getCourseBySlug(slug);
      _course ? setCourse(_course) : navigate("/error-page");
    }

    return () => courseStore.removeChangeListener(onChange);
  }, [slug, courses]);

  useEffect(() => {
    authorStore.addChangeListener(onChangeAuthor);

    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else {
      let _authors = [
        {
          value: 0,
          label: "",
        },
      ];

      authors.forEach((author) => {
        let _author = {
          value: author.id,
          label: author.name,
        };

        _authors.push(_author);
      });

      setAuthorsSelect(_authors);
    }

    return () => authorStore.removeChangeListener(onChangeAuthor);
  }, [authors, authors.length]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function onChangeAuthor() {
    setAuthors(authorStore.getAuthors());
  }

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

    courseActions.saveCourse(course).then(() => {
      navigate("/courses");
      toast.success("Course saved");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        authors={_authors_select}
        errors={errors}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
