import { NavLink } from "react-router-dom";
import "./Global.css";
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


const menuItems = [
  { name: "Home", path: "/", icon: homeIcon },
  { name: "Users", path: "/users/Pending/1/10", icon: userIcon },
  { name: "Distribution", path: "/distribution", icon: distributionIcon },
  { name: "Artists", path: "/artists", icon: groupIcon },
  { name: "Labels", path: "/Labels", icon: labelsIcon },
  { name: "Analytics", path: "/analytics/1/10", icon: analyticsIcon },
  { name: "Service Request", path: "/ServiceRequest",icon: serviceRequestIcon,},
  { name: "Transactions", path: "/transaction/All/1/10", icon: transactionsIcon },
  { name: "Support", path: "/support", icon: supportIcon, divider: true },
  { name: "Help", path: "/help", icon: helpIcon },
  { name: "Profile", path: "/profile", icon: profileIcon, divider: true },
  { name: "My Settings", path: "/settings", icon: settingsIcon },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="Dream Records Logo" width={86} />
      </div>

      {/* Create Button */}

      <button className="theme-btn">+ Create</button>

      {/* Navigation Links */}
      <nav className="nav">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.divider && <hr className="divider" />}
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <img
                src={item?.icon}
                alt={item.name}
                className="nav-icon"
              />
              {item.name}
            </NavLink>
          </div>
        ))}
      </nav>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="sidebar-bottomTxt-div">
        <p>Powered by</p>
        <img src="src/assets/believe.png" alt="" />
      </div>
    </aside>
  );
};

export default Sidebar;
