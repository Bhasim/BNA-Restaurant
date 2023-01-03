import React, { useContext } from 'react'
import Welcome from './Welcome/Welcome'
import LandingHeader from './LandingHeader/LandingHeader'
import Baner from './Baner/Baner'
import Map from './Map/Map'
import AboutUs from './AboutUs/AboutUs'
import { useEffect } from 'react'
import { context } from './Context'
import Chat from './Chat/Chat'
// import Category from './Category/Category'
import Celebration from "./Celebration/Celebration";
// import "./css/master.css";
// import "./css/normalize.css";





function Home() {
  const { setPopUp, popUp } = useContext(context)
  console.log("🚀 ~ file: Home.jsx ~ line 21 ~ Home ~ popUp", popUp)




  return (
    <div>

      {popUp && (
        < Welcome />
        )}
      <LandingHeader />
        <Celebration />
      <Baner />
      <Map />
      <AboutUs />
      {/* <Category /> */}
      <Chat />




    </div>
  )
}

export default Home