const initialState = {
  products: {
    idCategory: "",
    idType: "",
  },
  dataProducts: [],
  typeProducts: [],
  categoryProducts: [],
  typeProductsById: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ID":
      return {
        ...state,
        products: {
          ...state.products,
          [action.formType]: action.formValue,
        },
      };
    case "GET_PRODUCT":
      return {
        ...state,
        dataProducts: action.payload,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        dataProducts: state.dataProducts.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    case "GET_PRODUCT_TYPE":
      return {
        ...state,
        typeProducts: action.payload,
      };
    case "GET_PRODUCT_TYPE_BY_ID":
      return {
        ...state,
        typeProductsById: action.payload,
      };
    case "DELETE_PRODUCT_TYPE":
      return {
        ...state,
        typeProducts: state.typeProducts.filter(
          (type) => type.id !== action.payload.id
        ),
      };
    case "GET_PRODUCT_CATEGORY":
      return {
        ...state,
        categoryProducts: action.payload,
      };
    case "DELETE_PRODUCT_CATEGORY":
      return {
        ...state,
        categoryProducts: state.categoryProducts.filter(
          (category) => category.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
