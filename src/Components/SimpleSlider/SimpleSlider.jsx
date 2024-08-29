import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img className='w-100' style={{height: "400px"}} src={require("../../Images/slider-image-1.jpeg")} alt="" />
        </div>
        <div>
          <img className='w-100' style={{height: "400px"}} src={require("../../Images/slider-image-2.jpeg")} alt="" />
        </div>
        <div>
          <img className='w-100' style={{height: "400px"}} src={require("../../Images/slider-image-3.jpeg")} alt="" />
        </div>
        <div>
          <img className='w-100' style={{height: "400px"}} src={require("../../Images/slider-2.jpeg")} alt="" />
        </div>

      </Slider>
    </div>
  );
}