import React from 'react'
import Category from '../Category/Category'
import Header from '../Header/Header'
import AOS from 'aos';
import TopMeal from '../TopMeal/TopMeal'
import Test from "../test/Test";
import "./menu.scss"


function Menu2() {
  AOS.init();

  return (
    <div data-aos="fade-right"
      data-aos-offset="200"
      data-aos-easing="ease-in-sine"
      data-aos-duration="800">
      <>
        <Header home="Home" book={"Book"} contact={"Contact"} special="Special" cart={"Cart"} />
        <Test />
        <div>
        <h1 className='textMenu'>The Menu</h1>
        </div>
        <Category />

        <TopMeal />

        <div className="menu">

        </div>
      </>
    </div>

  )
}

export default Menu2