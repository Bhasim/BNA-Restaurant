import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { context } from '../Context'
import Header from '../Header/Header'
import "./showMyMeals.scss"
import AOS from "aos";
import "aos/dist/aos.css";
function ShowMyMeals() {
    let navigate = useNavigate()
    let {dataSpecial,setDataSpecial,fetchingSpecial,users,signedInValue} = useContext(context)
    // let signedIn = "63778a56579e1a16e6272c55"
    let findUserBySignedIn = users.find(item => item.email === signedInValue?.user?.email)
    let foundUserId = findUserBySignedIn?._id
    let filterMyMeals = dataSpecial.filter(item => item.userId === foundUserId)
    console.log("🚀 ~ file: ShowMyMeals.jsx ~ line 9 ~ ShowMyMeals ~ filterMyMeals", filterMyMeals)
    let handleDelete = async(id) => {
        await axios.delete(`/deleteSpecial/${id}`)
       fetchingSpecial().then(result => setDataSpecial(result)) 


    }

    let handleGoBack = () => {
        navigate("/special")
    }

    useEffect(() => {
        fetchingSpecial().then(result => setDataSpecial(result)) 
    AOS.init({ duration: 2000 });

     }, [])

  return (
      <div data-aos="fade-down" className='showMyMealsMain'>
          <Header menu="menu" contact="Contact" cart="Cart" book="Book" />
          <button className='back' onClick={handleGoBack}>Back</button>
          <div className="showMyMeals">
          {filterMyMeals.map(item => (
                      <div data-aos="flip-right" className="singleMyMeal">
                          <h1>{item.meal[0].toUpperCase() + item.meal.slice(1)}</h1>
                          <h3>{item.price}€</h3>
                          <h4>Type: {item.type[0].toUpperCase() + item.type.slice(1)}</h4>
                          <a className='imgAnchor'><img src={`${item.image}`} alt="" /></a>
                          <span>
                              {item.userId === foundUserId && (
                                  <button onClick={()=>handleDelete(item._id)}>Delete</button>
                              )}
                          </span>
                      </div>
          ))}
              {filterMyMeals.length === 0 && <p className='noPublishedMeals'>There is no published meals...</p>}
          </div>
      </div>
  )
}

export default ShowMyMeals