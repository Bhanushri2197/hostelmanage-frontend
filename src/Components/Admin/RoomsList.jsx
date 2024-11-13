import axios from 'axios';
import "../../Styles/roomListStyle.css"
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook

function RoomsList() {
  const [rooms, setRooms] = useState([]); 

  const getData = async () => {
    try {
      const response = await axios.get('https://hostelmanagement-backend-nbv7.onrender.com/rooms/rooms');
      setRooms(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (_id) => {
    let confirmDelete = confirm("Are you sure you want to delete this Room details?");
    if (confirmDelete) {
      axios
        .delete(`https://hostelmanagement-backend-nbv7.onrender.com/rooms/rooms/${_id}`)
        .then(() => {
          setRooms(rooms.filter((room) => room._id !== _id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };



  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="contentInner container">
        <h1 className="heading1 text-center">Room List</h1>
        <div className="addBtnBlock d-flex justify-content-end">
          <Link to={'add-room'} className="btnPrimary btnLg">Add Rooms</Link>
        </div>
        <div className="tableBlock mt-5">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Room Title</th>
                <th>Room Image</th>
                <th>Available rooms</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                rooms.map((room, index) => (
                  <tr key={index}>
                    <td>{room._id}</td>
                    <td>{room.roomTitle}</td>
                    <td className='imgTable' style={{width: "300px"}}>{room.roomImg}</td>
                    <td>{room.availability}</td>
                    <td>{room.price}</td>
                    <td>{room.description}</td>
                    <td valign="middle" className='text-center align-middle'>
                        <div className="d-flex align-items-center">
                        <Link to={`/admin/dashboard/edit-room/${room._id}`} className="btn editBtn mx-1">Edit</Link>

                         <button className="btn deleteBtn" onClick={() => handleDelete(room._id)}>Delete</button>
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

export default RoomsList;
