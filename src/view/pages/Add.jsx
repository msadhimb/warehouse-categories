import React from "react";
import HeaderPage from "inbound/HeaderPage";
import { Outlet } from "react-router-dom";

const AddCategories = () => {
  return (
    <React.Fragment>
      <div className="px-10 text-gray-600">
        <HeaderPage title="Add Category" />

        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default AddCategories;
