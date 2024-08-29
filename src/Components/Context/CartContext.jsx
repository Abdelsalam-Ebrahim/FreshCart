import axios from 'axios';
import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from './AuthContextProvider';

export const CartContext = createContext();

export default function CartContextProvider ( { children } ) {
    
    const { token } = useContext(AuthContext);

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allProducts, setAllProducrs] = useState(null);
    const [cartId, setCardID] = useState(null);
    
    async function getUserCart() {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: {token: localStorage.getItem("token")} })
        .then(res => {
            // console.log(res);
            
            // We set again because if we did refresh the data will lose so we have to set the states again
            setAllProducrs(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setNumOfCartItems(res.data.numOfCartItems);
            
            // set id to make payment
            setCardID(res.data.data._id);
            localStorage.setItem("cartOwner", res.data.data.cartOwner);
        }).catch(err => {
            console.log(err);
        })

        return res;
    }

    async function addProductToCart(id) {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
            { "productId": id },
            { headers: { token: localStorage.getItem("token") } },
        )
        .then(res => {
            getUserCart();

            return true;
        })
        .catch(err => {
            console.log("Error, ", err);
            return false;
        });

        return res;
    }

    async function updateCount(id, newCount) {
        const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            { "count": newCount },
            { headers: { token: localStorage.getItem("token") } }
        ).then(res => {
            setAllProducrs(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setNumOfCartItems(res.data.numOfCartItems);

            return true;
        }).catch(err => {
            console.log( "err:", err);
            return false;
        });

        return res;
    }

    async function deleteItem(id) {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            { headers: { token: localStorage.getItem("token") } }
        ).then(res => {
            setAllProducrs(res.data.data.products);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setNumOfCartItems(res.data.numOfCartItems);

            return true;
        }).catch(err => {
            console.log( "err:", err);
            return false;
        });

        return res;
    }

    async function clearAllProducts() {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,
            { headers: { token: localStorage.getItem("token") } }
        ).then(res => {
            setAllProducrs([]);
            setTotalCartPrice(0);
            setNumOfCartItems(0);

            return true;
        }).catch(err => {
            console.log( "err:", err);
            return false;
        });

        return res;
    }

    useEffect( () => {
        getUserCart();
    }, [token] );

    return <CartContext.Provider value={ { 
            addProductToCart,
            numOfCartItems,
            totalCartPrice,
            allProducts,
            getUserCart,
            updateCount,
            deleteItem,
            clearAllProducts,
            cartId,
        } } >
    
        { children }

    </CartContext.Provider>
}