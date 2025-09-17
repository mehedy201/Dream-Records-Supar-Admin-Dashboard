import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateUserFirstStep } from "../../../redux/features/createUserDataHandleSlice/createUserDataHandleSlice";

function UserPersonalInformationForm({ step, setStep }) {
  const dispatch = useDispatch();
  const { createUserFirstStep } = useSelector(
    (state) => state.createUserDataSlice
  );

  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState(createUserFirstStep?.userName);
  const [availability, setAvailability] = useState(null);
  const debouncedUsername = useDebounce(userName, 600);
  const [regaxErr, setRegaxErr] = useState();
  const [userNameErr, setUserNameErr] = useState("");

  useEffect(() => {
    const checkUsername = async () => {
      setUserNameErr("");
      const regex = /^[a-zA-Z0-9]+$/;
      setAvailability(""); // reset
      setRegaxErr(""); // reset
      if (debouncedUsername === "") return;
      // Step 1: validate regex
      if (!regex.test(debouncedUsername)) {
        setRegaxErr(
          "Only letters and numbers are allowed (no spaces or symbols)"
        );
        return;
      }
      if (debouncedUsername?.length < 3) {
        setAvailability(null); // Not valid username yet
        return;
      }
      try {
        const res = await axios.post(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/check-existing-user`,
          { userName: debouncedUsername }
        );
        console.log("response", res);
        if (res.data.message === "Exist User") {
          setAvailability("unavailable");
        } else if (res.data.message === "Continue") {
          setAvailability("available");
        } else {
          setAvailability(null); // unexpected
        }
      } catch (err) {
        console.error("API Error:", err.message);
        setAvailability(null);
      }
    };
    checkUsername();
  }, [debouncedUsername]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { ...createUserFirstStep } });
  const onSubmit = (data) => {
    setUserNameErr("");
    if (!userName) {
      setUserNameErr("User Name Required");
    }

    if (availability !== "available") {
      return;
    }

    const payload = { ...data, phone: phone, userName: userName };
    dispatch(setCreateUserFirstStep(payload));
    console.log(payload);
    setStep(step + 1);
  };

  return (
    <>
      <h4 style={{ fontSize: "24px", fontWeight: 500 }}>
        Personal Information
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className="createUser-form">
        <div className="editUser-from-grid">
          <div>
            <label htmlFor="">First Name</label>
            <input
              {...register("first_name", { required: true })}
              placeholder="First Name"
            />
            {errors.first_name && (
              <p style={{ color: "red", fontSize: "14px", margin: "3px 0px" }}>
                First Name Required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">First Name</label>
            <input
              {...register("last_name", { required: true })}
              placeholder="Last Name"
            />
            {errors.last_name && (
              <p style={{ color: "red", fontSize: "14px", margin: "3px 0px" }}>
                Last Name Required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">User Name</label>
            <input
              type="text"
              value={createUserFirstStep?.userName}
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            {availability === "available" && (
              <p style={{ color: "green", fontSize: "12px" }}>
                Username available
              </p>
            )}
            {availability === "unavailable" && (
              <p style={{ color: "red", fontSize: "12px" }}>Username taken</p>
            )}
            {userNameErr && <p style={{ color: "red" }}>{userNameErr}</p>}
            {regaxErr && <p style={{ color: "red" }}>{regaxErr}</p>}
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "14px", margin: "3px 0px" }}>
                Email Required
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">Phone Number</label>
            <PhoneInput
              country={"in"} // Default country
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputClass="phone-input-field"
              buttonClass="phone-dropdown"
              className="signUp-phone-input"
            />
          </div>
        </div>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <div className="createUser-btns">
          <button type="submit" className="theme-btn">
            Next &nbsp; <ArrowRight />
          </button>
        </div>
      </form>
    </>
  );
}

export default UserPersonalInformationForm;
