import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function AdminProducts() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [products, setProducts] = useState([]);
  const[total,setTotal] = useState()
  const [page,setPage] = useState(1)
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    loadProducts();
  }, []);
  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
 

  return (
    <>
      <Jumbotron
        title={`Hello ${auth.user.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Products</div>
            { console.log(products)}
            {products.map((p) => (
             
              <Link
                key={p._id}
                to={`/dashboard/admin/product/update/${p._id}`}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${p.img}`}
                        alt={p.ing}
                        className="img img-fluid rounded-start"
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.type}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            {moment(p.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
         
        </div>
        <div className="container text-center p-5">
          {products && products.length < total && (
            <button
              className="btn"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
        
      </div>
      
    </>
  );
}