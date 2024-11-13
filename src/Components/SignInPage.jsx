import React from 'react';
import logo from "../assets/image/logo.png";
import roomImg from "../assets/image/hostelAnime.jpg";
import "../Styles/loginStyle.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            role: "",
            password: "",
            cpassword: ""
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) errors.name = "Please Enter your name";
            if (!values.email) errors.email = "Please Enter your email";
            if (!values.role) errors.role = "Please Select a role";
            if (!values.phone) errors.phone = "Please Enter your Phone Number";
            if (!values.password) errors.password = "Please Enter your password";
            if (values.cpassword !== values.password) errors.cpassword = "Passwords do not match";
            return errors;
        },
        onSubmit: async (values) => {
            try {
                let res = await axios.post('http://localhost:4000/authentication/sign-in', values);
                if (res.status === 201) {
                    alert("Sign-up successful! Redirecting to login.");
                    navigate("/login");
                }
            } catch (error) {
                console.error(error.response?.data?.message);
                alert(error.response?.data?.message || "Error signing up");
            }
        },
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
                                In the heart of every great adventure is a place to call home...
                            </p>
                        </div>
                        <div className="imgBlock">
                            <img className='logoImg w-100' src={roomImg} />
                        </div>
                    </div>
                    <div className="rightBlock w-100">
                        <h2 className="heading2">Sign-in</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='formBlock p-3 position-relative'>
                                <label htmlFor="name">Name </label>
                                <input
                                    className='inputForm'
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                <span className='errorMsg'>
                                    {formik.errors.name && formik.touched.name && formik.errors.name}
                                </span>
                            </div>
                            <div className='formBlock p-3 position-relative'>
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
                            <div className="d-sm-flex d-xs-block w-100">
                                <div className='formBlock w-100 p-3 position-relative'>
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        className='inputForm'
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone.no"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                    />
                                    <span className='errorMsg'>
                                        {formik.errors.phone && formik.touched.phone && formik.errors.phone}
                                    </span>
                                </div>
                                <div className='formBlock w-100 p-3 position-relative'>
                                    <label htmlFor="role">Registered as </label>
                                    <select
                                        className="form-select inputForm"
                                        id="role"
                                        name="role"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="" label="Select role" />
                                        <option value="resident">Resident</option>
                                        <option value="staff">Staff</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <span className='errorMsg'>
                                        {formik.errors.role && formik.touched.role && formik.errors.role}
                                    </span>
                                </div>
                            </div>
                            <div className='formBlock p-3 position-relative'>
                                <label htmlFor="password">Password </label>
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
                            <div className='formBlock p-3 position-relative'>
                                <label htmlFor="cpassword">Confirm Password </label>
                                <input
                                    className='inputForm'
                                    type="password"  // Changed from "cpassword"
                                    id="cpassword"
                                    name="cpassword"
                                    placeholder="Enter your password again"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.cpassword}
                                />
                                <span className='errorMsg'>
                                    {formik.errors.cpassword && formik.touched.cpassword && formik.errors.cpassword}
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

export default SignInPage;
