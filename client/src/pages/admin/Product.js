import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Select } from "antd";
//import { type } from "os";

const { Option } = Select;

export default function AdminProduct() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [categories, setCategories] = useState([]);
  const [img,setImg] = useState("");
  const [name, setName] = useState("");
  const [ing, setIng] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  // hook
  const navigate = useNavigate();

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("img", img);
      productData.append("name", name);
      productData.append("ing", ing);
      productData.append("price", price);
      productData.append("type", type);
      productData.append("rate", rate);
      productData.append("quantity", quantity);

      const { data } = await axios.post("/product", productData);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is created`);
        navigate("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product create failed. Try again.");
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>

            {img && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(img)}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {img ? img.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
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
              onChange={(e) => setRate(e.target.value)}
            >
              
            </input>

            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose category"
              onChange={(value) => setType(value)}
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

            <button onClick={handleSubmit} className="custom-btn btn-2">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}