import { useState } from "react";
import "./logIn.css";
function ResetPassword() {
  const [isResetPassword, setIsResetPassword] = useState(false);
  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src="src/assets/Logo.png" alt="" />
        </div>
        <h5> We will email you instructions on how to reset your password.</h5>

        {isResetPassword ? (
          <p className="resetPass-msg">
            We have sent you an email with instructions on how to reset your
            password.
          </p>
        ) : (
          <>
            <label>Email</label>

            <input type="text" name="firstName" />

            <button
              className="theme-btn"
              style={{ width: "100%", margin: "0 0 24px 0" }}
              onClick={() => setIsResetPassword(true)}
            >
              Reset Password
            </button>
          </>
        )}

        <button className="theme-btn2">Return to login</button>
      </div>
    </div>
  );
}

export default ResetPassword;
