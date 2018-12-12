import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import "./common.css";

const { TextArea } = Input;
const TextAreaGroup = ({
  id,
  placeholder,
  value,
  errors,
  onChange,
  rows,
  label,
  defaultValue
}) => {
  return (
    <div className="textArea">
      <h3>{label}</h3>
      <TextArea
        rows={rows}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
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
  errors: PropTypes.string,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string
};

export default TextAreaGroup;
