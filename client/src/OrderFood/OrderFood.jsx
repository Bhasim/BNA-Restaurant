import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../src/context/auth";

import { context } from "../Context";
import axios from "axios";
import "./orderFood.scss";
import { useCart } from "../../src/context/cart";
import { Toast } from "bootstrap";
import toast from "react-hot-toast";
import Food from "../Food/Food";

function OrderFood({ clickedFood }) {
  const [auth, setAuth] = useAuth();
  let [editClickedFood, setEditClickedFood] = useState(clickedFood);
  let { orderFood, setOrderFood, users, setUsers, fetchUsers,signedInValue } =
    useContext(context);
  console.log("🚀 ~ file: OrderFood.jsx:16 ~ OrderFood ~ users", users);
  let [popFade, setPopFade] = useState(true);
  let findUserBySignedIn = users.find(item => item.email === signedInValue?.user?.email)
  let foundUserId = findUserBySignedIn?._id
  // let signedIn = "6390a9d410f1228dcc326dc6"; //! this will be replaced with the signed in state

  let findUser = users.find((item) => item._id === foundUserId);
  console.log("🚀 ~ file: OrderFood.jsx:20 ~ OrderFood ~ findUser", findUser);
  let [selectedUser, setSelectedUser] = useState(findUser);
  // console.log("🚀 ~ file: OrderFood.jsx ~ line 13 ~ OrderFood ~ selectedUser", selectedUser)
  console.log("editclickedFood", editClickedFood);

  // const [cart, setCart] = useCart();

  let handlePlus = () => {
    setEditClickedFood({
      ...editClickedFood,
      quantity: editClickedFood.quantity + 1,
    });
  };
  let handleMinus = () => {
    if (editClickedFood.quantity < 2) {
      return;
    } else {
      setEditClickedFood({
        ...editClickedFood,
        quantity: editClickedFood.quantity - 1,
      });
    }
  };

  let handleAnimate = () => {
    setPopFade(false);
    setTimeout(() => setOrderFood(false), 500);
    fetchUsers().then((result) => setUsers(result));
  };

  let handleAddToCart = async () => {
    if (selectedUser.cart.some((item) => item._id === editClickedFood._id)) {
      let sameFood = selectedUser.cart.map((itemMapped) =>
        itemMapped._id === editClickedFood._id
          ? {
              ...itemMapped,
              quantity: itemMapped.quantity + editClickedFood.quantity,
            }
          : itemMapped
      );
      setSelectedUser({ ...selectedUser, cart: sameFood });
      await axios.put(`/update/${selectedUser._id}`, {
        ...selectedUser,
        cart: sameFood,
      });
      fetchUsers().then((result) => setUsers(result));
      setPopFade(false);
      setTimeout(() => setOrderFood(false), 500);
      return;
    }

    setSelectedUser({
      ...selectedUser,
      cart: [...selectedUser.cart, editClickedFood],
    });
    await axios.put(`/update/${selectedUser._id}`, {
      ...selectedUser,
      cart: [...selectedUser.cart, editClickedFood],
    });
    fetchUsers().then((result) => setUsers(result));
    setPopFade(false);
    setTimeout(() => setOrderFood(false), 500);
  };

  let TotalPrice = editClickedFood.quantity * editClickedFood.price;

  return (
    <div className="orderFood">
      <div
        style={
          popFade ? { animation: "pop 1s" } : { animation: "popFade 0.6s" }
        }
        className="order"
      >
        {/* =============== close =========== */}
        <div className="IX">
          <h1 title="Close" onClick={handleAnimate}>
            X
          </h1>
        </div>
        {/* =============== container ========= */}
        <div className="orderCon">
          <a>
            <img src={editClickedFood.img} alt="" />
          </a>
          <h1>
            {editClickedFood.name[0].toUpperCase() +
              editClickedFood.name.slice(1)}
          </h1>
          <ul>
            {editClickedFood.ing.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          <span className="quan">
            <button title="Decrease the quantity" onClick={handleMinus}>
              -
            </button>
            <h3>{editClickedFood.quantity}</h3>
            <button title="Increase the quantity" onClick={handlePlus}>
              +
            </button>
          </span>
          <span className="add">
            <button onClick={handleAddToCart}>Add to cart</button>
            <h4>Total: {TotalPrice.toFixed(2)}€</h4>
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderFood;
