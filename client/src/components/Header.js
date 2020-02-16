import React from 'react'
import { Link } from 'react-router-dom'
import dotenv from 'dotenv'


// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>        
        <li><Link to='/ec'>Express Checkout [SPB] [NVP]</Link></li>
        {/* @TODO */}
        {/* <li><Link to='/eccheckoutjs'>Express Checkout[checkout.js] [NVP]</Link></li> */}
        <li><Link to='/ppp'>PayPal Plus</Link></li>
        <li><Link to='/refInst'>Reference with Installments</Link></li>
        <li><Link to='/refnvp'>Reference (Classic)</Link></li>
        <li><Link to='/linkedAcc'>Linked Accounts (Edison)</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
