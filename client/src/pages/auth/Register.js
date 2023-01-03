
import React from "react"
import { useState } from "react";
import Jumbotron from "../../components/cards/jumbotron";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";



import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [plz, setplz] = useState("");
//hook
const [auth, setAuth] = useAuth();
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/register`,
        {
          name,
          email,
          password,
          Mobile,
          city,
          plz,
        }
      );
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth",JSON.stringify(data))
        setAuth({...auth,token: data.token,user: data.user})
        toast.success("Registration successful");
        //navigate("/dashboard/user")
        navigate("/login")
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div>
      <Jumbotron title="Register" />
     
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="phone number"
                className="form-control mb-4 p-2"
                placeholder="Enter your phone number"
                value={Mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="city"
                className="form-control mb-4 p-2"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
               <input
                type="plz"
                className="form-control mb-4 p-2"
                placeholder="Enter your plz"
                value={plz}
                onChange={(e) => setplz(e.target.value)}
              />
              <button className="custom-btn btn-2" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}