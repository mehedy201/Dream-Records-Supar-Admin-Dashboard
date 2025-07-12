import { Flex } from "@radix-ui/themes";
import "./logIn.css";
function LogIn() {
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
        <label>Email</label>

        <input type="text" name="firstName" />
        <Flex className="d-flex">
          {" "}
          <label>Password</label>
          <label
            style={{
              marginLeft: "auto",
            }}
          >
            Forget Password?
          </label>
        </Flex>
        <input type="text" name="firstName" className="password-input" />
        <button
          className="theme-btn"
          style={{ width: "100%", margin: "0 0 24px 0" }}
        >
          Log In
        </button>
        <button className="theme-btn2">Don’t have an account? sign up</button>
      </div>
    </div>
  );
}

export default LogIn;
