import React from 'react';
import  { AuthContext } from '../Context/AuthContextProvider';
import { useContext } from 'react';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Helmet } from "react-helmet";


export default function Profile () {
    
    const { userData } = useContext(AuthContext);

    if(!userData) {
        return <LoadingScreen />
    }
    
    return <>

        <Helmet>
            <title>Profile</title>
        </Helmet>

        <div className="container">
            <h1 className='text-center text-main p3 m-3'>Hello { userData.name } </h1>
        </div>

    </>
}