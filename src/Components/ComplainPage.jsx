import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/complainStyle.css";
import { Link } from 'react-router-dom';

function ComplainPage() {
  const [complains, setComplains] = useState([]);
  
  const user = JSON.parse(localStorage.getItem('user'));

  const getComplains = async () => {
    try {
      const complainsRes = await axios.get("https://hostelmanagement-backend-nbv7.onrender.com/complains/complain");
      if (user && user.email) {
        // Filter complaints to only show those created by the logged-in user
        const userComplains = complainsRes.data.filter(complain => complain.email === user.email);
        setComplains(userComplains);
      } else {
        // If no user is logged in, or no filtering is required
        setComplains(complainsRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (_id) => {
    let confirmDelete = confirm("Are you sure you want to delete this complain?");
    if (confirmDelete) {
      axios
        .delete(`https://hostelmanagement-backend-nbv7.onrender.com/complains/complain/${_id}`)
        .then(() => {
          setComplains(complains.filter((complain) => complain._id !== _id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getComplains();
  }, []);

  return (
    <div className='complainPage'>
      <div className="contentInner container">
        <h1 className="heading1 text-center">Complaints</h1>
        <div className="addComplain mt-5 p-1 d-flex justify-content-end">
          <Link to={'/add-complain'} className="btnPrimary addComplainBtn">Create Complain</Link>
        </div>
        <div className="complainsList d-flex flex-wrap justify-content-center">
          {complains.map((complain, index) => (
            <div key={index} className="complainItems">
              <span className='status '>{complain.status}</span>
              <div className="innerContent">
                <div className="d-flex h-100 flex-column justify-content-between">
                  <div className="d-flex flex-column">
                    <h5 className="heading5">{complain.complainTitle} in room - {complain.roomNo}</h5>
                    <div className="createdDate">Created at {complain.createdAt}</div>
                    <div className="description">{complain.description}</div>
                  </div>
                  <div className="actionBlock p-3 d-flex justify-content-end">
                    <button className="btn deleteBtn" onClick={() => handleDelete(complain._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComplainPage;
