import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUserFirstStep, setCreateUserSecondStep } from '../../../redux/features/createUserDataHandleSlice/createUserDataHandleSlice';

const SetUserPassword = ({step, setStep}) => {

    const { createUserFirstStep, createUserSecondStep } = useSelector((state) => state.createUserDataSlice);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        setLoading(true);
        const label = {
            labelName: "Dream Records",
            imgUrl:
                "https://dream-records-2024.s3.ap-south-1.amazonaws.com/release-image/1754129130799-119804724-Dream%20Records%20Logo%20%28Dark%29.png",
            status: "Approved",
            instagram: "",
            facebook: "",
            youtube: "",
            email: createUserFirstStep?.email,
            date: new Date().toISOString(),
            userName: createUserFirstStep?.userName,
        };

        const user = { ...createUserFirstStep, ...createUserSecondStep, password: data.password, status: "Active", roll: "User", openingDateISO: new Date().toISOString(),};
        const payload = {user, label}
        axios.post(`http://localhost:5000/admin/api/v1/users/create-user`, payload)
        .then((res) => {
            if(res.data.status === 200){
                setLoading(false);
                dispatch(setCreateUserFirstStep({}));
                dispatch(setCreateUserSecondStep({}));
                setStep(step + 1);
            }
        })
    };



    return (
        <>
            <h4 style={{ fontSize: "24px", fontWeight: 500 }}>Set Password</h4>
            <form onSubmit={handleSubmit(onSubmit)} className="createUser-form">
                <div className="editUser-from-grid">
                    <div>
                        <label htmlFor="">Password *</label>
                        <input type='password' {...register("password", { required: true })} />
                        {errors.password && (<p style={{ color: "red", fontSize: '14px', margin: '3px 0px' }}>Address Line 1 Required</p>)}
                    </div>
                </div>

                <div className="createUser-btns">
                    <button
                    className="theme-btn2"
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={() => setStep(step - 1)}
                    >
                    <ArrowLeft />
                    &nbsp; Back
                    </button>
                    {
                        loading ? <button disabled className="theme-btn">loading...</button> :
                        <button type="submit" className="theme-btn">Next &nbsp; <ArrowRight /></button>
                    }
                </div>
            </form>
            </>
    );
};

export default SetUserPassword;