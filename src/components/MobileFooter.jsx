import { NavLink } from "react-router-dom";

const MobileFooter = () => {
  return (
    <div className="mobile-footer">
      <NavLink to="/" className="footer-item">
        <img src="/src/assets/icons/home.png" alt="Home" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/users" className="footer-item">
        <img src="/src/assets/icons/users.png" alt="Users" />
        <span>Users</span>
      </NavLink>

      <div className="footer-add-button">
        <button>+</button>
      </div>

      <NavLink
        to="/distribution"
        className="footer-item distribution-footer-item"
      >
        <img src="/src/assets/icons/distribution.png" alt="distribution" />
        <span>distribution</span>
      </NavLink>

      <NavLink to="/Analytics" className="footer-item">
        <img src="/src/assets/icons/analytics.png" alt="Analytics" />
        <span>Analytics</span>
      </NavLink>
    </div>
  );
};

export default MobileFooter;
