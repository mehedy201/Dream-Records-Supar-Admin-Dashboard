import { NavLink } from "react-router-dom";
import "./Global.css";
import PropTypes from "prop-types";

import logo from '../assets/Logo.png'

import homeIcon from '../assets/icons/home.png'
import userIcon from '../assets/icons/users.png'
import distributionIcon from '../assets/icons/distribution.png'
import groupIcon from '../assets/icons/group.png'
import labelsIcon from '../assets/icons/Labels.png'
import analyticsIcon from '../assets/icons/analytics.png'
import serviceRequestIcon from '../assets/icons/Service Request.png'
import transactionsIcon from '../assets/icons/Transactions.png'
import supportIcon from '../assets/icons/Support.png'
import helpIcon from '../assets/icons/Help.png'
import profileIcon from '../assets/icons/Profile.png'
import settingsIcon from '../assets/icons/Settings.png'


const MobileMenu = ({ closeMenu }) => {
  
  const menuItems = [
    { name: "Home", path: "/", icon: homeIcon },
    { name: "Users", path: "/users/Pending/1/10", icon: userIcon },
    { name: "Distribution", path: "/distribution", icon: distributionIcon },
    { name: "Artists", path: "/artists", icon: groupIcon },
    { name: "Labels", path: "/labels/1/10/All", icon: labelsIcon },
    { name: "Analytics", path: "/analytics/1/10", icon: analyticsIcon },
    { name: "Service Request", path: "/service-request/Release-Claim/1/10/All",icon: serviceRequestIcon,},
    { name: "Transactions", path: "/transaction/All/1/10", icon: transactionsIcon },
    { name: "Support", path: "/support", icon: supportIcon, divider: true },
    { name: "Help", path: "/help", icon: helpIcon },
    { name: "Profile", path: "/profile", icon: profileIcon, divider: true },
    { name: "My Settings", path: "/settings", icon: settingsIcon },
  ];

  return (
    <div className="mobile-menu-overlay">
      <button
        className="close-btn"
        onClick={closeMenu}
        style={{ padding: "1rem" }}
      >
        ✕
      </button>
      <div className="mobile-menu">
        <img
          src={logo}
          alt="Logo"
          width={60}
          style={{ padding: "1rem" }}
        />
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="nav-item"
            onClick={closeMenu}
            style={{ borderBottom: "1px solid #D9D9D9" }}
          >
            <img
              src={`src/assets/icons/${item.icon}`}
              alt={item.name}
              className="nav-icon"
            />
            {item.name}
          </NavLink>
        ))}
        <br />
        <br />
      </div>
    </div>
  );
};
MobileMenu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};
export default MobileMenu;
