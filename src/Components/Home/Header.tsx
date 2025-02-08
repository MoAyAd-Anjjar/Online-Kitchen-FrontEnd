
import { useEffect, useState } from 'react';
import { FiClock } from 'react-icons/fi';
import Logo from '../../Images/Logo.png';
import { useLocation } from 'react-router-dom';  
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
          <LuLogOut size={20}></LuLogOut>
        </span>
      </div>

      <div className='Bottom-Header'>
        <span className={location.pathname === "/Home" ? "Selected-Page" : ""}>Home</span>
        <span className={location.pathname === "/About Us" ? "Selected-Page" : ""}  >About Us</span>
        <span  className={location.pathname === "/Contact" ? "Selected-Page" : ""} >Contact</span>
        <span  className={location.pathname === "/Products" ? "Selected-Page" : ""}  >Products</span>
        <span  className={location.pathname === "/Cart" ? "Selected-Page" : ""} >Cart</span>
      </div>
    </div>
  );
};

export default Header;
