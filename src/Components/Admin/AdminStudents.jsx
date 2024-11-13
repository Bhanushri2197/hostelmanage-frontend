import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

function AdminStudents() {

  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/authentication/users');
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (_id) => {
    let confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:4000/authentication/users/${_id}`)
        .then(() => {
          setUsers(users.filter((req) => req._id !== _id));
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
        <h1 className="heading1 text-center">Residents List</h1>
        <div className="tableBlock mb-5 mt-5">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Room No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                user.role === "resident" && (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>{user.roomNo}</td>
                    <td>
                      <button className="btn deleteBtn" onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </Table>
        </div>
        <h1 className="heading1 mt-5 text-center">Staffs List</h1>
        <div className="tableBlock mt-5">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                user.role === "staff" && (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="btn deleteBtn" onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdminStudents;
