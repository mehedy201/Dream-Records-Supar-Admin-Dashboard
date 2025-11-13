import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function NewPassword() {

  const navigate = useNavigate();
  const { email } = useParams();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      localStorage.setItem("token", res.data.token); 
      navigate("/"); // redirect
      setLoading(false);
    }
  };

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
          {message && <p>{message}</p>}
          <button
            className="theme-btn"
            style={{ width: "100%", margin: "0 0 24px 0", display: "flex", justifyContent: "center", alignItems: "center", gap: '10px' }}
            type="submit"
          >
            {loading && <span className="btn-spinner-span"></span>}
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
