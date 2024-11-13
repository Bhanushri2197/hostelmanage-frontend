import React, { useEffect, useState } from 'react';
import wifi from "../assets/image/wifi.png";
import tv from "../assets/image/tv.png";
import bag from "../assets/image/baggage.jpg";
import parking from "../assets/image/parking.png";
import "../Styles/roomListStyle.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
import { Modal, Button } from 'react-bootstrap'; // Assuming you're using React Bootstrap for Modal
import { useFormik } from 'formik';

function RoomsListPage() {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null); // Store the room selected for booking
  const navigate = useNavigate();

  // Get logged-in user's email from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClose = () => setShow(false);
  const handleShow = (room) => {
    setSelectedRoom(room); // Set the selected room when modal is opened
    setShow(true);
  };

  const getData = async () => {
    try {
      const response = await axios.get('https://hostelmanagement-backend-nbv7.onrender.com/rooms/rooms');
      setRooms(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: user ? user.email : '', // Use the logged-in user's email if available
      checkIn: '',
      checkOut: '',
      rooms: '' // Will be updated when rooms are fetched
    },
    validate: (values) => {
      let error = {};
      if (!values.checkIn) {
        error.checkIn = 'Please enter your check-in date';
      }
      if (!values.checkOut) {
        error.checkOut = 'Please enter your check-out date';
      }
      if (!values.email) {
        error.email = 'Please enter your email';
      }
      return error;
    },
    onSubmit: async (values, actions) => {
      if (!user || !user.email) {
        // Redirect to login page if user is not logged in
        navigate('/login');
        return;
      }

      // Add room title to the form values before submitting
      values.rooms = selectedRoom ? selectedRoom.roomTitle : '';

      try {
        const res = await axios.post('https://hostelmanagement-backend-nbv7.onrender.com/booking/booking-request', values);
        if (res.status === 200) {
          actions.resetForm();
          alert('Booking request sent successfully. We will confirm your request through email. Thank you.');
          handleClose();
        }
      } catch (error) {
        console.error(error);
        alert('Failed to send booking request.');
      }
    }
  });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='roomListBlock'>
      <div className='container'>
        <h1 className='heading1 text-center'>Our Rooms</h1>
        <div className='roomsListedBlock'>
          {rooms.map((room, index) => (
            <div key={index} className="roomUnit d-flex flex-column flex-md-row align-items-md-stretch">
              <div className="unitLeft">
                <img className='roomImg w-100' src={room.roomImg} alt="Room" />
              </div>
              <div className="unitRight position-relative">
                <h5 className="heading5 roomTitle">{room.roomTitle}</h5>
                <div className="availabilityBlock d-flex align-items-center">
                  <span className="title">Available Rooms:</span>
                  <span className="value">{room.availability} Rooms</span>
                </div>
                <div className="group-sm facility d-flex group-middle justify-content-start">
                  <div className='falicityItem d-flex align-items-center'>
                    <img src={wifi} alt="Wifi" className="facilityImg" />
                    <span className='facilityName'>Wifi</span>
                  </div>
                  <div className='falicityItem d-flex align-items-center'>
                    <img src={tv} alt="Tv" className="facilityImg" />
                    <span className='facilityName'>TV</span>
                  </div>
                  <div className='falicityItem d-flex align-items-center'>
                    <img src={bag} alt="Storage" className="facilityImg" />
                    <span className='facilityName'>Free storage of luggage</span>
                  </div>
                  <div className='falicityItem d-flex align-items-center'>
                    <img src={parking} alt="Parking" className="facilityImg" />
                    <span className='facilityName'>Parking space</span>
                  </div>
                </div>
                <p className="descrip">{room.description}</p>
                <button className="btnPrimary btnLg" onClick={() => handleShow(room)}>
                  Book Now
                </button>
                <div className="roomPrice">
                  <span className="priceValue">${room.price}</span>
                  <span className='d-block'>/night</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Booking */}
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Book Room</Modal.Title>
          </Modal.Header>
          <form className='notificationForm' onSubmit={formik.handleSubmit}>
            <Modal.Body>
              <div className='formBlock p-2 position-relative'>
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
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button className='btn btnPrimary' type="submit" value="Submit" disabled={formik.isSubmitting}>
                Book Room
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default RoomsListPage;
