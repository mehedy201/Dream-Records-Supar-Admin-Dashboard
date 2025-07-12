import { useForm } from "react-hook-form";
import SelectDropdown from "../../../components/SelectDropdown";
function UserAddressInformationForm() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <h4 style={{ fontSize: "24px", fontWeight: 500 }}>Address Information</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="createUser-form">
        <div className="editUser-from-grid">
          <div>
            <label htmlFor="">Address Line 1 *</label>
            <input {...register("Address Line 1 *")} />
          </div>
          <div>
            <label htmlFor="">Address Line 2</label>
            <input {...register("lastName")} />
          </div>

          <div>
            <label htmlFor="">Select Country *</label>

            <SelectDropdown
              options={["Account", "Profile", "Settings"]}
              placeholder="India"
              className="createUser-dropdown-trigger"
            />
          </div>
          <div>
            <label htmlFor="">Select State *</label>

            <SelectDropdown
              options={["Account", "Profile", "Settings"]}
              placeholder="West Bengal"
              className="createUser-dropdown-trigger"
            />
          </div>
          <div>
            <label htmlFor="">City *</label>

            <input type="text" name="state" />
          </div>
          <div>
            <label htmlFor="">Postal Code *</label>
            <input type="text" name="postalCode" className="input-field" />
          </div>
        </div>

        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        {/* <input type="submit" className="theme-btn" /> */}
      </form>
    </>
  );
}

export default UserAddressInformationForm;
