import React from "react";

const TextArea = ({ name, placeholder, value, className, onChange }) => {
  return (
    <div className="flex flex-col mt-5">
      <label
        for="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {name}
      </label>
      <textarea
        id="message"
        rows="4"
        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
