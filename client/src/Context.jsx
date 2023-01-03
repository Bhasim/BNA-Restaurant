import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from "use-local-storage";
export let context = createContext()
function Context(props) {
    let fetchData =async () => {
        let fetching = await fetch("/getReciepes")
        let json = await fetching.json()
        return json
    }
  let [data, setData] = useState([])
  
  let fetchUsers = async() => {
    let fetching = await fetch("/api/users")
    let json = await fetching.json()
    return json
  }
  let [users, setUsers] = useState([])
  let [bookValue,setBookValue] = useState({date:"",hour:""})
  
  let fetchingSpecial = async () => {
    let fetchData = await fetch("/api/getSpecial")
    let res = await fetchData.json()
    return res
}
let [dataSpecial,setDataSpecial] = useState([])

  let fetchingChat = async () => {
    let fetching = await fetch("/api/getChat")
    let json = await fetching.json()
    return json
  }
  let [chatArray, setChatArray] = useState([])

  let fetchingGetIsChefOnline = async () => {
    let fetching = await fetch("/api/getIsChefOnline")
    let json = await fetching.json()
    return json
  }
  let [isChefOnline,setIsChefOnline] = useState()
  
  let fetchingGetSelectedUserId = async () => {
    let fetching = await fetch("/api/getSelectedUserId")
    let json = await fetching.json()
    return json
  }
  let [selectedUserId,setSelectedUserId] = useState()
  
    useEffect(() => {
       fetchData().then(result => setData(result)) 
      fetchUsers().then(result => setUsers(result)) 
      fetchingChat().then(result => setChatArray(result[0].chat))
      fetchingGetIsChefOnline().then(result => setIsChefOnline(result[0].isOnline))
      fetchingGetSelectedUserId().then(result => setSelectedUserId(result[0].selectedUserId))
    }, [])

    let [orderFood,setOrderFood] = useState(false)
  let [popUp, setPopUp] = useLocalStorage("popup", true)
  let [signedInValue,setSignedInValue] = useLocalStorage("signedin")
  
  
    
  return (
      <context.Provider value={{data,setData,orderFood,setOrderFood,popUp,setPopUp,users,setUsers,fetchUsers,bookValue,setBookValue,fetchingSpecial,dataSpecial,setDataSpecial,chatArray, setChatArray,fetchingChat,isChefOnline,setIsChefOnline,fetchingGetIsChefOnline,selectedUserId,setSelectedUserId,fetchingGetSelectedUserId,signedInValue,setSignedInValue}} >
          {props.children}
    </context.Provider>
  )
}

export default Context