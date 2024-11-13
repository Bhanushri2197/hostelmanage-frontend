import React from 'react'
import logo from "../assets/image/logo1.png";
import phone from "../assets/image/phone.png"
import email from "../assets/image/email.png"
import map from "../assets/image/map.png"
import "../Styles/footerStyle.css"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footerBlock'>
      <div className="footer-corporate-inset">
          <div className="container">
            <div className="row contentInner">
              <div className="col-sm-4 col-xs-12">
                  <div className="wow slideInRight" >
                    <div className="logoBlock">
                        <img src={logo}/>
                        <span>HostelStyle</span>
                    </div>
                    <p className="description">
                    Your home away from home, where adventure meets comfort. Relax, connect with fellow travelers, and explore the world, all while making unforgettable memories along the way.

                    </p>
                  </div>
              </div>
             
              <div className="col-sm-4 col-xs-12">
                  <div className="innerContent d-flex flex-column align-items-center slideInDown" >
                    <h5 className="heading5">Quick links</h5>
                    <ul className="linkDirect">
                      <li><Link className='d-flex align-items-center' to={'/rooms'}> <span className="arrow"></span> Our Rooms</Link></li>
                      <li><Link className='d-flex align-items-center'  to={'/complains'}><span className="arrow"></span>Complains</Link></li>
                      <li><Link className='d-flex align-items-center'  to={'/contact-us'}><span className="arrow"></span>Contact us</Link></li>
                    </ul>
                  </div>
              </div>
              <div className="col-sm-4 col-xs-12">
                  <div className="innerContent slideInLeft" >
                    <h5 className="heading5">Contact us</h5>
                    <ul className="footer-contacts p-0 d-inline-block d-sm-block">
                      <li className='d-flex align-items-center contactContent'>
                          <img src={phone} alt="" />
                          <div className="unit-body">+1 323-913-4688</div>
                   
                      </li>
                      <li className='d-flex align-items-center contactContent'>
                          <img src={email} alt="" />
                          <div className="unit-body">info@demolink.org</div>
                       
                      </li>
                      <li className='d-flex align-items-center contactContent'>
                          <img src={map} alt="" /> 
                          <div className="unit-body">4730 Crystal Springs Dr, Los Angeles, CA 90027</div>
                       
                      </li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerBottom text-center">HostelStyle © Hostel Template All rights reserved Copyrights 2024</div>
    </div>
  )
}

export default Footer
