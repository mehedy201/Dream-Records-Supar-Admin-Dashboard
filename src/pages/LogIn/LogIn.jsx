import { Flex } from "@radix-ui/themes";
import "./logIn.css";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.config";
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import logo from '../../assets/Logo.png'

function LogIn() {

  const navigate = useNavigate();

  const [
    signInWithEmailAndPassword,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);


  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data)
    const email = data.email;
    const password = data.password;
    const loginUser = signInWithEmailAndPassword(email, password)
    .then((res) => {
      if(res.user){
        navigate('/')
        }
    })
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
        {errors.email && <p style={{color: 'red', marginTop: '-10px'}}>Email Required</p>}
        <Flex className="d-flex">
          {" "}
          <label>Password</label>
          <label
            onClick={() => navigate('/resetpassword')}
            style={{
              marginLeft: "auto",
              cursor: 'pointer'
            }}
          >
            Forget Password?
          </label>
        </Flex>
        <input {...register("password", { required: true })} type="password" className="password-input" />
        {errors.password && <p style={{color: 'red', marginTop: '-10px'}}>Password Required</p>}
        {
          loading && <p>Loading.....</p>
        }
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
