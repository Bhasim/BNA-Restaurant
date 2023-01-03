import React,{useContext,useState,useEffect} from 'react'
import userLogo from "../images/user.png"
import { context } from '../Context';
import "./reviewers.scss"
import AOS from "aos";
import "aos/dist/aos.css";
function Reviewers() {
  let signedIn = "63734bf589f9105449918250"; //! this will be replaced with the signed in state

  let { users, fetchUsers, setUsers,signedInValue } = useContext(context)
  console.log("🚀 ~ file: Reviewers.jsx ~ line 8 ~ Reviewers ~ users", users)
  let findUserBySignedIn = users.find(item => item.email === signedInValue?.user?.email)
  let foundUserId = findUserBySignedIn?._id
  // let findUser = users.find(item => item._id === signedIn)
  // let [selectedUser, setSelectedUser] = useState(findUser) 
  // console.log("🚀 ~ file: Reviewers.jsx ~ line 10 ~ Reviewers ~ selectedUser", selectedUser)
  useEffect(() => {
    fetchUsers().then(result => setUsers(result)) 
    AOS.init({ duration: 2000 });
    
 }, [])
  
  return (
      <div className='reviewers'>
      <h1>Customers review</h1>
      <div className="reviewCon">
        {users.map(item => (
          item.comment && 
          <div data-aos="flip-right" className="reviewCard">
            <a><img src={userLogo} alt="" /></a>
            <h5>{ item.name}</h5>
            <p>{item.comment}</p>
            <span>{Array(item.rate).fill().map((_) => <h3>⭐️</h3>)}</span>
            <h5>{ item.createdAt.slice(0,10)}</h5>
          </div>
      ))}
      </div>
      </div>
  )
}

export default Reviewers