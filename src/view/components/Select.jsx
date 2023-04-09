import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setId } from "../../config/Redux/Action";
const Select = ({ name, data, className }) => {
  return (
    <div className="flex flex-col mt-5 ">
      {name === undefined ? null : (
        <label className="text-sm text-gray-500 mb-1">{name}</label>
      )}
      <select className={`border border-gray-300 rounded-md p-2 ${className}`}>
        {data.map((item) => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
