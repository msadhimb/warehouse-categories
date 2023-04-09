import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./config/index.js";

import "./index.scss";

import Categories from "./view/pages/Categories";
import CategoriesEdit from "./view/pages/CategoriesEdit";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Provider store={store}>
      {/* <div>Name: categories</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Tailwind</div> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/categories-edit/:id" element={<CategoriesEdit />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
