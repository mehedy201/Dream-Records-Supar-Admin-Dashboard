import { Flex } from "@radix-ui/themes";
import "./logIn.css";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.config";
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import logo from "../../assets/Logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import FormSubmitLoading from "../../components/FormSubmitLoading";

function LogIn() {
  const navigate = useNavigate();

  // const [
  //   signInWithEmailAndPassword,
  //   loading,
  //   error,
  // ] = useSignInWithEmailAndPassword(auth);

  const [loading, setLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setErrorMassage("");
    setLoading(true);
    console.log(data);
    // const email = data.email;
    // const password = data.password;
    // const loginUser = signInWithEmailAndPassword(email, password)
    // .then((res) => {
    //   if(res.user){
    //     navigate('/')
    //     }
    // })
    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/user-login`,
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          const userNameIdRoll = res?.data?.displayName?.split("'__'"); // ['username', 'id', 'role']
          const roll = userNameIdRoll[2];
          if (roll !== "Admin") {
            setErrorMassage("Not Found");
            setLoading(false);
            return;
          }
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.message);
          navigate("/");
          setLoading(false);
        } else {
          setErrorMassage(res.data.message);
          setLoading(false);
        }
      });
  };

  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="" />
        </div>
        <h5>
          Login to release and distribute your content, check to streamline data
          & revenue.
        </h5>
        <label>Email</label>

        <input {...register("email", { required: true })} type="email" />
        {errors.email && (
          <p style={{ color: "red", marginTop: "-10px" }}>Email Required</p>
        )}
        <Flex className="d-flex">
          {" "}
          <label>Password</label>
          <label
            onClick={() => navigate("/resetpassword")}
            style={{
              marginLeft: "auto",
              cursor: "pointer",
            }}
          >
            Forget Password?
          </label>
        </Flex>
        <input
          {...register("password", { required: true })}
          type="password"
          className="password-input"
        />
        {errors.password && (
          <p style={{ color: "red", marginTop: "-10px" }}>Password Required</p>
        )}
        {loading && <FormSubmitLoading />}
        {errorMassage && <p style={{ color: "red" }}>{errorMassage}</p>}
        <button
          className="theme-btn"
          style={{ width: "100%", margin: "0 0 24px 0" }}
          type="submit"
        >
          Log In
        </button>
        <button className="theme-btn2">Don’t have an account? sign up</button>
      </form>
    </div>
  );
}

export default LogIn;
