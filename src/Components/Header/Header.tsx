
import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import Logo from '../../Images/Logo.png';
import { Link, useLocation } from 'react-router-dom';  
import "./Header.css"
import { BiUserCircle } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';

const Header = () => {
  const [time, setTime] = useState<string>("--:--:--");
  const location = useLocation(); 



  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
      setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Header-Container">
      <div className='Top-Header'>
        <span className="left-Header">
          <FiClock />
          <span>{time}</span>
        </span>

        <span className="Middle-Header">
          <img src={Logo} alt="Company Logo" className="logo" />
          <h1>Rage Kitchen</h1>
        </span>

        <span className="Right-Header">
         <BiUserCircle size={20}></BiUserCircle>
          Moayad anjjar
          <LuLogOut  cursor={"pointer"} size={20} 
          onClick={()=>{
            localStorage.removeItem("UserInfo");
            window.location.href="/"
          }}
          ></LuLogOut>
        </span>
      </div>

      <div className='Bottom-Header'>
        <Link className={location.pathname === "/Home" ? "Selected-Page" : "Not-Selected-Page"} to={"Home"}>Home</Link>
        <Link className={location.pathname === "/About Us" ? "Selected-Page" : "Not-Selected-Page"}to={"about"}>About Us</Link>
        <Link  className={location.pathname === "/Forum" ? "Selected-Page" : "Not-Selected-Page"}to={"Forum"}>Forum</Link>
        <Link  className={location.pathname === "/MenuList" ? "Selected-Page" : "Not-Selected-Page"}  to={"MenuList"} >Products</Link>
        <Link  className={location.pathname === "/Cart" ? "Selected-Page" : "Not-Selected-Page"} to={"Cart"} >Cart</Link>
      </div>
    </div>
  );
};

export default Header;
