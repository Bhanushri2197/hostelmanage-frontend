import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import '../../Styles/notificationStyle.css'
import { Table } from 'react-bootstrap';
import axios from 'axios';

function Notification() {
  const [notifications, setNotification] = useState([]); 
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const getData = async () => {
    try {
      const response = await axios.get('https://hostelmanagement-backend-nbv7.onrender.com/notifications/notification');
      setNotification(response.data);
    } catch (err) {
      console.error(err);
    }
  };



  const handleDelete = (_id) => {
    let confirmDelete = confirm("Are you sure you want to delete this Notifications?");
    if (confirmDelete) {
      axios
        .delete(`https://hostelmanagement-backend-nbv7.onrender.com/notifications/notification/${_id}`)
        .then(() => {
          setNotification(notifications.filter((notification) => notification._id !== _id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
    const formik = useFormik({
        initialValues: {
            notification: "",
        },
        validate : (values) => {
            let error = {}
            if(values.notification == ""){
                error.notification = "Please Enter your notification"
            }
            return error
        },
        onSubmit : async(values,actions) => {
          try {
            const res = await axios.post('https://hostelmanagement-backend-nbv7.onrender.com/notifications/notification', values); // Send all form data
            await new Promise((resolve) => setTimeout(resolve, 1000));
            actions.resetForm();
            setShow(false);
            getData();
          } catch (error) {
            console.log(error);
          }
           
        }
    })

    useEffect(() => {
      getData();
    }, []);


  return (
    <div>
       <div>
       <div className="contentInner container">
       <h1 className="heading1 text-center">Notification</h1>
        <div className="addBtnBlock d-flex justify-content-end">
            <button className="btnPrimary btnLg" onClick={handleShow}>Add Notification</button>
        </div>
        <div className="tableBlock mt-5">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Notifications</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                notifications.map((notification, index) => (
                  <tr key={index}>
                    <td>{notification._id}</td>
                    <td>{notification.notification}</td>
                    <td valign="middle" className='text-center align-middle'>
                        <div className="d-flex align-items-center">
                         <button className="btn deleteBtn" onClick={() => handleDelete(notification._id)}>Delete</button>
                        </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <form className='notificationForm' onSubmit={formik.handleSubmit}>
        <Modal.Body>
            
                        <div className='formBlock p-2 position-relative'>
                            <label className='' htmlFor="notification">Enter Notifications </label>
                            <textarea  className='inputForm mt-2' type="text" id="notification" name="notification" placeholder="Enter what to notify others"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.notification} >
                                </textarea>
                            <span className='errorMsg'>{formik.errors.notification && formik.touched.notification && formik.errors.notification}</span>
                        </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className='btn btnPrimary'  type="submit" value="Submit" disabled={formik.isSubmitting}>Save</Button>
      
        </Modal.Footer>
        </form>
      </Modal>
       </div>
    </div>
    </div>
  )
}

export default Notification
