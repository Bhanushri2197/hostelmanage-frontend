import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import profileDefault from "../assets/image/profile-default.jpeg";
import logo from "../assets/image/logo.png";
import bell from "../assets/image/bell.png";
import NotificationDropdown from "./NotificationDropdown";
import '../Styles/navbarStyle.css';

function TopNavbar({ setUser, user }) {  // Ensure user is passed as prop
  const [localUser, setLocalUser] = useState(null); // Local state for user
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLocalUser(user); // Update local user state when `user` prop changes
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');  // Clear localStorage
    setLocalUser(null);               // Clear local state
    setUser(null);                    // Clear global state
    navigate("/login");               // Redirect to login
  };

  return (
    <div>
      <NavbarBootstrap expand="lg" className="p-0">
        <Container className='h-100'>
          <NavbarBootstrap.Brand href="#">
            <img src={logo} alt="HostelStyle Logo" />
            <span>HostelStyle</span>
          </NavbarBootstrap.Brand>
          <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBootstrap.Collapse className='h-100' id="basic-navbar-nav">
            <Nav className="me-auto h-100 w-100">
              <div className="d-flex h-100 w-100 align-items-center justify-content-between">
                <div className="d-flex h-100 align-items-center">
                  <NavLink to="/" className='navLinks'>Home</NavLink>
                  <NavLink to="/rooms" className='navLinks'>Rooms</NavLink>
                  <NavLink to="/complains" className='navLinks'>Complain</NavLink>
                  <NavLink to="/contact-us" className='navLinks'>Contact Us</NavLink>
                  <NavLink to="/payment" className='navLinks'>Payment</NavLink>
                  
                  {/* Render Dashboard link only for admin users */}
                  {localUser?.role === 'admin' && (
                    <NavLink to="/admin/dashboard" className='navLinks'>Dashboard</NavLink>
                  )}
                </div>
                <div className="d-flex align-items-center h-100">
                  <div className="dropdown mx-2 notificationBlock">
                    <button className='notificatonBtn d-flex align-items-center justify-content-center' data-bs-toggle="dropdown" aria-expanded="false">
                      <img className='notifyImg' src={bell} alt="Notifications" />
                      <span className="notifyDot"></span>
                    </button>
                    <div className="dropdown-menu notifyDropdown">
                      <NotificationDropdown />
                    </div>
                  </div>

                  {/* Conditional rendering based on user authentication */}
                  {localUser ? (
                    <>
                      <button onClick={handleLogout} className="btn logOutBtn">Logout</button>
                      <NavLink to={`/my-profile/${localUser._id}`} className="ms-1">
                        <div className="loggedprofile">
                          <span className="mx-2">{localUser.name[0]}</span> {/* First letter of name */}
                        </div>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to="/sign-in" className="nav-link">Sign-in</NavLink>
                      <span className="mx-1">/</span>
                      <NavLink to="/login" className="nav-link">Log-in</NavLink>
                      <div className="profileBlock ms-1">
                        <img src={profileDefault} alt="Profile" className="profileImg" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Nav>
          </NavbarBootstrap.Collapse>
        </Container>
      </NavbarBootstrap>
    </div>
  );
}

export default TopNavbar;
