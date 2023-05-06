import { axiosInstance } from '../../netWork/netWork'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = {
  headers: {
    'content-type': 'multipart/form-data; boundary=--------------------------037384031508980924639346'

  }
};
export const getCategoryList = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/category`);
    dispatch({
      type: "GET_Category_LIST",
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const GetSingleCategory = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/category/Admin/speciefic/${id}`);

    dispatch({
      type: "GET_SINGIL_Category",
      payload: response.data,

    });
  } catch (err) {
    console.log(err);
  }
};


export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    const res = await axiosInstance.get(`/category`);

    dispatch({
      type: "DELETE_Category",
      payload: res.data,
    });
    toast.success(`Item was deleted successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (err) {
    toast.error(`${err.message} `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const AddCategory = (category) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/category', category, config);
    dispatch({
      type: "ADD_Category",
      payload: response.data,
    });
    toast.success(`Item was added successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (err) {
    toast.error(`${err.message} `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

export const UpdateCategory = (Category, id) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/category/${id}`, Category, config);
    dispatch({
      type: "UPDATE_Category",
      payload: response.data,
    });
    toast.success(`${response.data.name} was updated successfully`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } catch (err) {
    toast.error(`${err.message} `, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};


