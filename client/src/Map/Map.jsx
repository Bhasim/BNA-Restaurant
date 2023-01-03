import React,{useEffect} from "react";
import "./Map.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoArrowRedo} from 'react-icons/io5';


function Map() {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    // AOS.init();
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, [])
    return (
        
<div >

{/* ============================start code========================================================= */}

            <div className="map-page-container">
                {/* ===================== to macke backround transparent ==========================0 */}

                {/* <div className="layer"></div> */}

<div data-aos="fade-left"
 data-aos-anchor-placement="center-bottom" className="address-box">
    <div className="address-text">
        <h2>
            FIND US
        </h2>
        <h4>
            B.N.A Restaurant
        </h4>
        <p>
            21279 Wenzendorf <br />
            Hauptstr. 00<br />

            Hours <br />
            Mon. 8:30am - 4pm <br />
            Tues - Thurs, & Sun. 8:30am - 10pm <br />
            Fri. & Sat. 8:30am - 11pm <br />
            free delivery on phone orders <br />
            +49 176 5550 000 0000 <br />
            +49 444 5550 000 0000
                        </p>
                        <h3>Attention</h3>
                        <p className="takeAway">For the people,who dont have the abillity to pay for food please come to the restaurant to take away your meal from 19:00 to 22:00</p>


    </div>

</div>

{/* =========================map box=================================== */}
<div 
data-aos="fade-right"
data-aos-anchor-placement="center-bottom"
className="map-box ">
{/* ====================================== arow ========================== */}

<div className="arow">
<h3> Hear We Are <IoArrowRedo /></h3>
</div>

<div className="mapouter">
    <div className="map-link gmap_canvas">
        <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=21279%20&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>

        <a href="https://www.embedgooglemap.net"></a>
    </div>
</div>

</div>
</div>

</div>

      

    );
}

export default Map