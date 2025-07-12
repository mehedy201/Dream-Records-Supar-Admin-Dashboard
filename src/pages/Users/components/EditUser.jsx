import { useState } from "react";
import ImageUpload from "../../../components/ImageUpload";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SelectDropdown from "../../../components/SelectDropdown";
function EditUser() {
  const [phone, setPhone] = useState("+91 74309 75811");
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="main-content editUser-content">
      <div className="editUser-div">
        {" "}
        <ImageUpload
          title="Profile Picture"
          description="This will be displayed on your profile"
          placeholderImg="upload-img.png"
          placeholderTxt="Drop your image here"
        />
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="editUser-form">
          <h5>Personal Information</h5>
          <div className="editUser-from-grid">
            <div>
              <label htmlFor="">First Name</label>
              <input
                defaultValue="Subhamay"
                {...register("firstName")}
                placeholder="Subhamay"
              />
            </div>
            <div>
              <label htmlFor="">First Name</label>
              <input
                defaultValue="Karjee"
                {...register("lastName")}
                placeholder="Karjee"
              />
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
          <br />
          <h5>Address</h5>
          {/* include validation with required or other standard HTML validation rules */}
          <label htmlFor="">Address Line 1</label>
          <input
            {...register("exampleRequired", { required: true })}
            placeholder="Enter address line 1"
          />
          <label htmlFor="">Address Line 2</label>
          <input
            {...register("exampleRequired")}
            placeholder="Enter address line 2"
          />
          <div className="editUser-from-grid">
            <div>
              <label htmlFor="">Select Country</label>
              <SelectDropdown
                options={["Account", "Profile", "Settings"]}
                placeholder="India"
                className="editUser-dropdown"
              />
            </div>
            <div>
              <label htmlFor="">Select State</label>
              <SelectDropdown
                options={["Account", "Profile", "Settings"]}
                placeholder="West Bengal"
                className="editUser-dropdown"
              />
            </div>
            <div>
              <label htmlFor="">City</label>
              <input
                defaultValue="test"
                {...register("City")}
                placeholder="Dinhata"
              />
            </div>
            <div>
              <label htmlFor="">Postal Code</label>
              <input
                defaultValue="test"
                {...register("postcode")}
                placeholder="736135"
              />
            </div>
          </div>
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" className="theme-btn" />
        </form>
      </div>
    </div>
  );
}

export default EditUser;
