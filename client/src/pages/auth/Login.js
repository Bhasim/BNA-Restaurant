import React from "react";
import { useState,useContext } from "react";
import Jumbotron from "../../components/cards/jumbotron";
import { useAuth } from "../../context/auth";
import {context} from "../../Context"
import { useNavigate, useLocation, NavLink, Navigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  // state
  const [email, setEmail] = useState("neven@gmail.com");
  const [password, setPassword] = useState("nnnnnn");
let {signedInValue,setSignedInValue} = useContext(context)
  //hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      setSignedInValue(data)
     

      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Welcome Back");
        if (data.user.role === 1) {
          navigate("/dashboard/admin");
        }else {
          navigate("/");
        }
        //navigate(location.state || `/dashboard/${data.user.role=== 1 ? "admin" : ""}`)
       
      }
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <div>
      <Jumbotron title="" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
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

              <button className="custom-btn btn-2" type="submit">
                Login
              </button>
            </form>
            <span>
              <h2>please register</h2>
              <button
                className="custom-btn btn-2"
                type="submit"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
