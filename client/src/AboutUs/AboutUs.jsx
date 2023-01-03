import React, { useEffect } from 'react';
import "./AboutUs.scss";
import Pic1 from "./images/img2.jpg";
import Pic2 from "./images/Pics2.jpeg";
import Pic3 from "./images/Pics3.jpeg";
import video from "./images/BNA-Team-video-2.mp4";
import AOS from 'aos';
import 'aos/dist/aos.css';

function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, [])
  return (

    <div data-aos="fade-up"
      data-aos-delay="900"
      data-aos-duration="3000">


      <section id="about">
        <h1 className="headings-1">ABOUT US</h1>
        <h3 className="headings-2">B.N.A TEAM</h3>
        <h3>We  Serve You Better</h3>
        <div className="pic-intro">
          <div className='text-pics-container'
            data-aos="fade-up"
            data-aos-delay="900"
            data-aos-duration="3000">
            <div className='pics123'>
              <a rel='noreferrer' target={"_blank"} href="https://www-baha.vercel.app/"><img src={Pic1} alt="Baha Alden Hasim" />Baha Alden Hasim</a>
              <a rel='noreferrer' target={"_blank"} href="http://www.anwar-dev.com/"> <img src={Pic2} alt="Anwar Takriti" />Anwar Takriti</a>
              <a rel='noreferrer' target={"_blank"} href="https://github.com/nievein-ahmed"><img src={Pic3} alt="Nievein Ahmed" />Nievein Ahmed</a>
            </div>
            <div className="intro-text">
              <p>Junior Full-Stack Web Developers</p>
              <p>
                we are BNA Team, Web developers focused on Frontend and Backend, every day in code challenge, and we are seeking for being senior developers soon.
              </p>
            </div>
          </div>
          <div className="video"
            data-aos="fade-right"
            data-aos-delay="900"
            data-aos-duration="3000">
            <video controls width="100%">
              <source src={video} type="video/mp4" />
              Sorry, your browser doesn't support videos.
            </video>
          </div>
        </div>
      </section>


    </div>

  );
};

export default AboutUs;