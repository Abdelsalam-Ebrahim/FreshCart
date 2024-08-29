import React from 'react';
import { Navigate } from 'react-router-dom';

export default function GuardOut ( { children } ) {

    if(localStorage.getItem("token")) {
        return <Navigate to="/products" />
    }

    return <>
    
        { children }
    
    </>
}
