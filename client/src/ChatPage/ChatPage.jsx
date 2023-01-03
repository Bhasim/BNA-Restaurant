import React, { useState, useEffect, useContext } from "react";
import "./chatPage.scss";
import {FiSend} from "react-icons/fi"

import io from "socket.io-client";
import { context } from "../Context";
import Header from "../Header/Header";
import axios from "axios";
function ChatPage() {
  let { chatArray, setChatArray, users,setUsers,fetchUsers,isChefOnline,setIsChefOnline,fetchingGetIsChefOnline,fetchingChat,signedInValue } = useContext(context);
  // let { chatArray, setChatArray, users,setUsers,fetchUsers } = useContext(context);
  let  [userId,setUserId] = useState()
  console.log("🚀 ~ file: ChatPage.jsx:12 ~ ChatPage ~ userId", userId)
  let socket = io.connect("http://localhost:5000");
  let findUserBySignedIn = users.find(item => item.email === signedInValue?.user?.email)
  let foundUserId = findUserBySignedIn?._id
  let [input, setInput] = useState("");
  let [room, setRoom] = useState("123456789");
  // let signedIn = "639221e694527f0fea076e4b"
  let findUser = users.find((item) => item._id === foundUserId);
  // let [room, setRoom] = useState(userId);
  // let signedIn = "639221e694527f0fea076e4b" // this is id of the admin
  // let findUser = users.find((item) => item._id === signedIn);
  console.log("🚀 ~ file: OrderFood.jsx:20 ~ OrderFood ~ findUser", findUser);
  let [selectedUser, setSelectedUser] = useState(findUser);

  let [popupChat, setPopupChat] = useState(false);
  console.log("🚀 ~ file: ChatPage.jsx:10 ~ ChatPage ~ chatArray", chatArray);

  let handleChange = (e) => {
    setInput(e.target.value)
    fetchingChat().then(result => setChatArray(result[0].chat))
}

  let handleSend = (e) => {
    e.preventDefault();
    socket.emit("send-message", { input, room,foundUserId });
    setInput("")

  };

  let talk = async (item) => {
    fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline))
    setUserId(item._id)
    console.log("🚀 ~ file: ChatPage.jsx:29 ~ talk ~ item", item)
    setPopupChat(true);
    // setIsChefOnline(true)
    await axios.put(`/updateSelectedUserId`,{selectedUserId:item._id})
    // await axios.put(`/updateChef`, {isOnline:true })
    await axios.put(`/update/${item._id}`, { ...item, isChat: false })
    
    await axios.put(`/chefOnline`)
    fetchUsers().then(result => setUsers(result)) 
    

  };
  let closeTalk = async () => {
    fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline))
     axios.put(`/deleteChat`)
    setPopupChat(false)
    await axios.put(`/updateSelectedUserId`,{selectedUserId:""})

    // setIsChefOnline(false)
    await axios.put(`/chefOffline`)
    setChatArray([])
    // await axios.put(`/updateChef`, {isOnline:false })

    // setChatArray([])
  }

  let joinRoom = () => {
    if (room !== "") {
      socket.emit("join-room", room);
    }
  };
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setChatArray([...chatArray, data]);
      console.log("useEffect data...", data);
    });
    joinRoom();
    // fetchUsers().then(result => setUsers(result)) 

  }, [socket]);
  // setInterval(() =>fetchUsers().then(result => setUsers(result)),2000)
  setInterval(()=>fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline)) ,2000)
  // setInterval(()=>fetchingChat().then(result => setChatArray(result[0].chat)) ,2000) //! this could damage
  useEffect(() => {
    joinRoom();
    // fetchingChat().then(result => setChatArray(result[0].chat))
    fetchUsers().then(result => setUsers(result)) 
    // fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline))

  }, []);
  return (
    <>
      <Header
        home="Home"
        menu="Menu"
        contact="Contact"
        cart="Cart"
        special="Special"
      />

      <div className="chatPage">
        <h1 style={isChefOnline ? {color:"green"}:{color:"red"}} className="title">{ isChefOnline ? "You are Online" : "You are Offline"}</h1>
        <div className="chatPageUsers">
          {users.map((item) => (
            <h3 onClick={() => talk(item)} className={item.isChat && "notifi"}>
              {item.name}
            </h3>
          ))}
        </div>
        {/* =================================== */}
        {popupChat && (
             <div className="chats">
             <div className="chats-container">
               <span onClick={closeTalk}>X</span>
             <div className="chatsWindow">
             
               {chatArray.map((item) => (
                 <p className={item.foundUserId === foundUserId ? "red": "green"}>{item.input}</p>
               ))}
             </div>
             <form onSubmit={handleSend}>
             <input required value={input} onChange={handleChange} placeholder='How can i help you ?' type="text" name="message" id="" />
             <button className='chatBtn'> <FiSend className='chat-send' /></button>
             </form>
             </div>
           </div>
     )}
      </div>
    </>
  );
}

export default ChatPage;
