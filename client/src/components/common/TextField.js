import React from "react";
import { Input, Icon } from "antd";
import PropTypes from "prop-types";
import "./common.css";

const TextField = ({
  id,
  placeholder,
  value,
  error,
  onChange,
  autosize,
  icon,
  size
}) => {
  return (
    <div className="textField">
      <Input
        placeholder={placeholder}
        autosize={autosize}
        prefix={icon ? <Icon type={icon.type} /> : null}
        id={id}
        size={size}
        onChange={onChange}
        value={value}
      />
      {error ? <span className="error">{error}</span> : null}
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
  error: PropTypes.string
};

export default TextField;
