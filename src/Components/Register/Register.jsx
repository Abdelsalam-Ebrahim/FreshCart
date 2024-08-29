import React from 'react';
import { useFormik } from "formik";
import * as yup  from "yup";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";


export default function Register() {
    
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate =  useNavigate();

    const userData = {
        name: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
    }

    // Hanlde validation using yup
    const mySchema = yup.object({
        name: yup.string().required().min(4).max(18),
        phone: yup.string().required().matches(/^01[0125][0-9]{8}$/, "This is not an Egyption number"),
        email: yup.string().required().email(),
        password: yup.string().required().min(6).max(12),
        rePassword: yup.string().required().oneOf([yup.ref("password")], "Doesn't Match"),
    });

    async function sendUserData(values) {
        // sending data to backend, post method take 2 parameters which is the url link (api) 
        // and the body of this object that you send to him
        // every action that you send it to backend you "must" send him data or send him something
        // but get method you just get data so you dont have to send somthing so it sometimes takes 1 parameter

        setIsLoading(true);

        axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
        .then((res) => {
            setSuccess(true);
            setIsLoading(false);
            
            setTimeout(() => {
                setSuccess(false);
                navigate('/login');
            }, 3000);
        })
        .catch((err) => {
            setErrMsg(err.response.data.message);
            setIsLoading(false);

            setTimeout(() => {
                setErrMsg(null);
                navigate('/login');
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
            
        //     let nameRegex = /^[A-Z][a-z]{3,7}$/;
        //     let phoneRegex = /^01[0125][0-9]{8}$/;

        //     if(!nameRegex.test(values.name))    errors.name = "Name length must be between 4-8 and begin with Capital Letter";
        //     if(!values.email.includes("@") || !values.email.includes("."))  errors.email = "Email must be contain @ and dot";
        //     if(!phoneRegex.test(values.phone)) errors.phone = "Phone number must be Egyption";
        //     if(values.password < 6 || values.password > 12) errors.password = "Password must be between 6 and 12 letters";
        //     if(values.rePassword !== values.password)   errors.rePassword = "Passwords Doesn't Match";

        //     return errors;
        // },
        
        // i used here yup library to help me with validation
        validationSchema: mySchema,
    });

    return <>

        <Helmet>
            <title>Register</title>
        </Helmet>

        <div className=" w-75 mx-auto p-5">

            {success ? <div className='alert alert-success text-center'>Congrats You Account Signed Up</div> : "" }
            {errMsg ? <div className='alert alert-danger text-center'>{ errMsg }</div> : "" }

            <h2 className='mb-3'>Register Now:</h2>

            <form onSubmit={ myFormik.handleSubmit }>

                {/* Name */}
                <div className="form-floating mb-3 position-relative">
                    <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange }  value={ myFormik.values.name } type="text" className="form-control" id="name" placeholder="Name"/>
                    <label htmlFor="name">Name</label>
                    { myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger mt-2">{myFormik.errors.name}</div> : "" }
                </div>
                
                {/* Email */}
                <div className="form-floating mb-3">
                    <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.email } type="email" className="form-control" id="email" placeholder="name@example.com"/>
                    <label  htmlFor="email">Email address</label>
                    { myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger mt-2">{myFormik.errors.email}</div> : "" }
                </div>

                {/* Phone */}
                <div className="form-floating mb-3">
                    <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.phone } type="text" className="form-control" id="phone" placeholder="Phone"/>
                    <label htmlFor="phone">Phone</label>
                    { myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger mt-2">{myFormik.errors.phone}</div> : "" }
                </div>

                {/* Password */}
                <div className="form-floating mb-3">
                    <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.password } type="password" className="form-control" id="password" placeholder="Password"/>
                    <label htmlFor="password">Password</label>
                    { myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger mt-2">{myFormik.errors.password}</div> : "" }
                </div>

                {/* rePassword */}
                <div className="form-floating mb-3">
                    <input onBlur={ myFormik.handleBlur } onChange={ myFormik.handleChange } value={ myFormik.values.rePassword } type="password" className="form-control" id="rePassword" placeholder="Repassword"/>
                    <label htmlFor="rePassword">rePassword</label>
                    { myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger mt-2">{myFormik.errors.rePassword}</div> : "" }
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
                    : "Register" }
                </button>

            </form>

        </div>

    </>
}