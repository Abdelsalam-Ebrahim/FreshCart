import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from 'react-helmet';

export default function AllOrders () {
    
    async function getAllOrders() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem("cartOwner")}`);
    }

    const { data, isLoading } = useQuery("getAllOrders", getAllOrders, {
        refetchOnMount: false,
    });


    if(isLoading) {
        return <LoadingScreen />
    }
    
    const allOrders = data.data;
    
    // console.log(allOrders);
    
    return <>

        <Helmet>
            <title>All Orders</title>
        </Helmet>
    
        <div className="container">
            <div className="row g-3">
                { allOrders.map(order => { return <div key={order.id} className="col-md-4" >
                        <div className="bg-info p-2 h-100">
                            <h5>Payment Method: { order.paymentMethodType }</h5>
                            <h5>Order Price: { order.totalOrderPrice } </h5>

                            { order.shippingAddress ? <p> This Order is delivering to { order.shippingAddress.city } on phoneNumber: { order.shippingAddress.phone }
                                with Details { order.shippingAddress.details } 
                            </p> : "" }
                            
                        </div>
                    </div>
                }) }
            </div>
        </div>
    
    </>
}