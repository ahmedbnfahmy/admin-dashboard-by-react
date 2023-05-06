import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductList,
  total,
  deleteProduct,
} from "../../redux/actions/Product";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/table/Table";
import { APIURL } from "../../netWork/netWork";


export default function Products() {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { num } = useParams() || 1;

  
  const [page, setPage] = useState(num);
  const pages = total;
  
  const [search, setSearch] = useState();

  const [categortId, setCategortId] = useState();
  const [open, setOpen] = useState(false);
  const handelOpen=(id)=>{
    setOpen(true)
    setCategortId(id)
  }


  
  useEffect(() => {
    dispatch(getProductList(page, { search }));

    // setPages(total)
  }, [dispatch, page, search]);

 

  const handeldelete = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
  };
  const columns = [
    {
      key: "name",
      label: "Product name",
      type: "text",
    },
    {
      key: "image",
      label: "image",
      type: "action",
      payload({ row }) {
        return <img src={APIURL + row.imagePath[0]} alt="" height="50px" />;
      },
    },
    {
      key: "countInStock",
      label: "Stock",
      type: "text",
    },
    {
      key: "price",
      label: "price",
      type: "text",
    },

    {
      key: "_id",
      label: "action",
      type: "action",
      payload({ row }) {
        return (
          <div className=" row justify-content-between align-content-center  ">
            <Link
              to={"/ProductDetails/" + row._id}
              className="col-12 d-flex col-md-4 justify-content-center text-center align-content-center"
            >
            </Link>
            <Link
              to={"/FormProduct/" + row._id}
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
       <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={open.toString()}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Product</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        are you suer delete this product..!
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn" style={{color:"orange"}}  data-bs-dismiss="modal" onClick={() => handeldelete(categortId)}>Sure</button>
      </div>
    </div>
  </div>
</div>
      <Link to="/FormProduct">
        <button className="btn btn-btn m-3 ">New Product</button>
      </Link>
      <div className="container ">
        <div className="ms-auto row mb-3 col-lg-6">
          <div className="topnav__search col-6" style={{marginLeft:260}}>
            <input
              type="text"
              placeholder="Search here..."
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <i className="bx bx-search"></i>
          </div>
        </div>
        {products.length ? (
          <>
            <Table columns={columns} rows={products} />
            <Pagination page={page || 1} pages={pages} changePage={setPage} />
          </>
        ) : (
          "no data"
        )}
      </div>
    </div>
  );
}
