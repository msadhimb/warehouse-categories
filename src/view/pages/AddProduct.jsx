import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

const AddProduct = () => {
  // Get Id From Url
  const params = useParams();
  const categoryId = params.idcategory;
  const typeId = params.idtype;

  // Navigation Variabel
  const nav = useNavigate();

  // Form
  const [form, setForm] = useState({
    name: "",
    brand: "",
    series: "",
    technical_parameter: "",
  });

  // Post Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(process.env.CUD_API_PATH + "/product", {
        name: form.name,
        category_id: categoryId,
        type_id: typeId,
        brand: form.brand,
        series: form.series,
        technical_parameter: form.technical_parameter,
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully",
          text: "Product has been added",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          nav(`/categories`);
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed",
          text: error.response.data.message || `Something went wrong`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-8/12">
        <Input
          name={"Product Name"}
          className="text-gray-500"
          placeholder={"Category Name"}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          name={"Brand"}
          className="text-gray-500"
          placeholder={"Category Name"}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />
        <Input
          name={"Series"}
          className="text-gray-500"
          placeholder={"Category Name"}
          onChange={(e) => setForm({ ...form, series: e.target.value })}
        />
        <TextArea
          name="Technical Parameter"
          className="text-gray-500"
          placeholder="Technical Parameter"
          onChange={(e) =>
            setForm({ ...form, technical_parameter: e.target.value })
          }
        />

        <div className="flex justify-end mr-5">
          <Button
            value="Save"
            className={"bg-primary rounded-md hover:bg-blue-500"}
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
