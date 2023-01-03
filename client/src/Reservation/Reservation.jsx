import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { context } from "../Context";
import "./reservation.scss";
import book from "../images/logo-bna.png";
import Reviewers from "../Reviewers/Reviewers";
// import ReviewSubmit from "../ReviewSubmit/ReviewSubmit";
import DateComponent from "../DateComponent/DateComponent";
import AOS from "aos";
import "aos/dist/aos.css";
function Reservation() {
  let { users, fetchUsers, setUsers, bookValue, setBookValue,signedInValue } = useContext(
    context
  );
  let [bookConfirm, setBookConfirm] = useState(false);
  let [count, setCount] = useState(5);
  let [intervalState, setIntervalState] = useState();
  let [show, setShow] = useState(true);
  console.log(
    "🚀 ~ file: Reservation.jsx ~ line 12 ~ Reservation ~ count",
    count
  );
  let findUserBySignedIn = users.find(item => item.email === signedInValue?.user?.email)
  let foundUserId = findUserBySignedIn?._id
  // let signedIn = "6390a9d410f1228dcc326dc6"; //! this will be replaced with the signed in state

  let findUser = users.find((item) => item._id === foundUserId);
  let [selectedUser, setSelectedUser] = useState(findUser);

 
  let handleSubmit = async (e) => {
    e.preventDefault();

    if (bookValue?.date !== "" && bookValue?.hour !== "") {
      setSelectedUser({ ...selectedUser, book: bookValue });
      await axios.put(`/update/${foundUserId}`, {
        ...selectedUser,
        book: bookValue,
      });

      // ===========================
      fetchUsers().then((result) => setUsers(result));
      setSelectedUser(findUser);
      // setCount(3)
      setTimeout(() => setBookValue({ date: "", hour: "" }), 5000);

      setBookConfirm(true);
    } else {
      alert("You must select date and time ");
    }

  };

  useEffect(() => {
    fetchUsers().then((result) => setUsers(result));
    setSelectedUser(findUser);
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    let timer;
    if (bookConfirm) {
      timer = setInterval(() => setCount((count) => count - 1), 1000);
      setIntervalState(timer);
      if (count === 0) {
        console.log(
          "🚀 ~ file: Reservation.jsx ~ line 77 ~ useEffect ~ count",
          count
        );
        setShow(false);
        setTimeout(() => setBookConfirm(false), 1000);
        clearInterval(timer);
        setCount(5);
      }
      console.log(
        "🚀 ~ file: Reservation.jsx ~ line 84 ~ useEffect ~ timer",
        timer
      );
    } else {
      clearInterval(intervalState);
    }
  }, [bookConfirm]);

  useEffect(() => {
    if (count === 0) {
      setShow(false);
      setTimeout(() => setBookConfirm(false), 1000);
      setCount(5);
    }
  }, [count]);

  let dateNow = new Date().toJSON().slice(0, 10);
  return (
    <article data-aos="fade-right">
      <Header home="Home" menu="Menu" contact="Contact" cart="Cart" special="Special" />
      {/* <ReviewSubmit/> */}

      <div className="book">
        <form onSubmit={handleSubmit}>
          {/* ============== Date =============== */}
          {/* <div className='date'>
          <input required value={bookValue.date} type="date" name="date" id="" min={dateNow} onChange={handleChange} />
          <h1>{ bookValue.date && `The selected date is: ${bookValue.date}` }</h1>
        </div> */}
          {/* =============== Hour ================== */}
          {/* <div className="hour">
        <select onChange={handleChange} name="hour" id="">
          <option disabled value="">Select</option>
          <option value="08:00">08:00</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
          <option value="13:00">13:00</option>
          <option value="14:00">14:00</option>
          <option value="15:00">15:00</option>
          <option value="16:00">16:00</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="21:00">22:00</option>
          </select>          
          <h1>{ bookValue.hour && `The selected hour is: ${bookValue.hour}` }</h1>
        </div> */}

          <DateComponent />

          <button disabled={bookValue?.date === "" && bookValue?.hour === ""} className="bookBtn">
          <span className='liquidText' >Book</span>
                        <div class="liquid"></div>
          </button>
        </form>
        {/* =========================== Right ====================== */}
        <div className="right">
          {bookConfirm ? (
            <span
              style={
                show
                  ? { animation: "show 1s forwards" }
                  : { animation: "hide 1s" }
              }
            >
              <div className="inside">
                <h1>Hi {selectedUser?.name}</h1>
                <p>Your Reservation is successfuly done</p>
                <p>
                  your reservation on {bookValue?.date}, at {bookValue?.hour}
                </p>
                <p>You will receive a confirmation E-Mail</p>
                <h3>Thank you</h3>
                <h4>This message will disappear in {count}</h4>
              </div>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
      <Reviewers />
    </article>
  );
}

export default Reservation;
