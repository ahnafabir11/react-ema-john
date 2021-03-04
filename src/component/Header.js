import React from 'react';
import './Header.css';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";

const Header = ()=> {
  return (
    <div className="Header">
      <img src={logo} alt="ema john logo"/>
      <nav>
        <Link to="/shop">Shop</Link> 
        <Link to="/review">Review</Link>
        <Link to="/manage">Manage Inventory</Link>
      </nav>
    </div>
  )
}

export default Header