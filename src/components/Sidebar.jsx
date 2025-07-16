import { NavLink } from "react-router-dom";
import "./Global.css";

const menuItems = [
  { name: "Home", path: "/", icon: "home.png" },
  { name: "Users", path: "/users/Pending/1/10", icon: "users.png" },
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

const Sidebar = () => {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src="src/assets/Logo.png" alt="Dream Records Logo" width={86} />
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
                src={`src/assets/icons/${item.icon}`}
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
