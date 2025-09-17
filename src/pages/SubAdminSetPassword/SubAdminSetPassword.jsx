import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import logo from "../../assets/Logo.png";
import toast from 'react-hot-toast';
import { Flex } from '@radix-ui/themes';
import FormSubmitLoading from '../../components/FormSubmitLoading';

const SubAdminSetPassword = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    const [tempUser, setTempUser] = useState();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            console.log(token)
            navigate("/");
            return;
        }
        axios.get(`http://localhost:5000/common/api/v1/authentication/get-temp-user/${id}`)
        .then((res) => {
            if(res.data.status === 200){
                console.log(res.data.data);
                setTempUser(res.data.data);
            }
            else{
                navigate("/login");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    },[])


    const [loading, setLoading] = useState(false);
    const [errorMassage, setErrorMassage] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        setLoading(true);
        const payload = { ...data, id };
        axios
        .post(
            `http://localhost:5000/common/api/v1/authentication/sub-admin-password`,
            payload
        )
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            toast.success(res.data.message);
            navigate("/");
            setLoading(false);
            } else {
                console.log('object',res.data.message)
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
                    You can now access the Dream Records admin panel by setting your password.
                </h5>
                <Flex className="d-flex">
                {" "}
                <label>Password</label>
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
                    Set Password
                </button>
            </form>
        </div>
    );
};

export default SubAdminSetPassword;