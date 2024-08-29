import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";


export default function ProductDetails () {

    const { addProductToCart } =  useContext(CartContext);
    const { id } = useParams();

    async function addMyProduct(id) {
        const res = await addProductToCart(id);

        if( res ) {
            toast.success("Added Successfully", { position: "top-right", duration: 5000})
        } else {
            toast.error("Error Occurried..", { position: "top-right", duration: 5000})
        }
    }


    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    const { isLoading, isError, data } = useQuery(`getProductDetails-${id}`, getProductDetails);
    const productDetails = data?.data.data;

    // console.log(productDetails.id);
    
    if( isError ) {
        return <Navigate to="/products" />
    }

    if( isLoading ) {
        return <LoadingScreen />
    }

    return <>

        <Helmet>
            <title>{productDetails.title}</title>
        </Helmet>


        <div className="container">
            <div className="row align-items-center my-5">
                <div className="col-4">
                    <img className='w-100' style={{ height: "400px" }} src={productDetails.imageCover} alt={productDetails.title} />
                </div>
                <div className="col-8">
                    <div className="details">
                        <h4>{productDetails.title}</h4>
                        <p className=' opacity-50 ' >{productDetails.description}</p>
                        <p style={{ margin: "10px 0 4px 0" }} >{productDetails.brand.name}</p>
                        <div className="d-flex justify-content-between">
                            <p>{productDetails.price} EGP</p>
                            <p> <i style={{color: "greenyellow"}} className='fa-solid fa-star me-1' ></i> {productDetails.ratingsAverage}</p>
                        </div>

                        <button  onClick={ () => {addMyProduct(productDetails.id)} } className="btn bg-main w-100 text-white">+ Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
}