import axios from 'axios';
import React, { useEffect, useState } from 'react'

function NotificationDropdown() {

    const [notify, setNotify] = useState([]); 

    const getData = async () => {
      try {
        const response = await axios.get('https://hostelmanagement-backend-nbv7.onrender.com/notifications/notification');
        setNotify(response.data);
      
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);

  return (
    <div>
        <h3 className='text-center title'>Notifications</h3>
        <ul className="dropdrownUl">
    
        {
            notify.map((msg,index) => (
                <li key={index} className="dropdownList">
                    {msg.notification}
                </li>
            ))
        }
        
      </ul>
    </div>
  )
}

export default NotificationDropdown
