import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./Global.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserData,
  setUserNameIdRoll,
} from "../redux/features/userDataHandleSlice/userDataHandleSlice";
import logOutIcon from "../assets/icons/logout.png";

const Navbar = ({ toggleMobileMenu }) => {
  const [open, setOpen] = useState(false);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);

  useEffect(() => {
    if (user) {
      const userNameIdRoll = user?.displayName?.split("'__'");
      dispatch(setUserNameIdRoll(userNameIdRoll));
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`
        )
        .then((res) => {
          if (res.status === 200) {
            const data = res.data.data;
            const date = new Date().toISOString();
            const formData = { ...data, lastLogin: date };
            axios
              .put(
                `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/${userNameIdRoll[1]}`,
                formData
              )
              .then((res) => {
                if (res.status === 200) {
                  dispatch(setUserData(formData));
                }
              });
          }
        });
    }
  }, [user]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="navbar">
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <Menu />
      </div>
      <DropdownMenu.Root onOpenChange={setOpen}>
        <DropdownMenu.Trigger style={{ border: "none", background: "none" }}>
          <span style={{ padding: "15px 20px" }} className="nav-dropdown">
            {" "}
            S
          </span>{" "}
          <ChevronDown className={`${open ? "rotate" : ""}`} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="dropdown-content navbar-dropdown-content">
          <div className="d-flex">
            <button className="nav-dropdown">
              {userData?.first_name?.slice(0, 1)}
            </button>
            <div>
              <p>
                {userData?.first_name} {userData?.last_name}
              </p>
              <small>{userData?.email}</small>
            </div>
            <ChevronUp />
          </div>
          <br />
          <Link to="/profile" style={{ textDecoration: "none", color: "#fff" }}>
            <DropdownMenu.Item className="theme-btn">
              <FaRegUser /> Profile
            </DropdownMenu.Item>
          </Link>
          <hr />
          <DropdownMenu.Item
            onClick={() => {
              signOut();
              navigate("/login");
            }}
            className="d-flex"
            style={{ marginLeft: "6px" }}
          >
            <div>
              <img src={logOutIcon} width="16px" alt="" />
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
