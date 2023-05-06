import { axiosInstance } from '../../netWork/netWork'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddGovACity = (city) => async (dispatch) => {
    try {
      const response = await axiosInstance.post('/city',city); 
      dispatch({
        type: "ADD_NEW_CITY",
        payload: response.data,
      });
      toast.success(`${response.data.name} was added successfully`, {
        position: toast.POSITION.TOP_RIGHT,
    });
    } catch (err) {
      toast.error(`${err.message} `, {
        position: toast.POSITION.TOP_RIGHT,
    });
    }
  };


export const getAllCities = () => async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/city`); 
      dispatch({
        type: "GET_ALL_cITY",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const deletecitie = (id) => async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`/city/${id}`); 
      const res = await axiosInstance.get(`/city`); 
      dispatch({
        type: "DELET_CITIE",
        payload: res.data,
      });
      toast.success(`City was deleted successfully`, {
        position: toast.POSITION.TOP_RIGHT,
    });
    } catch (err) {
      toast.error(`${err.message} `, {
        position: toast.POSITION.TOP_RIGHT,
    });
    }
  };
  
  export const GetSingleCity = (id) => async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/city/city/${id}`); 
      dispatch({
        type: "GET_SINGIL_CITY",
        payload: response.data,
      });
    } catch (err) {
    }
  };

  export const UpdateCity = (city , id) => async (dispatch) => {
    try {
      const response = await axiosInstance.put(`/city/${id}`,city); 
      dispatch({
        type: "UPDATE_CITY",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };


  export var total;
export const getCityPaginationtList = (pag) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(`/city/pagination?page=${pag}`);
        total = response.data.pages;
        dispatch({
            type: "GET_CITY_LIST_PAGE",
            payload: response.data.data
        });
    } catch (err) {
        console.log(err);
    }
};

export const getAllCitiesByGovName = (Name) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/city/${Name}`); 
    dispatch({
      type: "GET_ALL_CITY_GOV_NAME",
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};