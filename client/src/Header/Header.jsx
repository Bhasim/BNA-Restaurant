import React from 'react'
import { Link } from 'react-router-dom'
import "./header.scss"
import Logo from "../images/logo-bna.png"
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useCart} from "../../src/context/cart"
import Cart from '../pages/Cart';



         
function Header({home,book,contact,cart,menu,special}) {
  return (
    <header>
        <Link to="/" className='image' ><img src={Logo} alt="" /></Link>
        <nav className='navHeader'>
        <Link to="/">{home}</Link>
          <Link to="/reservation">{book}</Link>
          <Link to="/contact" >{contact}</Link>
          <Link to="/cart">{cart}</Link>
          <Link to={"/menu"}>{menu}</Link>
          <Link to="/special">{special}</Link>
         
         

        </nav>
      </header>
  )
}

export default Header