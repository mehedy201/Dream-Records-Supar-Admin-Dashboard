import { useState } from "react";
import "./logIn.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormSubmitLoading from "../../components/FormSubmitLoading";
import logo from "../../assets/Logo.png";
function ResetPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // User Update Form _________________________________
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/forgot-password",
        { email: data.email }
      );

      console.log(res);

      if (res.data.message) {
        setMessage("OTP sent to your email. Please check.");
        navigate(`/set-new-password/${data.email}`);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="" />
        </div>
        <h5> We will email you instructions on how to reset your password.</h5>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span>Email Required</span>}
          {message && <p>{message}</p>}
          <button
            type="submit"
            className="theme-btn"
            style={{ width: "100%", margin: "0 0 24px 0", display: "flex", justifyContent: "center", alignItems: "center", gap: '10px' }}
          >
            {loading && <span className="btn-spinner-span"></span>}
            Reset Password
          </button>
        </form>

        <button onClick={() => navigate("/login")} className="theme-btn2">
          Return to login
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
