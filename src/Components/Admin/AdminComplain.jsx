import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../Styles/complainStyle.css";
import { Link } from 'react-router-dom';

function AdminComplain() {
  const [complains, setComplains] = useState([]);
  const [assignee, setAssignee] = useState([]); // To store staff users
  const [selectedStaff, setSelectedStaff] = useState(''); // To hold selected staff ID
  const [editingComplainId, setEditingComplainId] = useState(null); // Track which complain is being edited

  const getComplains = async () => {
    try {
      const complainsRes = await axios.get("https://hostelmanagement-backend-nbv7.onrender.com/complains/complain");
      setComplains(complainsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (_id) => {
    let confirmDelete = confirm("Are you sure you want to delete this complain?");
    if (confirmDelete) {
      axios.delete(`https://hostelmanagement-backend-nbv7.onrender.com/complains/complain/${_id}`)
        .then(() => {
          setComplains(complains.filter((complain) => complain._id !== _id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEdit = async (id) => {
    setEditingComplainId(id); // Set the ID of the complain being edited
    try {
      const staff = await axios.get("https://hostelmanagement-backend-nbv7.onrender.com/authentication/users");
      const staffList = staff.data.filter(user => user.role === 'staff'); // Filter only staff users
      setAssignee(staffList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssignStaff = async (complainId) => {
    // Find the selected staff object based on the ID
    const selectedStaffObj = assignee.find(staff => staff._id === selectedStaff);

    if (!selectedStaffObj) {
      alert("Please select a valid staff member.");
      return;
    }

    try {
      // Update the complain with the staff name instead of ID
      await axios.put(`https://hostelmanagement-backend-nbv7.onrender.com/complains/complain/${complainId}`, { assignee: selectedStaffObj.name });
      alert('Staff assigned successfully');
      getComplains(); // Refresh the complains list
      setEditingComplainId(null); // Reset the editing state
      setSelectedStaff(''); // Clear the selected staff
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComplains();
  }, []);

  return (
    <div>
      <div className="contentInner container">
        <h1 className="heading1 text-center">Complains</h1>
        <div className="complainsList d-flex flex-wrap justify-content-center">
          {complains.map((complain, index) => {
            return (
              <div key={index} className="complainItems">
                <span className={`status ${complain.status === 'Completed' ? 'complete' : ''}`}>{complain.status}</span>
                <div className="innerContent">
                  <div className="d-flex h-100 flex-column justify-content-between">
                    <div className="d-flex flex-column">
                      <h5 className="heading5">{complain.complainTitle} in room - {complain.roomNo}</h5>
                      <div className="createdDate">Created by: {complain.email}</div>
                      <div className="createdDate">Created at: {complain.createdAt}</div>
                      <div className="createdDate">Assignee: {complain.assignee || 'Unassigned'}</div> {/* Display staff name */}
                      <div className="description">{complain.description}</div>
                      {editingComplainId === complain._id && ( // Only show if editing
                        <div>
                          <select
                            className="inputForm w-100 p-2"
                            onChange={(e) => setSelectedStaff(e.target.value)} // Update selected staff ID
                            value={selectedStaff}
                          >
                            <option value="">Select Staff</option>
                            {assignee.map((staff, index) => (
                              <option key={index} value={staff._id}>{staff.name}</option> // Show staff name in the dropdown
                            ))}
                          </select>
                          <button className="btn mt-2 btnPrimary" onClick={() => handleAssignStaff(complain._id)}>Assign Staff</button>
                        </div>
                      )}
                    </div>
                    <div className="actionBlock p-3 d-flex justify-content-end">
                      <button className="btn editBtn" onClick={() => handleEdit(complain._id)}>Edit</button>
                      <button className="btn deleteBtn" onClick={() => handleDelete(complain._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminComplain;
