import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";

const AddCategories = () => {
  // Navigation Variabel
  const nav = useNavigate();

  // Form
  const [name, setName] = useState("");

  // Post Data
  const handleSubmit = async (e) => {
    const response = await axios
      .post(process.env.CUD_API_PATH + "/category", {
        name: name,
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully",
          text: "Category has been added",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          nav(`/add/type/${response.data.result.id}`);
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
    document.title = "Add Categories";
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-8/12">
        <Input
          name={"Category Name"}
          className="text-gray-500"
          placeholder={"Category Name"}
          onChange={(e) => setName(e.target.value)}
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

export default AddCategories;
