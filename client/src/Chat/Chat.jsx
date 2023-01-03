import React,{useState,useEffect,useContext} from 'react'
import { SiCodechef } from "react-icons/si"
import {FiSend} from "react-icons/fi"
import "./chat.scss"
import io from "socket.io-client"
import {context} from "../Context"
import axios from 'axios'
function Chat() {

    let {chatArray, setChatArray,users,fetchingChat,isChefOnline,setIsChefOnline,fetchingGetIsChefOnline,selectedUserId,setSelectedUserId,fetchingGetSelectedUserId,signedInValue} = useContext(context)
  console.log("============================", signedInValue)
  let findUserBySignedIn = users.find(item => item.email === signedInValue?.user?.email)
  let foundUserId = findUserBySignedIn?._id
    console.log("+++++++++++++++++++++++++++++++++++++++", foundUserId)
    console.log("************************************", findUserBySignedIn)
    console.log("🚀 ~ file: Chat.jsx:11 ~ Chat ~ selectedUserId", selectedUserId)
    console.log("🚀 ~ file: Chat.jsx:11 ~ Chat ~ isChefOnline", isChefOnline)
    console.log("🚀 ~ file: Chat.jsx:11 ~ Chat ~ chatArray", chatArray)
    // console.log("🚀 ~ file: Chat.jsx:9 ~ Chat ~ chatArray", chatArray)
    let [openChat, setOpenChat] = useState(false)
  let [animateOpenChat, setAnimateOpenChat] = useState(false)
    
  
    // let signedIn = "63932db8b554e58fa73d08c8"; //! this will be replaced with the signed in state

    let findUser = users.find((item) => item._id === foundUserId);
    console.log("🚀 ~ file: OrderFood.jsx:20 ~ OrderFood ~ findUser", findUser);
    let [selectedUser, setSelectedUser] = useState(findUser);




  
    let handleOpenChat = () => {
        setTimeout(() => setOpenChat(!openChat), 300)
      setAnimateOpenChat(!animateOpenChat)
      fetchingChat().then(result => setChatArray(result[0].chat))

      
    }
    // ================================================= Chat ===================================
    let socket = io.connect("http://localhost:5000")
    let [input, setInput] = useState("")
    let [room, setRoom] = useState("123456789")
    // let signedIn = "6390a9d410f1228dcc326dc6"
  let handleChange = (e) => {
    setInput(e.target.value)
    fetchingChat().then(result => setChatArray(result[0].chat))


  }
    let handleSend = async (e) => {
      e.preventDefault()
      socket.emit("send-message", { input, room,foundUserId })
      setSelectedUser({...selectedUser,isChat:true})
      setInput("")
      await axios.put(`/update/${foundUserId}`, { ...selectedUser, isChat: true })
      // await axios.put("/updateChat/6394668a303ff0e99efa3c11",chatArray)

  }
  

  let joinRoom = () => {
    if (room !== "") {
      socket.emit("join-room",room)
    }
  }

 


  useEffect(() => {
    socket.on("receive-message",async (data) => {
      setChatArray([...chatArray, data])
      
      // fetchingChat().then(result => setChatArray(result[0].chat))
      console.log("useEffect data...",data);
    })
    joinRoom() 
    // fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline))

    // fetchIsChefOnline().then(result => setIsChefOnline(result))
    // fetchingChat().then(result => setChatArray(result))
    // fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline))

  }, [socket])
  useEffect(() => {
    
  })
  setInterval(() => fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline)), 2000)
  useEffect(() => {
    joinRoom() 
    fetchingChat().then(result => setChatArray(result[0].chat))
    fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline))
    fetchingGetSelectedUserId().then(result => setSelectedUserId(result[0].selectedUserId))
    
    },[])
  return (
      <div className='chat-btn'>
          {/* ======================== */}
          {openChat && (
               <div style={animateOpenChat ? {animation:"animateChef 0.5s"} : {animation:"animateChefOff 0.5s"}} className="chat-left">
               <span className='chat-texts'>
            {selectedUserId === foundUserId || isChefOnline === false ? (
              chatArray.map(item => <p className={item.foundUserId === foundUserId ? "red" : "green"}>{ item.input}</p>)
              ): (
              <p className='busy'>The line is busy <br /> Refresh the page after sending the first message</p>
              )}
               </span>
               <form className='chatForm' onSubmit={handleSend}>
                   <input required  value={input} onChange={handleChange} placeholder='How can i help you ?' type="text" name="message" id="" />
                    <button className='chatBtn'> <FiSend className='chat-send' /></button>      
           
               </form>
           </div>
         )}
          {/* ========================== */}
          <div className="chat-right">
          
          <SiCodechef onClick={handleOpenChat} className='chefLogo' />
          </div>

         
    </div>
  )
}

export default Chat