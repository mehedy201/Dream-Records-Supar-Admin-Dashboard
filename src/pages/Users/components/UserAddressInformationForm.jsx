import { useForm } from "react-hook-form";
import SelectDropdown from "../../../components/SelectDropdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { CountrySelect } from "react-country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { setCreateUserSecondStep } from "../../../redux/features/createUserDataHandleSlice/createUserDataHandleSlice";


function UserAddressInformationForm({step, setStep}) {

  const { createUserSecondStep } = useSelector((state) => state.createUserDataSlice);
  const dispatch = useDispatch();

  const [country, setCountry] = useState(createUserSecondStep?.country || null);
  const [countryError, setCountryError] = useState("");


  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({defaultValues: {...createUserSecondStep}});
  const onSubmit = (data) => {
    if (!country) {
      setCountryError("Please select your Country");
      return;
    }
    const payload = { ...data, country: country };
    dispatch(setCreateUserSecondStep(payload));
    setStep(step + 1);
    console.log(data)
  };
  return (
    <>
      <h4 style={{ fontSize: "24px", fontWeight: 500 }}>Address Information</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="createUser-form">
        <div className="editUser-from-grid">
          <div>
            <label htmlFor="">Address Line 1 *</label>
            <input {...register("addressLine1", { required: true })} />
            {errors.addressLine1 && (<p style={{ color: "red", fontSize: '14px', margin: '3px 0px' }}>Address Line 1 Required</p>)}
          </div>
          <div>
            <label htmlFor="">Address Line 2</label>
            <input {...register("addressLine2")} />
          </div>

          <div>
            <label htmlFor="">Select Country *</label>
            <CountrySelect
              onChange={(e) => {
                // setCountryid(e.id);
                const name = e.name;
                const emoji = e.emoji;
                const v = { name, emoji, countryId: e.id };
                setCountry(v);
                setCountryError("");
              }}
              defaultValue={country}
              placeHolder="Select Country"
            />
            {countryError && (
              <p style={{ color: "red", fontSize: '14px', margin: '3px 0px' }}>{countryError}</p>
            )}
          </div>
          <div>
            <label htmlFor="">Select State *</label>
              <input type="text" {...register("state", { required: true })} />
              {errors.state && (
                <p style={{ color: "red", fontSize: '14px', margin: '3px 0px' }}>
                  State Required
                </p>
              )}
          </div>
          <div>
            <label htmlFor="">City *</label>
            <input type="text" name="state" {...register("city", { required: true })}/>
            {errors.city && (
                <p style={{ color: "red", fontSize: '14px', margin: '3px 0px' }}>
                  City Required
                </p>
              )}
          </div>
          <div>
            <label htmlFor="">Postal Code *</label>
            <input type="text" name="postalCode" {...register("postalCode", { required: true })} className="input-field" />
            {errors.postalCode && (
                <p style={{ color: "red", fontSize: '14px', margin: '3px 0px' }}>
                  Postal Code Required
                </p>
              )}
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

          <button type="submit" className="theme-btn">Next &nbsp; <ArrowRight /></button>
        </div>
      </form>
    </>
  );
}

export default UserAddressInformationForm;
