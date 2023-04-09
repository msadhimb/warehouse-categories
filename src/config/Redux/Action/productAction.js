import axios from "axios";
import Swal from "sweetalert2";

// Id
export const setId = (formType, formValue) => {
  return {
    type: "SET_ID",
    formType,
    formValue,
  };
};

// Product Data
export const getProduct = () => {
  return (dispatch) => {
    axios
      .get(process.env.READ_API_PATH + "/products")
      .then((res) => {
        dispatch({ type: "GET_PRODUCT", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(59, 130, 246, 0.5)",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(process.env.CUD_API_PATH + `/product/${id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Delete Product Success",
              timer: 1500,
              showConfirmButton: false,
            }).then((result) => {
              dispatch({ type: "DELETE_PRODUCT", payload: res.data });
              window.location.href = "/categories";
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something Went Wrong.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
};

// Product Type Data
export const getProductType = () => {
  return (dispatch) => {
    axios
      .get(process.env.READ_API_PATH + "/types")
      .then((res) => {
        dispatch({ type: "GET_PRODUCT_TYPE", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getProductTypeById = (id) => {
  return (dispatch) => {
    axios
      .get(`${process.env.CUD_API_PATH}/type/${id}`)
      .then((res) => {
        dispatch({ type: "GET_PRODUCT_TYPE_BY_ID", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteProductType = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure you want to delete this type?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(59, 130, 246, 0.5)",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.CUD_API_PATH}/type/${id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Delete Product Type Success",
              timer: 1500,
              showConfirmButton: false,
            }).then((result) => {
              dispatch({ type: "DELETE_PRODUCT_TYPE", payload: res.data });
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "This type is being used.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
};

// Product Category Data
export const getProductCategory = () => {
  return (dispatch) => {
    axios
      .get(process.env.READ_API_PATH + "/categories")
      .then((res) => {
        dispatch({ type: "GET_PRODUCT_CATEGORY", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteProductCategory = (id) => {
  return (dispatch) => {
    Swal.fire({
      title: "Are you sure you want to delete this category?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(59, 130, 246, 0.5)",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.CUD_API_PATH}/category/${id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Delete Product Type Success",
              timer: 1500,
              showConfirmButton: false,
            }).then((result) => {
              dispatch({ type: "DELETE_PRODUCT_CATEGORY", payload: res.data });
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "This type is being used.",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
};
