import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import LoadingScreen from "../components/LoadingScreen";
import {
  setUserData,
  setUserNameIdRoll,
} from "../redux/features/userDataHandleSlice/userDataHandleSlice";

const Authorization = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setChecking(true);

    const verifyUserAccess = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode(token);

        // Token expire
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const displayName = decoded.displayName;
        const userNameIdRoll = displayName?.split("'__'"); // ['username', 'id', 'role']
        const userId = userNameIdRoll[1];
        console.log('userId', userId)

        dispatch(setUserNameIdRoll(userNameIdRoll));

        const res = await axios.get(
          `http://localhost:5000/api/v1/users/${userId}`
        );
        const userData = res.data.data;
        console.log(userData)
        dispatch(setUserData(userData));

        // Role Based Access
        if (userData?.roll === "Admin") {
          // Admin → route access
        } else if (userData?.roll === "sub-admin") {
          const access = userData?.access || [];
          const currentPath = location.pathname.toLowerCase();
          const firstSegment = currentPath.split("/")[1];

          if (currentPath === "/") {
            
          }else{
            const requiredAccess = [...access];
          if (access.includes("distribution")) {
            requiredAccess.push("release");
          }

          const hasAccess = requiredAccess.some((acc) =>
            firstSegment.includes(acc.toLowerCase())
          );

          if (!hasAccess) {
            navigate("/unauthorized");
            return;
          }
          }

          
        } else {
          navigate("/login");
          return;
        }

        // Last login update
        await axios.patch(
          `http://localhost:5000/api/v1/users/last-log-in/${userId}`,
          {}
        );
      } catch (err) {
        console.error("Auth check failed:", err.message);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setChecking(false);
      }
    };

    verifyUserAccess();
  }, [location.pathname]);

  if (checking) {
    return <LoadingScreen />;
  }

  return children;
};

Authorization.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Authorization;
