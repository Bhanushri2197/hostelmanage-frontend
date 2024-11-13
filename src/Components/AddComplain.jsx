import React from 'react';
import "../Styles/addComplainStyle.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddComplain() {
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            complainTitle: "",
            email: "",
            roomNo: "",
            description: "",
        },
        validate: (values) => {
            let error = {};
            if (values.complainTitle === "") {
                error.complainTitle = "Please Enter your complain title";
            }
            if (values.email === "") {
                error.email = "Please Enter your email";
            }
            if (values.roomNo === "") {
                error.roomNo = "Please Enter your room.No";
            }
            if (values.description === "") {
                error.description = "Please Enter Description";
            }
            return error;
        },
        onSubmit: async (values, actions) => {
            try {
                console.log(values); // Check if status is included in the form values
                let res = await axios.post('http://localhost:4000/complains/add-complain', values); // Post to backend
                await new Promise((response) => setTimeout(response, 1000));
                actions.resetForm();
                if (res.status === 200) {
                    console.log("Complain Created: ", res.data);
                    navigate("/complains");
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div className='complainAddPageBlock'>
            <div className="complainAddContent w-100">
                <div className="complainAddInnerBlock d-flex">
                    <div className="rightBlock w-100">
                        <h2 className="heading2 w-100 text-center">Your Voice Matters: Report an Issue</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='formBlock p-2 position-relative'>
                                <label htmlFor="complainTitle">Title </label>
                                <input className='inputForm' type="text" id="complainTitle" name="complainTitle" placeholder="Enter Complain Title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.complainTitle} />
                                <span className='errorMsg'>{formik.errors.complainTitle && formik.touched.complainTitle && formik.errors.complainTitle}</span>
                            </div>
                            <div className='d-sm-flex w-100 d-xs-block'>
                                <div className='formBlock w-100 p-2 position-relative'>
                                    <label htmlFor="email">Email</label>
                                    <input className='inputForm' type="email" id="email" name="email" placeholder="Enter your email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email} />
                                    <span className='errorMsg'>{formik.errors.email && formik.touched.email && formik.errors.email}</span>
                                </div>
                                <div className='formBlock w-100 p-2 position-relative'>
                                    <label htmlFor="roomNo">Room Number </label>
                                    <input className='inputForm' type="text" id="roomNo" name="roomNo" placeholder="Enter your room.No"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.roomNo} />
                                    <span className='errorMsg'>{formik.errors.roomNo && formik.touched.roomNo && formik.errors.roomNo}</span>
                                </div>
                            </div>
                            <div className='formBlock p-2 position-relative'>
                                <label htmlFor="description">Tell About Your Complaint </label>
                                <textarea className='inputForm textArea' type="text" id="description" name="description" placeholder="Enter the Complaint Detailed"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}></textarea>
                                <span className='errorMsg'>{formik.errors.description && formik.touched.description && formik.errors.description}</span>
                            </div>
                            <input className='mt-5 btnPrimary float-right' type="submit" value="Submit" disabled={formik.isSubmitting} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddComplain;
