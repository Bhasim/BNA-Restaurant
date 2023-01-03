import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

export default function AdminProductUpdate() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [ing, setIng] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [rate, setRate] = useState("");

  const [quantity, setQuantity] = useState("");
  const [id, setId] = useState("");
  // hook
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProduct = async () => {
    try {
      console.log(params);
      const { data } = await axios.get(`/product/${params.id}`);
      console.log("data =>", data);
      setName(data.name);
      setType(data.type);
      setPrice(data.price);
      setIng(data.ing);
      setImg(data.img);
      setRate(data.rate);
      setQuantity(data.quantity);

      setId(data._id);
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
     img && productData.append("img", img);
      productData.append("name", name);
      productData.append("ing", ing);
      productData.append("price", price);
      productData.append("type", type);
      productData.append("rate", rate);
      productData.append("quantity", quantity);

      let { data } = await axios.post(`/product/${id}`, productData);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`${name} is updated`);
        navigate("");
      }
    } catch (err) {
     // console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const handleDelete = async (req, res) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(`/product/${id}`);
      toast.success(`"${data.name}" is deleted`);
      navigate("");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth.user.name}`} subTitle="Admin Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Update Product</div>

            {img ? (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(img)}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            ) : (
              <div className="text-center">
                <img
                  src={`${
                    process.env.REACT_APP_API
                  }/img/${id}?${new Date().getTime()}`}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {img ? img.name : "Upload img"}
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a description"
              value={ing}
              onChange={(e) => setIng(e.target.value)}
            />

            <input
              type="number"
              className="form-control p-2 mb-3"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="write a rate"
              value={rate}
              onChange={(value) => setRate(value)}
            ></input>

            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose category"
              onChange={(value) => setType(value)}
              value={type}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <input
              type="number"
              min="1"
              className="form-control p-2 mb-3"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <div className="d-flex justify-content-between">
              <button onClick={handleSubmit} className="custom-btn btn-2">
                Update
              </button>
              <button onClick={handleDelete} className="custom-btn btn-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
