import { useState } from "react";
import "./logIn.css";
import { useNavigate } from "react-router-dom";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import auth from "../../../firebase.config";
import { useForm } from "react-hook-form";
function ResetPassword() {
  
  const navigate = useNavigate()
  
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emaliErr, setEmailErr] = useState();
    // User Update Form _________________________________
    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = async (data) => {
        setLoading(true)
        const email = data.email
        sendPasswordResetEmail(email)
        .then((res) => {
            console.log(res);
            setIsResetPassword(true)
        })
        .catch(err => {
            console.log(err);
            setEmailErr(err)
        })
        setLoading(false)   
    }


  return (
    <div className="logIn-pg">
      <div className="login-sideimg-div"></div>
      <div className="login-form-section">
        <div style={{ textAlign: "center" }}>
          <img src="src/assets/Logo.png" alt="" />
        </div>
        <h5> We will email you instructions on how to reset your password.</h5>

        <div>
            {isResetPassword ? (
            <p className="resetPass-msg">
              We have sent you an email with instructions on how to reset your
              password.
            </p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>Email</label>
              <input {...register("email", { required: true})} type="email" />
              {errors.email && <span style={{color: 'red'}}>Please enter your email</span>}
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {
                loading && <p>Loading.....</p>
              }
              {
                emaliErr && <p style={{color: 'red'}}>{emaliErr}</p>
              }
              </div>
              <button
                className="theme-btn"
                style={{ width: "100%", margin: "0 0 24px 0" }}
                type="submit"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>

        <button onClick={() => navigate('/login')} className="theme-btn2">Return to login</button>
      </div>
    </div>
  );
}

export default ResetPassword;
