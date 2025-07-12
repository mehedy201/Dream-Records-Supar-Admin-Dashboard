function NewPassword() {
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
        <label>New Password</label>

        <input
          type="text"
          name="Enter your password"
          className="password-input"
        />
        <label>Confirm Password</label>

        <input
          type="text"
          name="Enter your password"
          className="password-input"
        />
        <button
          className="theme-btn"
          style={{ width: "100%", margin: "0 0 24px 0" }}
        >
          Update Password
        </button>
        <button className="theme-btn2">Return to login</button>
      </div>
    </div>
  );
}

export default NewPassword;
