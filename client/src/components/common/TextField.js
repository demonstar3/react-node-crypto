import React from "react";
import { Input, Icon } from "antd";
import PropTypes from "prop-types";
import "./common.css";

const TextField = ({
  id,
  placeholder,
  value,
  errors,
  onChange,
  autosize,
  icon,
  size,
  label
}) => {
  return (
    <div className="textField">
      <h3>{label}</h3>
      <Input
        placeholder={placeholder}
        autosize={autosize}
        prefix={icon ? <Icon type={icon.type} /> : null}
        id={id}
        size={size}
        onChange={onChange}
        value={value}
      />
      {errors ? <span className="error">{errors}</span> : null}
    </div>
  );
};
TextField.propTypes = {
  size: PropTypes.string,
  autosize: PropTypes.bool,
  icon: PropTypes.any,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default TextField;
