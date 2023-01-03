
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import {Badge} from "antd"
import "../../index.css"

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <ul>

        

        {!auth.user ? (
          <>
            
            
          </>
        ) : (
          <><><li className="nav-item ">
              <button onClick={logout} className="logout">
                logout
              </button>
            </li></><button onClick={() => navigate("/dashboard/user")} className="page">user-page</button></>
        )}
      </ul>
    </>
    
  );
}