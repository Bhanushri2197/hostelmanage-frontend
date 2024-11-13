import axios from 'axios';
import { useFormik } from 'formik';
import "../Styles/addComplainStyle.css";
import React, { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

function PaymentPage() {
    const [rooms, setRooms] = useState([]);
    const [payableAmt, setPayableAmt] = useState(0);

    const getData = async () => {
        try {
            const response = await axios.get('https://hostelmanagement-backend-nbv7.onrender.com/rooms/rooms');
            setRooms(response.data);

            if (response.data.length > 0) {
                formik.setFieldValue('rooms', response.data[0].roomTitle);
                calculatePayableAmt(response.data[0].price);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const [bills, setBills] = useState({
        name: "Bill Payment",
        price: 0,
        billBy: "Hostel",
    });

    const makePayment = async (token) => {
        const body = {
            token: {
                email: token.email,
                id: token.id
            },
            email: formik.values.email,
            price: bills.price // Make sure this is in paise/cents
        };

        try {
            const res = await axios.post("https://hostelmanagement-backend-nbv7.onrender.com/payment/bill", body, {
                headers: { "Content-Type": "application/json" }
            });
            if (res.status === 200) {
                console.log("Payment response:", res.data);
                alert('Payment successful! Confirmation has been sent to your email.');
            }
        } catch (err) {
            console.error("Payment Error:", err.response ? err.response.data : err.message);
            alert('Payment failed. Please try again.');
        }
    };

    const calculatePayableAmt = (pricePerNight) => {
        const checkIn = new Date(formik.values.checkIn);
        const checkOut = new Date(formik.values.checkOut);

        if (checkIn && checkOut && checkOut > checkIn) {
            const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            const total = days * pricePerNight;
            setPayableAmt(total);
            setBills((prev) => ({ ...prev, price: total * 100 })); // Price in smallest currency unit
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            checkIn: '',
            checkOut: '',
            rooms: ''
        },
        validate: (values) => {
            let error = {};
            if (values.checkIn === '') {
                error.checkIn = 'Please enter your check-in date';
            }
            if (values.checkOut === '') {
                error.checkOut = 'Please enter your check-out date';
            }
            if (values.email === '') {
                error.email = 'Please enter your email';
            }
            if (values.rooms === '') {
                error.rooms = 'Please select a room type';
            }
            return error;
        },
        onSubmit: async (values, actions) => {
            try {
                let res = await axios.post('https://hostelmanagement-backend-nbv7.onrender.com/payment/bill', values);
                if (res.status === 200) {
                    actions.resetForm();
                    alert('Booking request sent successfully. We will confirm your request via email. Thank you.');
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    useEffect(() => {
        const selectedRoom = rooms.find((room) => room.roomTitle === formik.values.rooms);
        if (selectedRoom) {
            calculatePayableAmt(selectedRoom.price);
        }
    }, [formik.values.checkIn, formik.values.checkOut, formik.values.rooms, rooms]);

    return (
        <div className='complainAddPageBlock'>
            <div className="complainAddContent w-100">
                <div className="complainAddInnerBlock d-flex">
                    <div className="rightBlock w-100">
                        <h2 className="heading2 w-100 text-center">Your Voice Matters: Report an Issue</h2>
            <form onSubmit={formik.handleSubmit}>
                    <div className='formBlock p-2 position-relative'>
                        <label htmlFor="email">Email</label>
                        <input className="inputForm" type="email" id="email" name="email" placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email} />
                        <span className="errorMsg">
                            {formik.errors.email && formik.touched.email && formik.errors.email}
                        </span>
                    </div>
                    <div className='d-sm-flex w-100 d-xs-block'>
                        <div className='formBlock w-100 p-2 position-relative'>
                            <label htmlFor="checkIn" className="inputlabel">Check-in</label>
                            <input type="date" name="checkIn" id="checkIn" className="inputForm"
                                onChange={formik.handleChange}
                                value={formik.values.checkIn} />
                        </div>
                        <div className='formBlock w-100 p-2 position-relative'>
                            <label htmlFor="checkOut" className="inputlabel">Check-out</label>
                            <input type="date" name="checkOut" id="checkOut" className="inputForm"
                                onChange={formik.handleChange}
                                value={formik.values.checkOut} />
                        </div>
                    </div>
                    <div className='formBlock p-2 position-relative'>
                        <label htmlFor="rooms" className="inputlabel">Type of room</label>
                        <div className="elementor-field">
                            <div className="select-caret-down-wrapper">
                                <i aria-hidden="true" className="eicon-caret-down"></i>
                            </div>
                            <select name="rooms" id="rooms" className="inputForm"
                                onChange={formik.handleChange}
                                value={formik.values.rooms}>
                                {rooms.map((room, index) => (
                                    <option key={index} value={room.roomTitle}>{room.roomTitle}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="p-2">
                        <div>Payable Amount: ₹{payableAmt}</div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <input className='mt-5 btnPrimary float-right' type="submit" value="Submit" disabled={formik.isSubmitting} />
                    </div>
                
            </form>
            <StripeCheckout
                name="Bill Payment"
                amount={bills.price}
                currency='INR'
                token={makePayment}
                stripeKey='pk_test_51QDutmAGKdciuen5lDSCpIyNXrD7ftBdU7hUmZ9HnSc8pzQfWrVYEPkFxLoovPf66Ov5EkUTIA0thDa7UAbbkme200xVkcC2SL'
            >
                <button className="btn btnPrimary">Pay Now</button>
            </StripeCheckout>
            </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;

