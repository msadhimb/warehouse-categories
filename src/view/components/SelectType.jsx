import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductTypeById, setId } from "../../config/Redux/Action";
const Select = ({ name, data, className, id }) => {
  const { products } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  const getCurrentTypeById = () => {
    if (id === null) {
      return null;
    } else {
      const currentType = data.find((item) => item.id === id);
      return currentType;
    }
  };

  const currentType = getCurrentTypeById();

  return (
    <div className="flex flex-col mt-5 ">
      <label className="text-sm text-gray-500 mb-1">{name}</label>
      <select
        className={`border border-gray-300 rounded-md p-2 ${className}`}
        onChange={(e) => {
          dispatch(setId("idType", e.target.value));
          dispatch(getProductTypeById(e.target.value));
        }}
      >
        {id === undefined ? (
          <option value={null} className="bg-white">
            Choose Type
          </option>
        ) : (
          <option value={id} className="bg-white">
            {currentType?.name}
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
