import React from "react";
import "../../index.scss";

const Input = ({
  name,
  className,
  placeholder,
  value,
  onChange,
  disabled,
  parentClassName,
  onKeyDown,
}) => {
  return (
    <div className={`flex flex-col ${parentClassName}`}>
      <label className="text-sm text-gray-500 mb-1">{name}</label>
      <input
        className={`border border-gray-300 rounded-md p-2 ${className} focus:border-blue-200`}
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Input;
