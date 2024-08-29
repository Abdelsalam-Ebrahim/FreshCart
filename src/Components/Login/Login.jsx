import React from 'react';
import { useFormik } from "formik";
import * as yup  from "yup";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';
import { Helmet } from "react-helmet";


export default function Login() {
    
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate =  useNavigate();
    const { setToken } = useContext(AuthContext);

    const userData = {
        email: '',
        password: '',
    }

    // Hanlde validation using yup
    const mySchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required().min(6).max(12),
    });

    async function sendUserData(values) {
        // sending data to backend, post method take 2 parameters which is the url link (api) 
        // and the body of this object that you send to him
        // every action that you send it to backend you "must" send him data or send him something
        // but get method you just get data so you dont have to send somthing so it sometimes takes 1 parameter

        setIsLoading(true);

        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
        .then((res) => {
            setToken(res.data.token);
            localStorage.setItem( "token", res.data.token );

            setSuccess(true);
            setIsLoading(false);
            
            setTimeout(() => {
                setSuccess(false);
                navigate('/products');
            }, 2000);
        })
        .catch((err) => {
            setErrMsg(err.response.data.message);
            setIsLoading(false);

            setTimeout(() => {
                setErrMsg(null);
            }, 3000);
        });
    }

    function mySumbit(values) {
        // console.log(values);
        sendUserData(values);
    }

    const myFormik = useFormik({
        initialValues: userData,
        onSubmit: mySumbit,

        // this is my validation i do it by my self
        // validate: function(values) {
        //     let errors = {};

        //     if(!values.email.includes("@") || !values.email.includes("."))  errors.email = "Email must be contain @ and dot";
        //     if(values.password < 6 || values.password > 12) errors.password = "Password must be between 6 and 12 letters";

        //     return errors;
        // },
        
        // i used here yup library to help me with validation
        validationSchema: mySchema,
    });

    return <>

        <Helmet>
            <title>Login</title>
        </Helmet>

        <div className=" w-75 mx-auto p-5">

            {success ? <div className='alert alert-success text-center'>Welcome Back</div> : "" }
            {errMsg ? <div className='alert alert-danger text-center'>{ errMsg }</div> : "" }

            <h2 className='mb-3'>Login Now:</h2>

            <form onSubmit={ myFormik.handleSubmit }>
                
                {/* Email */}
                <div className="form-floating mb-3">
                    <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.email } type="email" className="form-control" id="email" placeholder="name@example.com"/>
                    <label  htmlFor="email">Email address</label>
                    { myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger mt-2">{myFormik.errors.email}</div> : "" }
                </div>

                {/* Password */}
                <div className="form-floating mb-3">
                    <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.password } type="password" className="form-control" id="password" placeholder="Password"/>
                    <label htmlFor="password">Password</label>
                    { myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger mt-2">{myFormik.errors.password}</div> : "" }
                </div>

                {/* Sign in */}
                <button type="submit" className="btn ms-auto d-block bg-main text-white" >
                    {isLoading ? 
                        <ColorRing
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        />
                    : "Sign in" }
                </button>

            </form>

        </div>

    </>
}