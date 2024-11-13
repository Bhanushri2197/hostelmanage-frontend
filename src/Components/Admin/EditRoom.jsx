import React, { useState, useEffect } from 'react';
import "../../Styles/addComplainStyle.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 

function EditRoom() {
    let { _id } = useParams(); // Get room ID from route params
    let navigate = useNavigate();
    let [initialValue, setInitialValues] = useState({
        roomTitle: "",
        availability: "",
        price: "",
        description: ""
    });

    // Fetch room details and set initial values
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/rooms/rooms/${_id}`);
                const room = response.data;
                console.log(room)
                setInitialValues({
                    roomTitle: room.roomTitle,
                    availability: room.availability,
                    price: room.price,
                    description: room.description
                });
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };
        fetchRoomData();
    }, [_id]);

    const formik = useFormik({
        enableReinitialize: true, 
        initialValues: initialValue, // Dynamically sets the form values
        validate: (values) => {
            let errors = {};
            if (!values.roomTitle) errors.roomTitle = "Please Enter Room Title";
            if (!values.availability) errors.availability = "Please Enter Availability";
            if (!values.price) errors.price = "Please Enter Price";
            if (!values.description) errors.description = "Please Enter Description";
            return errors;
        },
        onSubmit: async (values) => {
            try {
                await axios.put(`http://localhost:4000/rooms/rooms/${_id}`, values);
                navigate("/rooms"); // Navigate to rooms list after update
            } catch (error) {
                console.error("Error updating room:", error);
            }
        }
    });

    return (
        <div className='complainAddPageBlock'>
            <div className="complainAddContent w-100">
                <div className="complainAddInnerBlock d-flex">
                    <div className="rightBlock w-100">
                        <h2 className="heading2 w-100 text-center">Edit Room Details</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='formBlock p-2 position-relative'>
                                <label htmlFor="roomTitle">Room Title</label>
                                <input
                                    className='inputForm'
                                    type="text"
                                    id="roomTitle"
                                    name="roomTitle"
                                    placeholder="Enter Room Title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.roomTitle}
                                />
                                <span className='errorMsg'>
                                    {formik.errors.roomTitle && formik.touched.roomTitle && formik.errors.roomTitle}
                                </span>
                            </div>
                            <div className='d-sm-flex w-100 d-xs-block'>
                                <div className='formBlock w-100 p-2 position-relative'>
                                    <label htmlFor="availability">Room Available</label>
                                    <input
                                        className='inputForm'
                                        type="number"
                                        id="availability"
                                        name="availability"
                                        placeholder="Enter Availability"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.availability}
                                    />
                                    <span className='errorMsg'>
                                        {formik.errors.availability && formik.touched.availability && formik.errors.availability}
                                    </span>
                                </div>
                                <div className='formBlock w-100 p-2 position-relative'>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        className='inputForm'
                                        type="number"
                                        id="price"
                                        name="price"
                                        placeholder="Enter Price"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.price}
                                    />
                                    <span className='errorMsg'>
                                        {formik.errors.price && formik.touched.price && formik.errors.price}
                                    </span>
                                </div>
                            </div>
                            <div className='formBlock p-2 position-relative'>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className='inputForm textArea'
                                    id="description"
                                    name="description"
                                    placeholder="Enter Description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                <span className='errorMsg'>
                                    {formik.errors.description && formik.touched.description && formik.errors.description}
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

export default EditRoom;
