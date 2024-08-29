import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import SimpleSlider from '../SimpleSlider/SimpleSlider';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import CatergorieSlider from '../CategorieSlider/CatergorieSlider';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";

export default function Products() {

    const { addProductToCart } = useContext(CartContext);

    // add product to cart
    async function addProduct(id) {
        const res = await addProductToCart(id);

        if( res ) {
            toast.success("Added Successfully", { position: "top-right", duration: 5000})
        } else {
            toast.error("Error Occurried..", { position: "top-right", duration: 5000})
        }
    }

    // get the product
    async function getProducts() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    const { isLoading, data } = useQuery("getAllProducts", getProducts, {
        refetchOnMount: false,
    });

    if( isLoading ) {
        return <LoadingScreen />
    }

    return <>

        <Helmet>
            <title>Product</title>
        </Helmet>


        <div className="container">

            {/* Image  Slider */}
            <div className="row my-4">
                <div className="col-9">
                    <div className="images">
                        <SimpleSlider />
                    </div>
                </div>

                <div className="col-3">
                    <div className="d-flex  flex-column">
                        <img className='w-100' style={{ height: "200px" }}  src={require("../../Images/slider-image-1.jpeg")} alt="" />
                        <img className='w-100' style={{ height: "200px" }}  src={require("../../Images/slider-image-2.jpeg")} alt="" />
                    </div>
                </div>
            </div>

            {/* Categories Slider */}
            <CatergorieSlider />

            {/* Products */}
            <div className="row gy-3 my-3">
                {data?.data.data.map( (product) => {
                    return <div key={product.id} className="col-md-4 col-lg-3  col-xl-2">
                        <Link to={`/productDetails/${product.id}`} >
                            <div className=''>      {/* className="product"  */}
                                <img className='w-100' src={product.imageCover} alt="" />
                                <h2 className='h6 text-main mt-1'>{product.category.name}</h2>
                                <h3 className='h6 text-center' >
                                    { product.title.split(" ").slice(0, 2).join(" ").length > 17 ? 
                                        product.title.split(" ").slice(0, 1).join(" ") : product.title.split(" ").slice(0, 2).join(" ")}
                                </h3>
                                
                                <div className="d-flex justify-content-between">
                                    {product.priceAfterDiscount ? <p><span className='text-decoration-line-through opacity-50'>{product.price}</span> - {product.priceAfterDiscount}</p> : <p>{product.price}</p> }
                                    <p>
                                        <span> <i style={{color: "greenyellow"}} className='fa-solid fa-star me-1' ></i></span>
                                        {product.ratingsAverage}
                                    </p>
                                </div>

                            </div>

                        </Link>

                        <button onClick={ () => addProduct(product.id) } className="btn bg-main w-100 text-white py-1">+ ADD To Cart</button>
                    </div>
                    }
                )}
            </div>

        </div>
    </>
}