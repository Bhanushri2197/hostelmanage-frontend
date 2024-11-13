import React from 'react';
import "../../Styles/addComplainStyle.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function AddRoom() {
  const navigate = useNavigate(); 

  const convertBase64 = (file) =>  {
    return new Promise((resolve,reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    });
  };

  const uploadeImage = async (event) => {
    const file = event.target.files[0]; // Corrected to use 'files' array
    const base64 = await convertBase64(file);
    formik.setFieldValue('roomImg', base64); // Set base64 string to Formik's values
  };

  const formik = useFormik({
    initialValues: {
      roomTitle: "",
      roomImg: "",
      availability: "",
      price: "",
      description: ""
    },
    validate: (values) => {
      let error = {};
      if (values.roomTitle === "") {
        error.roomTitle = "Please Enter your room title";
      }
      if (values.roomImg === "") {
        error.roomImg = "Please insert room image";
      }
      if (values.availability === "") {
        error.availability = "Please Enter availability";
      }
      if (values.price === "") {
        error.price = "Please Enter your Price value";
      }
      if (values.description === "") {
        error.description = "Please Enter a description";
      }
      return error;
    },
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.post('https://hostelmanagement-backend-nbv7.onrender.com/rooms/rooms', values); // Send all form data
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
        console.log(res);
        if (res.status === 200) navigate("/rooms"); // Corrected URL path
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <div className='complainAddPageBlock'>
      <div className="complainAddContent w-100">
        <div className="complainAddInnerBlock d-flex">
          <div className="rightBlock w-100">
            <h2 className="heading2 w-100 text-center">Enter Room Details</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className='formBlock p-2 position-relative'>
                <label htmlFor="roomTitle">Room Title </label>
                <input
                  className='inputForm'
                  type="text"
                  id="roomTitle"
                  name="roomTitle"
                  placeholder="Enter Room Title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.roomTitle}
                />
                <span className='errorMsg'>
                  {formik.errors.roomTitle && formik.touched.roomTitle && formik.errors.roomTitle}
                </span>
              </div>
              <div className='d-sm-flex w-100 d-xs-block'>
                <div className='formBlock w-100 p-2 position-relative'>
                  <label htmlFor="availability">Room Available</label>
                  <input
                    className='inputForm'
                    type="number"
                    id="availability"
                    name="availability"
                    placeholder="Enter availability"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.availability}
                  />
                  <span className='errorMsg'>
                    {formik.errors.availability && formik.touched.availability && formik.errors.availability}
                  </span>
                </div>
                <div className='formBlock w-100 p-2 position-relative'>
                  <label htmlFor="price">Price</label>
                  <input
                    className='inputForm'
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter Price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                  <span className='errorMsg'>
                    {formik.errors.price && formik.touched.price && formik.errors.price}
                  </span>
                </div>
              </div>
              <div className='formBlock p-2 position-relative'>
                <label htmlFor="roomImg">Room Image </label>
                <input
                  className='inputForm'
                  type="file"
                  id="roomImg"
                  name="roomImg"
                  onChange={uploadeImage}
                  onBlur={formik.handleBlur}
                />
                <span className='errorMsg'>
                  {formik.errors.roomImg && formik.touched.roomImg && formik.errors.roomImg}
                </span>
              </div>
              <div className='formBlock p-2 position-relative'>
                <label htmlFor="description">Description</label>
                <textarea
                  className='inputForm textArea'
                  id="description"
                  name="description"
                  placeholder="Enter Description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                <span className='errorMsg'>
                  {formik.errors.description && formik.touched.description && formik.errors.description}
                </span>
              </div>
              <input
                className='mt-5 btnPrimary float-right'
                type="submit"
                value="Submit"
                disabled={formik.isSubmitting}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoom;
