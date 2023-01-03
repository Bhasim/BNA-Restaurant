import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaUserAlt,FaShoppingCart} from 'react-icons/fa';
import { useAuth } from "../context/auth";
import "./LandingHeader.scss";

import logo from "../images/logo-bna.png"

function LandingHeader() {
  let navigate = useNavigate()
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [auth, setAuth] = useAuth();
 
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
     

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <div className="container-LandingHeader">
      {/* ============================= */}
      <div className="Logo-in-user">
     <div className="logo-in-user-container">
    
     <button onClick={()=>navigate("/login")} className="user"><FaUserAlt /></button>
      <button onClick={()=>navigate("/cart")} className="Shopping">
     
      <FaShoppingCart/>
        </button>


          {/* ========================================= user btns ========================= */}
        <>
      <ul>

        

        {!auth.user ? (
          <>
            
            
          </>
        ) : (
                  <span className="auth-btns">
                   <button onClick={logout} >
                Logout
                    </button>
                    <button onClick={() => navigate("/dashboard/user")} >{auth.user.name}</button>
                    
                    </span>
                    
        )}
      </ul>
    </>
          {/* ========================================= end user btns ========================= */}
        
             
     </div>
      </div>
      {/* ============================= */}
     <div className="logoHeader">
     <a>
      <img src={logo} alt="logo" />
      </a>
     </div>
      {/* ============================= */}
     
      <header className="Header">
        {/* ============================drop start============================================= */}
      <div className="loader">
  <div className="loader-bg">
  <span></span>
  </div>
  <div className="drops">
    <div className="drop1"></div>
    <div className="drop2"></div>  
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="liquid">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
    </filter>
  </defs>
</svg>
        </div>
        {/* ============================= the second drop ======================== */}
        <div className="loader-1">
  <div className="loader-1-bg">
  <span className="span-1"></span>
  </div>
  <div className="drops-1">
    <div className="drop-1"></div>
    <div className="drop-2"></div>  
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="liquid-1">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
    </filter>
  </defs>
</svg>
        </div>
        {/* ============================== the third drop =============== */}
        <div className="loader-2">
  <div className="loader-2-bg">
  <span className="span-2"></span>
  </div>
  <div className="drops-2">
    <div className="drop-21"></div>
    <div className="drop-22"></div>  
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="liquid-3">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
    </filter>
  </defs>
</svg>
        </div>
        {/* =========================== the fourth ============ */}
        <div className="loader-3">
  <div className="loader-3-bg">
  <span className="span-3"></span>
  </div>
  <div className="drops-3">
    <div className="drop-31"></div>
    <div className="drop-32"></div>  
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="liquid-4">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
    </filter>
  </defs>
</svg>
        </div>
        {/* ======================= the five=  */}
        <div className="loader-4">
  <div className="loader-4-bg">
  <span className="span-4"></span>
  </div>
  <div className="drops-4">
    <div className="drop-41"></div>
    <div className="drop-42"></div>  
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="liquid-5">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
    </filter>
  </defs>
</svg>
        </div>
{/* //====================================drop end============================================= */}
         
          <nav className="NavLandingHeader">
          <Link to="/menu">MENU</Link>
          <Link to="/reservation">BOOK</Link>
          <Link to="/contact">CONTACT</Link>
          </nav>
    
      </header>

     
      
     
    </div>

  );
}

export default LandingHeader