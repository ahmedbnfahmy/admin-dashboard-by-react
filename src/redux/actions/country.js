import { axiosInstance } from '../../netWork/netWork'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getCountriesList = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/country/`);
        dispatch({
            type: "GET_COUNTRIES_LIST",
            payload: response.data,
        });
        
    } catch (err) {
        console.log(err);
        
    }
};


export const deleteCountry = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(`/country/${id}`);
        const res = await axiosInstance.get(`/country/`);
        dispatch({
            type: "DELET_COUNTRY",
            payload: res.data,
        });
        toast.success(`Country was deleted successfully`, {
            position: toast.POSITION.TOP_RIGHT,
        });
    } catch (err) {
        toast.error(`${err.message} `, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
};


export const AddCountryAction = (country) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/country', country);
        dispatch({
            type: "ADD_COUNTRY",
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


export const GetSingleCountry = (id) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/country/${id}`);
        dispatch({
            type: "GET_SINGIL_COUNTRY",
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
    }
};


export const UpdateCountry = (country, id) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`/country/${id}`, country);
        dispatch({
            type: "UPDATE_COUNTRY",
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


export var total;
export const getCountryPaginationtList = (pag) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(`/country/pagination?page=${pag}`);
        total = response.data.pages;
        dispatch({
            type: "GET_COUNTRY_LIST_PAGE",
            payload: response.data.data
        });
    } catch (err) {
        console.log(err);
    }}