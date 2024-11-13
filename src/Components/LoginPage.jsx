import React, { useState } from 'react';
import logo from "../assets/image/logo.png";
import roomImg from "../assets/image/hostelAnime.jpg";
import "../Styles/loginStyle.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setUser }) {  
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) errors.email = "Please Enter your email";
            if (!values.password) errors.password = "Please Enter your password";
            return errors;
        },
        onSubmit: async (values) => {
            try {
                let res = await axios.post('https://hostelmanagement-backend-nbv7.onrender.com/authentication/log-in', values);
                if (res.status === 200) {
                    const userData = res.data.user;
                    setUser(userData);  // Set global user state
                    localStorage.setItem('user', JSON.stringify(userData));  // Store in localStorage
                    navigate("/");  // Redirect to home page
                }
            } catch (error) {
                console.error(error.response?.data?.message);
                alert(error.response?.data?.message || "Error logging in");
            }
        }
    });

    return (
        <div className='loginPageBlock'>
            <div className="loginContent w-100">
                <div className="loginInnerBlock d-flex">
                    <div className="leftBlock w-100 d-flex justify-content-between flex-column">
                        <div className='p-3'>
                            <div className="logoBlock">
                                <img className='logoImg' src={logo} />
                                <span>HostelStyle</span>
                            </div>
                            <p className='mt-3 description'>
                                A hostel isn't just a place to sleep—it's a gateway to new friendships, shared stories, and unforgettable adventures.
                            </p>
                        </div>
                        <div className="imgBlock">
                            <img className='logoImg w-100' src={roomImg} />
                        </div>
                    </div>
                    <div className="rightBlock w-100">
                        <h2 className="heading2">Log-in</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='formBlock position-relative'>
                                <label htmlFor="email">Email</label>
                                <input
                                    className='inputForm'
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                <span className='errorMsg'>
                                    {formik.errors.email && formik.touched.email && formik.errors.email}
                                </span>
                            </div>
                            <div className='formBlock position-relative'>
                                <label htmlFor="password">Password</label>
                                <input
                                    className='inputForm'
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                <span className='errorMsg'>
                                    {formik.errors.password && formik.touched.password && formik.errors.password}
                                </span>
                            </div>
                            <input
                                className='mt-5 btnPrimary float-right'
                                type="submit"
                                value="Submit"
                                disabled={formik.isSubmitting}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
