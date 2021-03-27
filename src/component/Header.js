import React, { useContext } from 'react';
import './Header.css';
import logo from '../images/logo.png';
import { Link } from "react-router-dom";
import { UserContext } from '../App';

const Header = ()=> {
  const [, setLogedInUser] = useContext(UserContext);
  return (
    <div className="Header">
      <img src={logo} alt="ema john logo"/>
      <nav>
        <Link to="/shop">Shop</Link> 
        <Link to="/review">Review</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Log In</Link>
        <button onClick={()=> setLogedInUser({})}>sign out</button>
      </nav>
    </div>
  )
}

export default Header;