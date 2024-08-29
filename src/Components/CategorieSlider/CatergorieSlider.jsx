import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function CatergorieSlider () {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
    };

    function getCategorieImage() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }

    const { data, isLoading } = useQuery("showCategoriesImages", getCategorieImage, {
        refetchOnMount: false,
    });

    let myImages = data?.data.data;

    if(isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="slider-container">
            
            <h2 className=' mt-5 '>Shop Popular Categories</h2>
            
            <Slider {...settings}>
                {myImages.map(image => {
                    return  <div key={image._id}>
                            <img className='w-100' style={{ height: "160px" }} src={image.image} alt={image.name} />
                            <p className='mt-1'>{image.name}</p>
                        </div>
                })}
            </Slider>
        </div>
    );
}
