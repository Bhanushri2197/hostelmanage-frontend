import React, { useEffect, useState } from 'react';
import "../Styles/profilePageStyle.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import profileImg from "../assets/image/profile.jpg";

function ProfilePage() {
  const [complains, setComplains] = useState([]);
  
  const user = JSON.parse(localStorage.getItem('user'));

  const getComplains = async () => {
    try {
      const complainsRes = await axios.get("http://localhost:4000/complains/complain");
      if (user && user.name) {
        const assignedComplains = complainsRes.data.filter(complain => complain.assignee === user.name);
        setComplains(assignedComplains);
      } else {
        setComplains(complainsRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let { _id } = useParams();
  let [initialValue, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    roomNo: "",
    role: "",
  });

  useEffect(() => {
    if (_id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/authentication/users/${_id}`);
          const user = response.data;
          setInitialValues({
            name: user.name,
            email: user.email,
            phone: user.phone,
            roomNo: user.roomNo,
            role: user.role,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
      getComplains();
    } else {
      console.error("User ID is undefined");
    }
  }, [_id]);

  const handleStatus = async (_id) => {
    try {
      const updatedStatus = { status: "Completed" };
      await axios.put(`http://localhost:4000/complains/complain/${_id}`, updatedStatus);
      getComplains();
    } catch (error) {
      console.error("Error updating complain:", error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValue,
    validate: (values) => {
      let errors = {};
      if (!values.name) errors.name = "Please enter a name";
      if (!values.email) errors.email = "Please enter an email";
      if (!values.phone) errors.phone = "Please enter a phone number";
      if (!values.roomNo) errors.roomNo = "Please enter a room number";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:4000/authentication/users/${_id}`, values);
        alert("Profile updated successfully");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
  });

  return (
    <div className='profilePageBlock'>
      <h1 className='text-center title'>Profile Page</h1>
      <div className='container'>
        <div className="d-flex profileContainer">
          <div className="innerContent w-100 leftBlock position-relative">
          <form onSubmit={formik.handleSubmit}>
              <div className="profileImgBlock">
                <span className='text'>{formik.values.name ? formik.values.name[0] : ""}</span>
              </div>
              <div className='formBlock mt-5 px-4 position-relative'>
                <label htmlFor="name">Name</label>
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
              <div className='formBlock w-100 px-4 position-relative'>
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
              <div className='formBlock w-100 px-4 position-relative'>
                <label htmlFor="phone">Phone Number</label>
                <input
                  className='inputForm'
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <span className='errorMsg'>
                  {formik.errors.phone && formik.touched.phone && formik.errors.phone}
                </span>
              </div>
              {formik.values.role !== 'staff' && (
                <div className='formBlock p-2 position-relative'>
                  <label htmlFor="roomNo">Your Room Number</label>
                  <input
                    className='inputForm'
                    id="roomNo"
                    name="roomNo"
                    placeholder="Enter your room number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.roomNo}
                  />
                  <span className='errorMsg'>
                    {formik.errors.roomNo && formik.touched.roomNo && formik.errors.roomNo}
                  </span>
                </div>
              )}
              <div className='d-flex justify-content-end'>
                <input
                  className='mt-5 mx-4 btnPrimary'
                  type="submit"
                  value="Save"
                  disabled={formik.isSubmitting}
                />
              </div>
            </form>
          </div>
          <div className="rightBlock w-100">
            <img src={profileImg} className='w-100' alt="HostelStyle profile" />
          </div>
        </div>

        <div className="AssigneeBlock">
          <h1 className='text-center title'>Assigned Complaints</h1>
          <div className="complainsList d-flex flex-wrap justify-content-center">
            {complains.length > 0 ? (
              complains.map((complain, index) => (
                <div key={index} className="complainItems">
                  <span className={`status ${complain.status === 'Completed' ? 'complete' : ''}`}>{complain.status}</span>
                  <div className="innerContent">
                    <div className="d-flex h-100 flex-column justify-content-between">
                      <div className="d-flex flex-column">
                        <h5 className="heading5">{complain.complainTitle} in room - {complain.roomNo}</h5>
                        <div className="createdDate">Created at {complain.createdAt}</div>
                        <div className="description">{complain.description}</div>
                      </div>
                      <div className="actionBlock p-3 d-flex justify-content-end">
                        <button className="btn editBtn" onClick={() => handleStatus(complain._id)}>Complete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="noComplainsMessage">There are no complaints assigned.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

