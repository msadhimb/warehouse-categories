import React, { useEffect, useState } from "react";
import HeaderPage from "inbound/HeaderPage";
import Input from "../components/Input";
import SelectCategory from "../components/SelectCategory";
import SelectType from "../components/SelectType";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getProductCategory, getProductType } from "../../config/Redux/Action";

const NewProduct = () => {
  const dispatch = useDispatch();

  //Navigation Variabel
  const nav = useNavigate();

  // Form
  const [form, setForm] = useState({
    name: "",
    brand: "",
    series: "",
    technical_parameter: "",
  });

  // Get Id Product
  const { products } = useSelector((state) => state.productReducer);

  //Get Data Type
  const { typeProducts } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductType());
  }, []);

  // Get Data Type Detail
  const { typeProductsById } = useSelector((state) => state.productReducer);
  useEffect(() => {
    console.log(typeProductsById);
  }, [typeProductsById]);

  //Post Data
  const postData = async () => {
    const response = await axios
      .post(`${process.env.CUD_API_PATH}/product`, {
        name: form.name,
        category_id: typeProductsById?.categoryId,
        type_id: products.idType,
        brand: form.brand,
        series: form.series,
        technical_parameter: form.technical_parameter,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product has been added",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          nav("/categories");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <React.Fragment>
      <div className="px-10 text-gray-600">
        <HeaderPage title="Add New Product" />

        <div className="flex justify-center">
          <div className="w-8/12">
            <Input
              name={"Name"}
              parentClassName="mt-5"
              className="text-gray-500"
              placeholder={"Name"}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <SelectType
              name={"Type"}
              className="text-gray-500"
              data={typeProducts}
            />
            <Input
              name={"Category"}
              placeholder={"Category"}
              parentClassName="mt-5"
              className="text-gray-500"
              value={
                typeProductsById === null ? "" : typeProductsById?.categoryName
              }
              disabled
            />
            <Input
              name={"Brand"}
              parentClassName="mt-5"
              className="text-gray-500"
              placeholder="Brand"
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
            <Input
              name={"Series"}
              parentClassName="mt-5"
              className="text-gray-500"
              placeholder="Series"
              onChange={(e) => setForm({ ...form, series: e.target.value })}
            />
            <TextArea
              name={"Technical Parameter"}
              placeholder="Technical Parameter"
              className={"h-40 text-gray-500"}
              onChange={(e) =>
                setForm({ ...form, technical_parameter: e.target.value })
              }
            />

            <div className="flex">
              <Button
                value="Cancel"
                className={"bg-gray-300 w-full"}
                buttonClassName="hover:bg-gray-500"
                to="/categories"
              />
              <Button
                value="Save"
                className={"bg-primary w-full"}
                buttonClassName={"hover:bg-blue-500"}
                onClick={() => postData()}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewProduct;
