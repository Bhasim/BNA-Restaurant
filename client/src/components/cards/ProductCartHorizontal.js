import React from "react";
import moment from "moment";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import "../../index.css"


export default function ProductCardHorizontal({ p, remove = true }) {
  // context
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
 
  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    

  };
  
  

  return (
    <div
      className="card mb-3"
      // style={{ maxWidth: 540 }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`${p.img}`}
            alt={p.name}
            style={{
              height: "150px",
              width: "150px",
              objectFit: "cover",
              marginLeft: "-12px",
              borderRopRightRadius: "0px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {p.name}{" "}
            (  {p.price}€ )
            <hr/>
           You ordered {p.quantity}
           <hr/>
           <h6 className="order">   Total: { p.price * p.quantity}€</h6>
            </h5>
           
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <p className="card-text">
            <small className="text-muted">
           Listed at {moment(p.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
            </small>
          </p>
          {remove && (
            <button
              className="custom-btn btn-2"
              onClick={() => removeFromCart(p._id)}
            >
              Remove
            </button>
            
          )}
         
                  
                </div>
        </div>
        
      </div>
    
  );
}