import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";

function UserPersonalInformationForm() {
  const [phone, setPhone] = useState("");
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
              // defaultValue="Subhamay"
              {...register("first_name")}
              placeholder="Subhamay"
            />
          </div>
          <div>
            <label htmlFor="">First Name</label>
            <input
              // defaultValue="Karjee"
              {...register("last_name")}
              placeholder="Karjee"
            />
          </div>
          <div>
            <label htmlFor="">User Name</label>
            <input
              // defaultValue="arpita"
              {...register("userName")}
              placeholder="arpita"
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input defaultValue="" {...register("Email")} />
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

        {/* <input type="submit" className="theme-btn" /> */}
      </form>
    </>
  );
}

export default UserPersonalInformationForm;
