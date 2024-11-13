import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook

function BookingRequest() {
  const [bookings, setbooking] = useState([]); 
  const navigate = useNavigate(); // Initialize navigate

  const getData = async () => {
    try {
      const response = await axios.get('https://hostelmanagement-backend-nbv7.onrender.com/booking/booking-request');
      setbooking(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (_id) => {
    let confirmDelete = confirm("Are you sure you want to delete this Request?");
    if (confirmDelete) {
      axios
        .delete(`https://hostelmanagement-backend-nbv7.onrender.com/booking/booking-request/${_id}`)
        .then(() => {
          setbooking(bookings.filter((req) => req._id !== _id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const acceptRequest = async (_id) => {
      try {
         const updatedStatus = {status : "Accepted"}
          await axios.put(`https://hostelmanagement-backend-nbv7.onrender.com/booking/booking-request/${_id}`,  updatedStatus);
          getData()
      } catch (error) {
          console.error("Error updating room:", error);
      }

  }



  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="contentInner container">
        <h1 className="heading1 text-center">Room List</h1>
      
        <div className="tableBlock mt-5">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Room</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking._id}</td>
                    <td>{booking.email}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkOut}</td>
                    <td>{booking.rooms}</td>
                    <td>{booking.status}</td>
                    <td valign="middle" className='text-center align-middle'>
                        <div className="d-flex align-items-center">
                        <button className="btn editBtn mx-1"  onClick={() => acceptRequest(booking._id)}>Accept</button>

                         <button className="btn deleteBtn" onClick={() => handleDelete(booking._id)}>Delete</button>
                        </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default BookingRequest
