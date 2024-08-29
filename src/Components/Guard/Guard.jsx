import React from 'react';
import { Navigate } from 'react-router-dom';

export default function GuardIn ( { children } ) {

    if(localStorage.getItem("token") == null) {
        return <Navigate to="/login" />
    }

    return <Navigate to="/products" />
}
