import React from 'react'
import room1 from "../assets/image/hotelRoom1.jpeg"
import { Link } from 'react-router-dom'

function HomePageBook() {
  return (
    <div className='bookingDirectBlock'>
        <div className="bookingDirectInner" >
          <div className="mainContentBlock position-relative">
            <div className="container innerBlock">
              <h3 className="heading">A Home for the Wanderers
               </h3>
              <p className="descript">
                With our hostel, you can save a lot of money on accommodation throughout the year to enjoy your stay at our city.
                 </p>
                <Link to={'/rooms'} className="btn btnPrimary bookBtn">Book now</Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HomePageBook
