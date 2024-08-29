import React from 'react';
import { FallingLines } from "react-loader-spinner";

export default function Loading () {
    return <>
    
        <div className="vh-100 d-flex justify-content-center align-items-center bg-primary bg-opacity-50"> 
            <FallingLines
                color="#fff"
                width="100" 
                visible={true}
                ariaLabel="falling-circles-loading"
                rapperClass=""
            />
        </div>

    </>
}