import React, { useContext, useState } from "react";
import { context } from "../Context";
import ReactStars from "react-rating-stars-component";
import "./reviewSubmit.scss";
import axios from "axios";
function ReviewSubmit() {
  let signedIn = "63778ff3579e1a16e6272d2f"; //! this will be replaced with the signed in state
  let { users,signedInValue } = useContext(context);
  let findUserBySignedIn = users.find(item => item.email === signedInValue?.user?.email)
  let foundUserId = findUserBySignedIn?._id
  let findUser = users.find((item) => item._id === foundUserId);
  let [selectedUser, setSelectedUser] = useState(findUser);
  let [commentValue, setCommentValue] = useState("");
  let [rateValue, setRateValue] = useState(null);
  console.log(
    "🚀 ~ file: ReviewSubmit.jsx ~ line 12 ~ ReviewSubmit ~ rateValue",
    rateValue
  );
  let handleSubmit = async (e) => {
    e.preventDefault();
    setSelectedUser({
      ...selectedUser,
      comment: commentValue,
      rate: rateValue,
    });
    await axios.put(`/update/${foundUserId}`, {
      ...selectedUser,
      comment: commentValue,
      rate: rateValue,
    });
    alert("Thank you, your submit is sent");
    setCommentValue("");
      setRateValue(null);
  };

  return (
    <div className="reviewSubmit">
      <form onSubmit={handleSubmit}>
        <h1>Submit your review</h1>
        <input
          type="text"
          onChange={(e) => setCommentValue(e.target.value)}
          value={commentValue}
          placeholder="Write your comment here..."
        />
        <ReactStars
          count={5}
          onChange={setRateValue}
          size={30}
          activeColor="#ffd700"
          classNames={"stars"}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ReviewSubmit;
