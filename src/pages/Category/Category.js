import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Table from "../../components/table/Table";
import Pagination from "../../components/Pagination/Pagination";
import { APIURL } from "../../netWork/netWork";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { total } from './../../redux/actions/Product';
import { getCategoryList, deleteCategory } from './../../redux/actions/Category';


export default function Category() {

  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const { num } = useParams() || 1;


  const [categortId, setCategortId] = useState();
  const [page, setPage] = useState(num);
  const handelOpen = (id) => {
    setCategortId(id)
  }
  const pages = total;
  
  const [state] = useState({
    checValue: "",
    checkKey: "",
  });
  const [search, setSearch] = useState();

  useEffect(() => {
    dispatch(getCategoryList(page, { search, ...state }));

  }, [page, state, search, dispatch]);

  const handeldelete = (id) => {
    console.log(id);
    dispatch(deleteCategory(id));
  };
  const columns = [
    {
      key: "name",
      label: "Category name",
      type: "text",
    },
    {
      key: "image",
      label: "image",
      type: "action",
      payload({ row }) {
        return <img src={APIURL + row?.image[0]} alt="" height="50px" />;
      },
    },
    {
      key: "createdAt",
      label: "createdAt",
      type: "text",
    },
    {
      key: "updatedAt",
      label: "updatedAt",
      type: "text",
    },

    {
      key: "_id",
      label: "action",
      type: "action",
      payload({ row }) {
        return (
          <div className=" row justify-content-between align-content-center">
            <Link
              to={"/AddCategory/" + row._id}
              className="col-12 d-flex col-md-4 justify-content-center text-center align-content-center"
            >
              <i
                className="bi bi-pencil-square upicon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
              ></i>
            </Link>
            <i
              className="bi bi-trash-fill delicon   col-12 d-flex col-md-4 justify-content-center text-center align-content-center"
              onClick={() => handelOpen(row._id)}
              data-bs-placement="top"
              title="Delete"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
            ></i>

          </div>
        );
      },
    },
  ];
  return (
    <div className="container ">
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden='true'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Category</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              are you suer delete this
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn" style={{ color: "orange" }} data-bs-dismiss="modal" onClick={() => handeldelete(categortId)}>Sure</button>
            </div>
          </div>
        </div>
      </div>
      <Link to="/AddCategory">
        <button className="btn btn-btn m-3 ">New Category</button>
      </Link>
      <div className="container ">
        {categories && categories?.length ? (
          <>
            <Table columns={columns} rows={categories} />

          </>
        ) : (
          "no data"
        )}
      </div>
    </div>
  );

}