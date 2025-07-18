import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./Global.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
const Navbar = ({ toggleMobileMenu }) => {
  const [open, setOpen] = useState(false);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <Menu />
      </div>
      <DropdownMenu.Root onOpenChange={setOpen}>
        <DropdownMenu.Trigger style={{ border: "none", background: "none" }}>
          <span style={{padding: '15px 20px'}} className="nav-dropdown"> S</span>{" "}
          <ChevronDown className={`${open ? "rotate" : ""}`} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="dropdown-content navbar-dropdown-content">
          <div className="d-flex">
            <button className="nav-dropdown"> S</button>
            <div>
              <p>Subhamay Karjee</p>
              <small> subhamaykarjee@gmail.com</small>
            </div>
            <ChevronUp />
          </div>
          <br />
          <Link to="/Profile" style={{ textDecoration: "none", color: "#fff" }}>
            <DropdownMenu.Item className="theme-btn">
              <FaRegUser /> Profile
            </DropdownMenu.Item>
          </Link>
          <hr />
          <DropdownMenu.Item onClick={() => {signOut(); navigate('/login')}} className="d-flex" style={{ marginLeft: "6px" }}>
            <div>
              <img src="src/assets/icons/logout.png" width="16px" alt="" />
            </div>
            &nbsp;&nbsp; <p>Logout</p>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
Navbar.propTypes = {
  toggleMobileMenu: PropTypes.array.isRequired,
};
export default Navbar;
