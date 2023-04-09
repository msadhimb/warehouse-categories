import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Button = ({
  value,
  className,
  onClick,
  to,
  buttonClassName,
  disabled,
  onKeyDown,
}) => {
  return (
    <Link to={to} className={`my-5 mx-1 ${className}`}>
      <button
        className={`flex justify-center text-md items-center gap-2 px-2 py-2 text-white font-medium rounded-sm w-full ${buttonClassName}`}
        onClick={onClick}
        disabled={disabled}
        onKeyDown={onKeyDown}
      >
        {value}
      </button>
    </Link>
  );
};

export default Button;
