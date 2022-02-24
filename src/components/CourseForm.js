import React from "react";
import PropTypes from "prop-types";
import SelectInput from "./common/SelectInput";
import TextInput from "./common/TextInput";

function CourseForm(props) {
  const optionsAuthor = [
    {
      value: "",
      label: "",
    },
    {
      value: "1",
      label: "Cory House",
    },
    {
      value: "2",
      label: "Scott Allen",
    },
  ];

  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Title"
        name="title"
        value={props.course.title}
        onChange={props.onChange}
        error={props.errors.title}
      />

      <SelectInput
        id="author"
        label="Author"
        name="authorId"
        value={props.course.authorId || ""}
        onChange={props.onChange}
        options={optionsAuthor}
        error={props.errors.authorId}
      />

      <TextInput
        id="category"
        label="Category"
        name="category"
        value={props.course.category}
        onChange={props.onChange}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
