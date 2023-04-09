import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setId } from "../../config/Redux/Action";
import { HiOutlineTrash } from "react-icons/hi2";

const Select = ({ name, data, className, id }) => {
  const { products } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const getCurrentCategoryById = () => {
    if (id === undefined) {
      return null;
    } else {
      const currentCategory = data.find((item) => item.id === id);
      return currentCategory;
    }
  };

  const currentCategory = getCurrentCategoryById();

  return (
    <div className="flex flex-col mt-5 ">
      <label className="text-sm text-gray-500 mb-1">{name}</label>
      <select
        className={`border border-gray-300 rounded-md p-2 ${className}`}
        onChange={(e) => dispatch(setId("idCategory", e.target.value))}
      >
        {id === undefined ? (
          <option value={null} className="bg-white">
            Choose Category
          </option>
        ) : (
          <option value={id} className="bg-white">
            {currentCategory?.name}
          </option>
        )}
        {data.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
