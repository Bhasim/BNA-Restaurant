import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
// import 'swiper/swiper.scss';
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import images from './image/CategoryImage';
import {Link} from "react-router-dom"
import "./Category.scss"

import SwiperCore, {
    EffectCoverflow,
    Pagination,
    Navigation
  } from "swiper/core";
  
  SwiperCore.use([EffectCoverflow, Pagination, Navigation]);
  
   function Category() {
    return (
      <div className="container">
       
        <Swiper
          navigation={true}
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={window.innerWidth < 768 ? 1 : "auto"}
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          pagination={{
            clickable: true
          }}
          className="mySwiper" >
          <SwiperSlide>
          <Link data-type="Meat" to="/food/meat"><img src={images.meat} /></Link>
          </SwiperSlide>
          <SwiperSlide>
          <Link data-type="Dessert" to="/food/dessert"><img src={images.dessert} /></Link>
          </SwiperSlide>
          <SwiperSlide>
          <Link data-type="Chicken" to="/food/chicken"><img src={images.chicken} /></Link>
          </SwiperSlide>
          <SwiperSlide>
          <Link data-type="Vegetarian" to="/food/vegetarian"><img src={images.vegetarian} /></Link>
          </SwiperSlide>
          <SwiperSlide>
          <Link data-type="Drinks" to="/food/drinks"><img src={images.drinks} /></Link>
          </SwiperSlide>
          <SwiperSlide>
          <Link data-type="Bakery" to="/food/bakery"><img src={images.bakery} /></Link>
          </SwiperSlide>
          <SwiperSlide>
          <Link data-type="Fish" to="/food/fish"><img src={images.fish} /></Link>
          </SwiperSlide>
          <SwiperSlide>
          <Link data-type="Pasta" to="/food/Pasta"><img src={images.Pasta} /></Link>
          </SwiperSlide>
        </Swiper>
      </div>
    );
  }
  export default Category