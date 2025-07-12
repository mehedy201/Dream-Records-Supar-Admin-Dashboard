function VerificationEmailSent() {
  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src="src/assets/Logo.png" alt="" />
        </div>
        <h5>We will email you instructions on how to reset your password.</h5>
        <div className="verificationEmail-txt">
          <p>
            We have sent you an email with the verification link. Please check
            your inbox (and spam folder) and click the link to verify your
            account.
          </p>
        </div>
        <br />

        <button className="theme-btn2">Return to login</button>
      </div>
    </div>
  );
}

export default VerificationEmailSent;
