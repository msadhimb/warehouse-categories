import React from "react";
import { store } from "../../config";
import { Provider } from "react-redux";
import NewProduct from "./NewProduct";

const NewProductView = () => {
  return (
    <Provider store={store}>
      <NewProduct />
    </Provider>
  );
};

export default NewProductView;
