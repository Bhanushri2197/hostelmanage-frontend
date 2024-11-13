import 'bootstrap/dist/css/bootstrap.min.css'
<script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>


import { BrowserRouter, Routes,Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import './App.css'
import TopNavbar from './Components/TopNavbar'
import LoginPage from './Components/LoginPage'
import SignInPage from './Components/SignInPage'
import RoomsListPage from './Components/RoomsListPage'
import Footer from './Components/Footer'
import ComplainPage from './Components/ComplainPage'
import ContactUsPage from './Components/ContactUsPage'
import AddComplain from './Components/AddComplain'
import Dashboard from './Components/Admin/Dashboard'
import AdminComplain from './Components/Admin/AdminComplain'
import AdminStudents from './Components/Admin/AdminStudents'
import RoomsList from './Components/Admin/RoomsList'
import Notification from './Components/Admin/Notification'
import AddRoom from './Components/Admin/AddRoom'
import ProfilePage from './Components/ProfilePage'
import Payment from './Components/PaymentPage'
import { useEffect, useState } from 'react'
import EditRoom from './Components/Admin/EditRoom'
import BookingRequest from './Components/Admin/BookingRequest'



function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);  // Set the user if already logged in
    }
  }, []);
  return <div>
     <BrowserRouter>
     <TopNavbar  user={user} setUser={setUser} />
     <div className="bodyInnerContent">
     <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='login' element={<LoginPage setUser={setUser}  />} />
        <Route path='sign-in' element={<SignInPage/>} />
        <Route path='rooms' element={<RoomsListPage/>} />
        <Route path='complains' element={<ComplainPage/>} />
        <Route path='add-complain' element={<AddComplain/>} />
        <Route path='contact-us' element={<ContactUsPage/>} />
        <Route path='payment' element={<Payment/>} />
        <Route path="/my-profile/:_id" element={<ProfilePage />} />
        <Route path='admin/dashboard' element={<Dashboard/>}>
          <Route path='complain' element={<AdminComplain/>} />
          <Route path='students' element={<AdminStudents/>} />
          <Route path='rooms' element={<RoomsList/>} />
          <Route path='booking' element={<BookingRequest/>} />
          <Route path="/admin/dashboard/edit-room/:_id" element={<EditRoom />} />
          <Route path='rooms/add-room' element={<AddRoom/>} />
          <Route path='notification' element={<Notification/>} />
        </Route>
        
        
      </Routes>
     </div>
     <Footer/>
   
     
     </BrowserRouter>
  </div>
}

export default App
