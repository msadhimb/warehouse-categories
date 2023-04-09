import React, { useEffect, useState } from "react";
import HeaderPage from "inbound/HeaderPage";
import SearchField from "inbound/SearchField";
import CategoriesTable from "../components/CategoriesTable";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Button from "../components/Button";
import {
  getProduct,
  getProductCategory,
  getProductType,
} from "../../config/Redux/Action";
import Modal from "../components/Modal";

const Categories = () => {
  const dispatch = useDispatch();

  // Get Data Categories
  const { dataProducts } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProduct());
  }, [dataProducts]);

  // Search Data
  const [searchValue, setSearchValue] = useState("");
  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const searchData = (data) =>
    data.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );

  //Get Data Category
  const { categoryProducts } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductCategory());
  }, [categoryProducts]);

  //Get Data Type
  const { typeProducts } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductType());
  }, [typeProducts]);

  // Modal
  const [showModalType, setShowModalType] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);

  return (
    <React.Fragment>
      <HeaderPage
        title="Categories"
        subTitle="Lorem ipsum color sit amet"
        sideElement={
          <SearchField onKeyUp={searchData} changeHandler={onChangeSearch} />
        }
      />
      <div className="w-full flex justify-end -mt-8">
        <div className="w-1/10 mr-5">
          <Button
            value={"Add Category + Type"}
            buttonClassName="bg-primary hover:bg-blue-500"
            to={"/add"}
          />
        </div>
        <div className="w-1/10 mr-2">
          <Button
            value={"Add Product"}
            buttonClassName={`bg-primary ${
              typeProducts.length == 0 ? null : "hover:bg-blue-500"
            }`}
            to={"/new-product"}
            disabled={typeProducts.length == 0 ? true : false}
          />
        </div>
      </div>

      <div className="w-full flex justify-start -mt-8">
        <div className="w-1/10 flex">
          <Button
            buttonClassName="bg-green-300 hover:bg-green-500"
            onClick={() => setShowModalType(true)}
            value="Type"
          />
          <Button
            buttonClassName={`bg-green-300 ${
              typeProducts.length == 0 ? "hover:bg-green-500" : null
            }`}
            onClick={() => setShowModalCategory(true)}
            value="Category"
            disabled={typeProducts.length == 0 ? false : true}
          />
        </div>
      </div>

      <Modal
        name={"Type"}
        showModal={showModalType}
        data={typeProducts}
        cancel={() => setShowModalType(false)}
      />

      <Modal
        name={"Category"}
        showModal={showModalCategory}
        data={categoryProducts}
        cancel={() => setShowModalCategory(false)}
      />

      <CategoriesTable
        itemsPerPage={5}
        dataCategories={searchData(dataProducts)}
        sortLatest={dataProducts}
      />
    </React.Fragment>
  );
};

export default Categories;
