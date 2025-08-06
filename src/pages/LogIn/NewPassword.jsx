import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {confirmPasswordReset, applyActionCode} from 'firebase/auth'
import auth from "../../../firebase.config";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

function NewPassword() {

  const navigate = useNavigate()

  const { email } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    const mode = queryParams.get('mode');

    // const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState('')
    // const [openEmailDiv, setOpenEmailDiv] = useState(false)
    // const [openPassDiv, setOpenPassDiv] = useState(false)

    useEffect(() => {
        if (mode && oobCode) {
        switch (mode) {
            case "verifyAndChangeEmail":
            // setOpenEmailDiv(true)
            handleEmailVerification(auth, oobCode);
            break;
            case "resetPassword":
            setOpenPassDiv(true)
            break;
        }
        }
    }, [mode, oobCode]);

    const handleEmailVerification = async (auth, oobCode) => {
        try {
            await applyActionCode(auth, oobCode);
            toast.success("Your email has been successfully updated!")
            // setMessage("Your email has been successfully updated!");
            setErrMessage("")
        } catch (error) {
            if (error.code === 'auth/invalid-action-code') {
                setErrMessage("The action code is invalid or has expired.");
            } else {
                setErrMessage("Error updating email: " + error.message);
            }
        }
    };


    const [passwordError, setPasswordError] = useState();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
      setLoading(true);
      setMessage("");
      let newPassword;
      if (data.password1 === data.password2) {
        newPassword = data.password1;
      } else {
        setMessage("Password Not Match");
        return;
      }

      const payload = { newPassword, otp: data.otp, email: data.email };
      const res = await axios.post(
        "https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/reset-password",
        payload
      );

      if (res.data.token) {
        setMessage(res.data.message);
        localStorage.setItem("token", res.data.token); // ✅ Token save
        navigate("/"); // redirect
        setLoading(false);
      }
    }

    const [inputType1, setInputType1] = useState('password')
    const [inputType2, setInputType2] = useState('password')

    // const passwordTypeHandle1 = () => {
    //     if(inputType1 === 'password'){
    //         setInputType1('text')
    //     }
    //     if(inputType1 === 'text'){
    //         setInputType1('password')
    //     }
    // }
    // const passwordTypeHandle2 = () => {
    //     if(inputType2 === 'password'){
    //         setInputType2('text')
    //     }
    //     if(inputType2 === 'text'){
    //         setInputType2('password')
    //     }
    // }


  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src="src/assets/Logo.png" alt="" />
        </div>
        <h5>
          Login to release and distribute your content, check to streamline data
          & revenue.
        </h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input
            value={email}
            type="email"
            {...register("email", { required: true })}
          />
          {errors.otp && <span>OTP Required</span>}

          <label>OTP</label>
          <input type="text" {...register("otp", { required: true })} />
          {errors.otp && <span>OTP Required</span>}

          <label>New Password</label>
          <input
            type="text"
            name="Enter your password"
            className="password-input"
            {...register("password1", { required: true })}
          />
          {errors.password1 && <span>New Password Required</span>}
          <label>Confirm Password</label>
          <input
            type="text"
            name="Enter your password"
            className="password-input"
            {...register("password2", { required: true })}
          />
          {errors.password2 && <span>Confirm Password Required</span>}
          {loading && <FormSubmitLoading />}
          {message && <p>{message}</p>}
          <button
            className="theme-btn"
            style={{ width: "100%", margin: "0 0 24px 0" }}
            type="submit"
          >
            Update Password
          </button>
        </form>
        <button onClick={() => navigate("/login")} className="theme-btn2">
          Return to login
        </button>
      </div>
    </div>
  );
}

export default NewPassword;
