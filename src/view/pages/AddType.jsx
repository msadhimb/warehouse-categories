import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AddType = () => {
  // Get Id From Url
  const params = useParams();
  const categoryId = params.id;

  // Navigation Variabel
  const nav = useNavigate();

  // Form
  const [typeName, setTypeName] = useState("");

  // Post Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(process.env.CUD_API_PATH + "/type", {
        name: typeName,
        category_id: categoryId,
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully",
          text: "Type has been added",
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

  // Enter Key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // Set Title
  useEffect(() => {
    document.title = "Add Type";
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-8/12">
        <Input
          name={"Type Name"}
          className="text-gray-500"
          placeholder={"Type Name"}
          onChange={(e) => setTypeName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        <div className="flex justify-end mr-5">
          <Button
            value="Next"
            className={"bg-primary rounded-md hover:bg-blue-500"}
            onClick={(e) => handleSubmit(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddType;
