import React, { useContext, useEffect, useState } from 'react'
import {context} from "../Context"
import {NavLink} from "react-router-dom"
import {Link,useParams} from "react-router-dom"
import "./food.scss"
import Logo from "../images/logo-bna.png"
import OrderFood from '../OrderFood/OrderFood'
import Header from '../Header/Header'
import AOS from "aos";
import "aos/dist/aos.css";
function Food() {
  let {type} = useParams()
  //let meat = "drinks" //? this is will be replaced with useParams
  let { data,orderFood,setOrderFood } = useContext(context)
  let findTypeFood = data.filter(item => type === item.type)
  // ============================== handleOrder ===========================
  let [clickedOrder,setClickedOrder] = useState()
  console.log("🚀 ~ file: Food.jsx ~ line 13 ~ Food ~ clickerOrder", clickedOrder)
  let handleOrder = (item) => {
    setClickedOrder(item)
    setOrderFood(true)
  }

  useEffect(() => {
    AOS.init({ duration: 2000 });
}, [])
 
  return (
    <div  className='food'>
      {orderFood && <OrderFood clickedFood={ clickedOrder}/>}
      {/* ============================= Header ======================= */}
    
    <Header contact="Contact" book="Book" cart="Cart" special="Special" />
      {/* ==================== Food ======================== */}
      <div className="foodCon">
        {findTypeFood.map((item,i) => (
          
          <div data-aos="flip-right" onClick={()=>handleOrder(item)} key={i} className="box">
            <a data-type={item.name[0].toUpperCase() + item.name.slice(1)} className='foodImg'><img src={item.img} alt="" /></a>
            <h1>{item.name[0].toUpperCase() + item.name.slice(1)}</h1>
            <div className="boxText">
            <h2>Description</h2>
              <div className="ingre">
              {item.ing.map((singleIng,key) => (
              <p key={key}>{singleIng}</p>
            ))}
              </div>
              <div className="textEnd">
              <h4>Total sold { item.rate}</h4>
            <h3>{item.price}€</h3>
              </div>
            </div>
          </div>
          
        ))}
      </div>
      
    </div>
  )
}

export default Food;