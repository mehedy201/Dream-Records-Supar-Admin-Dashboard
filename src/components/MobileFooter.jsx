import { NavLink } from "react-router-dom";
import homeIcon from '../assets/icons/home.png'
import userIcon from '../assets/icons/users.png'
import distributionIcon from '../assets/icons/distribution.png'
import analyticsIcon from '../assets/icons/analytics.png'

const MobileFooter = () => {
  return (
    <div className="mobile-footer">
      <NavLink to="/" className="footer-item">
        <img src={homeIcon} alt="Home" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/users" className="footer-item">
        <img src={userIcon} alt="Users" />
        <span>Users</span>
      </NavLink>

      <div className="footer-add-button">
        <button>+</button>
      </div>

      <NavLink
        to="/distribution"
        className="footer-item distribution-footer-item"
      >
        <img src={distributionIcon} alt="distribution" />
        <span>distribution</span>
      </NavLink>

      <NavLink to="/Analytics" className="footer-item">
        <img src={analyticsIcon} alt="Analytics" />
        <span>Analytics</span>
      </NavLink>
    </div>
  );
};

export default MobileFooter;
