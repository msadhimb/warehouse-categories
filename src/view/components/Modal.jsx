import Input from "../components/Input";
import SelectCategory from "../components/SelectCategory";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { TbCircleCheckFilled, TbTrashXFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductCategory,
  deleteProductType,
  getProductCategory,
  getProductType,
  getProductTypeById,
  setId,
} from "../../config/Redux/Action";
import Button from "./Button";
import axios from "axios";
import Swal from "sweetalert2";

const Modal = ({ showModal, data, cancel, name }) => {
  const dispatch = useDispatch();

  // Get Id From Redux
  const { products } = useSelector((state) => state.productReducer);

  // Get Data Category
  const { categoryProducts } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductCategory());
  }, [categoryProducts]);

  // Get Data Type By Detail
  const { typeProductsById } = useSelector((state) => state.productReducer);

  // Edit
  const [edit, setEdit] = useState(false);

  /* ======= Type Update ======= */
  // Form
  const [form, setForm] = useState({
    name: "",
  });
  useEffect(() => {
    setForm({
      name: typeProductsById.name,
    });
  }, [typeProductsById]);
  // Handle Update
  const handleUpdate = async (id) => {
    const response = await axios
      .put(`${process.env.CUD_API_PATH}/type/${id}`, {
        name: form.name,
        category_id:
          products.idCategory == ""
            ? typeProductsById.categoryId
            : products.idCategory,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Successfully Updated Type Data",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <React.Fragment>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl text-center font-semibold">{name}</h3>
                </div>
                {/*body*/}
                <div
                  className="relative px-4 flex-auto"
                  style={{ width: "45rem" }}
                >
                  <div className="flex flex-col my-4 text-slate-500 text-lg leading-relaxed">
                    {data.map((item) => {
                      if (edit === true && item.id === products.idType) {
                        return (
                          <React.Fragment key={item.id}>
                            <div className="flex justify-between p-2 items-center">
                              <div className="w-1/2">
                                <Input
                                  name="Name"
                                  placeholder="Type Name"
                                  value={form.name}
                                  onChange={(e) => {
                                    setForm({
                                      ...form,
                                      name: e.target.value,
                                    });
                                  }}
                                />
                                <SelectCategory
                                  name="Category"
                                  data={categoryProducts}
                                  id={typeProductsById.categoryId}
                                />
                              </div>

                              <div className="flex">
                                <TbCircleCheckFilled
                                  color="#00c9a7"
                                  width={3}
                                  size={23}
                                  className={"cursor-pointer mr-2"}
                                  onClick={() => {
                                    handleUpdate(item.id);
                                    setEdit(false);
                                  }}
                                />
                                <MdCancel
                                  color="#ff4564"
                                  width={3}
                                  size={23}
                                  className={"cursor-pointer"}
                                  onClick={() => {
                                    if (name === "Type") {
                                      setEdit(false);
                                    } else {
                                      dispatch(deleteProductCategory(item.id));
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment key={item.id}>
                            <div className=" flex justify-between p-2 items-center">
                              <p className="text-md">{item.name}</p>

                              <div className="flex">
                                <AiOutlineEdit
                                  color="#ff9945"
                                  width={3}
                                  size={23}
                                  className={"cursor-pointer mr-2"}
                                  onClick={() => {
                                    if (name === "Type") {
                                      dispatch(setId("idType", item.id));
                                      setEdit(true);
                                      dispatch(getProductTypeById(item.id));
                                    } else {
                                      dispatch(deleteProductCategory(item.id));
                                    }
                                  }}
                                />
                                <TbTrashXFilled
                                  color="#ff4564"
                                  width={3}
                                  size={23}
                                  className={"cursor-pointer"}
                                  onClick={() => {
                                    if (name === "Type") {
                                      dispatch(deleteProductType(item.id));
                                    } else {
                                      dispatch(deleteProductCategory(item.id));
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      }
                    })}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end px-2 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    buttonClassName="bg-gray-300 hover:bg-gray-500"
                    onClick={() => {
                      cancel();
                      setEdit(false);
                    }}
                    value="Cancel"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </React.Fragment>
  );
};

export default Modal;
