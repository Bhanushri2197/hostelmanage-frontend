import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import "../../Styles/adminDashboardStyle.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Automatically navigate to the correct sub-route if none is provided
    if (location.pathname === '/admin/dashboard') {
      navigate('complain'); // Default to "Complains" if no sub-route is specified
    }
  }, [location.pathname, navigate]);

  return (
    <div className='adminDashboardPage d-flex w-100'>
      <div className="sideBar">
        <h4 className="heading mb-4 w-100">Admin</h4>
        <NavLink
          to={'complain'}
          className={({ isActive }) => isActive ? 'navLinks active' : 'navLinks'}
        >
          Complains
        </NavLink>
        <NavLink
          to={'students'}
          className={({ isActive }) => isActive ? 'navLinks active' : 'navLinks'}
        >
          Residents
        </NavLink>
        <NavLink
          to={'rooms'}
          className={({ isActive }) => isActive ? 'navLinks active' : 'navLinks'}
        >
          Rooms
        </NavLink>
        <NavLink
          to={'booking'}
          className={({ isActive }) => isActive ? 'navLinks active' : 'navLinks'}
        >
          Booking Request
        </NavLink>
        <NavLink
          to={'notification'}
          className={({ isActive }) => isActive ? 'navLinks active' : 'navLinks'}
        >
          Notifications
        </NavLink>
      </div>
      <div className="mainContentBlock w-100">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
