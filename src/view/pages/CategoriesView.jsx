import React from "react";
import { Provider } from "react-redux";
import { store } from "../../config";
import Categories from "./Categories";

const CategoriesView = () => {
  return (
    <Provider store={store}>
      <Categories />
    </Provider>
  );
};

export default CategoriesView;
