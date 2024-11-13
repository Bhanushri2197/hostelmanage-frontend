import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function HomePageFirst() {
  const [rooms, setRooms] = useState([]); 

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/rooms/rooms');
      setRooms(response.data);

      // Set the initial value of the room field to the first room title, if rooms are available
      if (response.data.length > 0) {
        formik.setFieldValue('rooms', response.data[0].roomTitle);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      checkIn: '',
      checkOut: '',
      rooms: ''  // Initially empty, will be updated when rooms are fetched
    },
    validate: (values) => {
      let error = {};
      if (values.checkIn === '') {
        error.checkIn = 'Please Enter your checkIn';
      }
      if (values.checkOut === '') {
        error.checkOut = 'Please Enter your checkOut';
      }
      if (values.email === '') {
        error.email = 'Please Enter your email';
      }
      if (values.rooms === '') {
        error.rooms = 'Please Enter your rooms';
      }
      return error;
    },
    onSubmit: async (values, actions) => {
      try {
        let res = await axios.post('http://localhost:4000/booking/booking-request', values);
        if (res.status === 200) {
          actions.resetForm();
          alert('Booking request has been sent successfully,We will conform your request through email,Thank you.');
          // navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <div>
      <div className="firstFold">
        <div className="innerContentBlock d-flex align-items-center justify-content-center w-100 h-100">
          <div className="innerContent d-flex flex-column align-items-center">
            <h1 className="headingMain text-center">Hosteller — amazing hostel for the free-spirited traveler</h1>
            <p className="description">
              In the heart of every great adventure is a place to call home. Our hostel offers comfort,
              connection, and the chance to discover both new destinations and new friends.
            </p>
            <div className="bookRoomBlock">
              <div className="bookingAvailable">
                <form className="elementor-form" onSubmit={formik.handleSubmit}>
                  <div className="bookingElement">
                    <div className="bookingGroup w-100">
                      <div className="formBlock w-100 position-relative">
                        <label className="inputlabel" htmlFor="email">Email</label>
                        <input className="inputForm" type="email" id="email" name="email" placeholder="Enter your email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email} />
                        <span className="errorMsg">
                          {formik.errors.email && formik.touched.email && formik.errors.email}
                        </span>
                      </div>
                    </div>
                    <div className="bookingGroup">
                      <label htmlFor="checkIn" className="inputlabel">Check-in</label>
                      <input type="date" name="checkIn" id="checkIn" className="inputForm"
                        onChange={formik.handleChange}
                        value={formik.values.checkIn} />
                    </div>
                    <div className="bookingGroup">
                      <label htmlFor="checkOut" className="inputlabel">Check-out</label>
                      <input type="date" name="checkOut" id="checkOut" className="inputForm"
                        onChange={formik.handleChange}
                        value={formik.values.checkOut} />
                    </div>
                    <div className="bookingGroup roomType">
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
                    <div className="bookingGroup bookBtnBlock m-0 d-flex align-items-center justify-content-center">
                      <button className="btn btnPrimary bookBtn w-100" type="submit" value="Submit" disabled={formik.isSubmitting}>
                        Book now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageFirst;
