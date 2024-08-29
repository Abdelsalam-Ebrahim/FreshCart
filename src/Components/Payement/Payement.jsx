import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import axios from 'axios';
import { useQuery } from 'react-query';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";


export default function Payement () {

    const nav = useNavigate();
    const { cartId, getUserCart } = useContext(CartContext);

    async function cashPayment() {

        const city = document.getElementById("city").value;
        const phone = document.getElementById("phone").value;
        const details = document.getElementById("details").value;

        const shippingAddress = {
            details,
            phone,
            city
        }

        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            shippingAddress,
            { headers: {token: localStorage.getItem("token")} }
        );
    }

    async function onlinePayement() {
        const city = document.getElementById("city").value;
        const phone = document.getElementById("phone").value;
        const details = document.getElementById("details").value;

        const shippingAddress = {
            details,
            phone,
            city
        }

        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
            shippingAddress,
            { headers: {token: localStorage.getItem("token")} },
            { params: { url: "http://localhost:3000" } }
        );
    }


    const { isLoading: isLoadingCash, refetch: cashRefetch } = useQuery("cashPayment", cashPayment, {
        refetchOnMount: false,
        enabled: false,
    });

    const { isLoading: isLoadingOnline, refetch: onlineRefetch } = useQuery("onlinePayement", onlinePayement, {
        refetchOnMount: false,
        enabled: false,
    });


    async function cashPaymentAndClearStateData() {
        const { data } = await cashRefetch();
        getUserCart();

        if(data) {
            toast.success("Payment Successfully", {position: 'top-right', duration: 5000});
            
            setTimeout( () => {
                nav("/products");
            }, 3000);
        } else {
            toast.error("Error Occuried..", {position: 'top-right', duration: 5000});
        }
    }

    async function onlinePayementA() {
        const { data } = await onlineRefetch();
        window.open(data.data.session.url, "_self");
    }
    
    
    if(isLoadingCash || isLoadingOnline) {
        return <LoadingScreen />
    }

    return <>

        <Helmet>
            <title>Payment</title>
        </Helmet>


        <div className="w-50 m-auto py-3">
            <form action="">
                <label htmlFor="city">City: </label>
                <input type="text" id="city" placeholder='City..' className='form-control mb-2' />

                <label htmlFor="phone">Phone: </label>
                <input type="text" id="phone" placeholder='Phone..' className='form-control mb-2' />

                <label htmlFor="details">Details: </label>
                <textarea type="text" id="details" placeholder='Details..' className='form-control mb-2' ></textarea>

                <button onClick={ cashPaymentAndClearStateData } className='btn btn-primary'>Confirm Cash Payment</button>
                <button onClick={ onlinePayementA } className='btn btn-primary ms-3'>Confirm Online Payment</button>
            </form>
        </div>
    
    </>
}