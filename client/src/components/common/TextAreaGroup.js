import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import "./common.css";

const { TextArea } = Input;
const TextAreaGroup = ({ id, placeholder, value, errors, onChange, rows }) => {
  return (
    <div className="textArea">
      <TextArea
        rows={rows}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errors ? <span className="error">{errors}</span> : null}
    </div>
  );
};
TextAreaGroup.propTypes = {
  rows: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextAreaGroup;
