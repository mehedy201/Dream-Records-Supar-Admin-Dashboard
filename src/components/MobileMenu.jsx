import { NavLink } from "react-router-dom";
import "./Global.css";
import PropTypes from "prop-types";
const MobileMenu = ({ closeMenu }) => {
  const menuItems = [
    { name: "Home", path: "/", icon: "home.png" },
    { name: "Users", path: "/users", icon: "users.png" },
    { name: "Distribution", path: "/distribution", icon: "distribution.png" },
    { name: "Artists", path: "/artists", icon: "group.png" },
    { name: "Labels", path: "/Labels", icon: "Labels.png" },
    { name: "Analytics", path: "/Analytics", icon: "analytics.png" },
    {
      name: "Service Request",
      path: "/ServiceRequest",
      icon: "Service Request.png",
    },
    { name: "Transactions", path: "/Transaction", icon: "Transactions.png" },
    { name: "Support", path: "/support", icon: "Support.png", divider: true },
    { name: "Help", path: "/help", icon: "Help.png" },
    { name: "Profile", path: "/profile", icon: "Profile.png", divider: true },
    { name: "My Settings", path: "/settings", icon: "Settings.png" },
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
          src="src/assets/Logo.png"
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
