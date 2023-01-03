import React from 'react';
//import React, {useState} from 'react';

// styling
import './welcome.scss';
// images
import bone from '../images/logo-bna.png'
import { useContext } from 'react';
import { context } from '../Context';
import { useNavigate } from 'react-router-dom';



const Welcome = props => {
    // function that takes boolean as param to conditionally display popup
    const { setPopUp } = useContext(context)
    let navigate = useNavigate()

    return (
        <div className="container-popup">
            <div className="PopUp">
                {/* x close window */}
                <button className="popup-x" onClick={() => setPopUp(false)} >X</button>
                <div className="pu-content-container">
                    <img className="pu-img" src={bone} alt="bone" />
                    <h1 className="welcom-text">
                        Safely Distanced <br />
                        Dining, Takeout, & <br />
                        Delivery <br />
                        Hours <br />
                        Mon. 8:30am - 4pm <br />
                        Tues - Thurs, & Sun. 8:30am - 10pm <br />
                        Fri. & Sat. 8:30am - 11pm <br />
                        free delivery on phone orders</h1>
                </div>
                {/* button controls */}
                    <a className='popUp-special' onClick={()=>navigate("/special")} >We have a special page for freelancers chefs</a>
                <div className="pu-button-container">
                    <button onClick={() => setPopUp(false)}> COVID 19 Measures → </button>
                    <button onClick={() => setPopUp(false)}> Close </button>
                </div>
            </div>
        </div>

    );
}

export default Welcome;
