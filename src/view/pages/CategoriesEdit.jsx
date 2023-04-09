import React, { useEffect, useState } from "react";
import HeaderPagre from "inbound/HeaderPage";
import { HiOutlineTrash } from "react-icons/hi2";
import "../../index.scss";
import Input from "../components/Input";
import SelectCategory from "../components/SelectCategory";
import SelectType from "../components/SelectType";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../../config";
import {
  deleteProduct,
  getProductCategory,
  getProductType,
} from "../../config/Redux/Action";

const CategoriesEdit = () => {
  const dispatch = useDispatch();

  // Get Id From Url
  const params = useParams();
  const id = params.id;

  // Form Id Variable
  const [dataId, setDataId] = useState({
    idProducts: "",
    idCategories: "",
    idTypes: "",
  });

  // Navigate variable
  const nav = useNavigate();

  // Get Data Detail
  const [dataProduct, setDataProduct] = useState([]);
  useEffect(() => {
    console.log(dataProduct.categoryName);
  }, [dataProduct]);
  const getDataDetail = async () => {
    const response = await axios.get(
      process.env.CUD_API_PATH + `/product/${id}`
    );
    setDataProduct(response.data);
    setDataId({
      idProducts: response.data.id,
      idCategories: response.data.categoryId,
      idTypes: response.data.typeId,
    });
  };
  useEffect(() => {
    getDataDetail();
  }, []);

  //Get Data Category
  const { categoryProducts } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductCategory());
  }, []);

  //Get Data Type
  const { typeProducts } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductType());
  }, []);

  // Get Data Type Detail
  const { typeProductsById } = useSelector((state) => state.productReducer);

  // Form Update Data
  const [form, setForm] = useState({
    name: dataProduct?.name,
    brand: dataProduct?.brand,
    series: dataProduct?.series,
    technical_parameter: dataProduct?.technicalParameter,
  });
  useEffect(() => {
    setForm({
      name: dataProduct?.name,
      brand: dataProduct?.brand,
      series: dataProduct?.series,
      technical_parameter: dataProduct?.technicalParameter,
    });
  }, [dataProduct]);

  // Get Id From Redux
  const { products } = useSelector((state) => state.productReducer);

  // Update Data
  const handleUpdate = async () => {
    const response = await axios
      .put(`${process.env.CUD_API_PATH}/product/${id}`, {
        name: form.name,
        category_id:
          products.idCategory === ""
            ? dataId.idCategories
            : typeProductsById?.categoryId,
        type_id: products.idType === "" ? dataId.idTypes : products.idType,
        brand: form.brand,
        series: form.series,
        technical_parameter: form.technical_parameter,
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully",
          text: "Data has been updated",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          nav("/categories");
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error",
          text: err.data.message || "Data didnt updated",
          showConfirmButton: false,
        });
      });
  };

  return (
    <Provider store={store}>
      <React.Fragment>
        <div className="px-10 text-gray-600">
          <HeaderPagre
            title="Category Detail"
            sideElement={
              <p
                className="flex m-0 items-center text-sm text-red-400 cursor-pointer"
                onClick={() => dispatch(deleteProduct(dataId.idProducts))}
              >
                <HiOutlineTrash
                  color="red"
                  className="mr-2"
                  style={{ fontSize: 20 }}
                />{" "}
                Delete Category
              </p>
            }
          />

          <div className="flex justify-center">
            <div className="w-8/12">
              <Input
                name={"Name"}
                className="text-gray-500"
                parentClassName={"mt-5"}
                placeholder={"Name"}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {/* <SelectCategory
                name={"Category"}
                className="text-gray-500"
                data={categoryProducts}
                id={dataId.idCategories}
              /> */}
              <SelectType
                name={"Type"}
                className="text-gray-500"
                data={typeProducts}
                id={dataId.idTypes}
              />
              <Input
                name={"Category"}
                placeholder={"Category"}
                parentClassName={"mt-5"}
                className="text-gray-500"
                value={
                  products.idCategory === ""
                    ? dataProduct?.categoryName
                    : typeProductsById?.categoryName
                }
                disabled
              />
              <Input
                name={"Brand"}
                parentClassName={"mt-5"}
                className="text-gray-500"
                placeholder="Brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              />
              <Input
                name={"Series"}
                parentClassName={"mt-5"}
                className="text-gray-500"
                placeholder="Series"
                value={form.series}
                onChange={(e) => setForm({ ...form, series: e.target.value })}
              />
              <TextArea
                name={"Technical Parameter"}
                placeholder="Technical Parameter"
                className={"h-40 text-gray-500"}
                value={form.technical_parameter}
                onChange={(e) =>
                  setForm({ ...form, technical_parameter: e.target.value })
                }
              />

              <div className="flex">
                <Button
                  value="Cancel"
                  className={"bg-gray-300 w-full"}
                  buttonClassName="hover:bg-gray-500"
                  to={"/categories"}
                />
                <Button
                  value="Save"
                  className={"bg-primary w-full"}
                  buttonClassName={"hover:bg-blue-500"}
                  onClick={() => handleUpdate()}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </Provider>
  );
};

export default CategoriesEdit;
