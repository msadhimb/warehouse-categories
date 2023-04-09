import React from "react";
import { Provider } from "react-redux";
import { store } from "../../config";
import CategoriesEdit from "./CategoriesEdit";

const CategoriesEditView = () => {
  return (
    <Provider store={store}>
      <CategoriesEdit />
    </Provider>
  );
};

export default CategoriesEditView;
