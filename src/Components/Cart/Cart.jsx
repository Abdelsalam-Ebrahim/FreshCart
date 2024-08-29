import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


export default function Cart () {

    const { totalCartPrice, allProducts, updateCount, deleteItem, clearAllProducts } = useContext(CartContext);

    async function updateMyProductCount(id, newCount) {
        const res = await updateCount(id, newCount);

        if(res) {
            toast.success("Succussfully Updated", { position: "top-center", duration: 3000 });
        } else {
            toast.error("Error Occurried..", { position: "top-center", duration: 3000 });
        }
    }

    async function deleteMyItem(id) {
        const res = await deleteItem(id);

        if(res) {
            toast.success("Succussfully Deleted", { position: "top-center", duration: 3000 });
        } else {
            toast.error("Error Occurried..", { position: "top-center", duration: 3000 });
        }
    }

    async function clearAllMyProduct() {
        const res = await clearAllProducts();

        if(res) {
            toast.success("Succussfully Clear All Products", { position: "top-center", duration: 3000 });
        } else {
            toast.error("Error Occurried..", { position: "top-center", duration: 3000 });
        }
    }

    if( !allProducts ) {
        return <LoadingScreen />
    }

    // console.log(allProducts);

    return <>

        <Helmet>
            <title>Cart</title>
        </Helmet>

        {allProducts.length > 0 ? <div className="container p-3" style={ { backgroundColor: "#eee" } }>

                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2>Shop Cart: </h2>
                        <h5 className='text-main'>Total Cart Price: { totalCartPrice }</h5>
                    </div>

                    <Link to="/Payment">
                        <button className='btn btn-primary'>Confirm Payment</button>
                    </Link>
                </div>

                <button onClick={ () => clearAllMyProduct() } className='btn btn-outline-danger'>Clear</button>

                {allProducts.map(product => {
                    return <div  key={product._id} className="row align-items-center border-1 border-black border-bottom py-2 border-opacity-25" >
                        <div className='col-1'>
                            <figure> <img className='w-100' src={product.product.imageCover} alt={product.product.title} /></figure>
                        </div>

                        <div className="col-9">
                            <article>
                                <p className='m-0'>{product.product.title}</p>
                                <p className='text-main my-2'>Price: {product.price}</p>
                                <button onClick={ () => deleteMyItem(product.product.id) } className='btn btn-outline-danger'> <i className="fa-regular fa-trash-can"></i> Remove</button>
                            </article>
                        </div>

                        <div className="col-2">
                            <div className='d-flex justify-content-between align-items-center'>
                                <button onClick={ () => updateMyProductCount(product.product.id, product.count + 1) } className="btn btn-outline-success">+</button>
                                <p className='m-0'>{product.count}</p>
                                <button onClick={ () => updateMyProductCount(product.product.id, product.count - 1) } className="btn btn-outline-success" disabled={product.count === 1} >-</button>
                            </div>
                        </div>
                    </div>
                })}
            </div> : <h1 className='text-center m-3 p-3 text-main'> Your Cart is Empty </h1> }

    </>
}
