import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
function UserLabelForm({step, setStep}) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      {" "}
      <h4 style={{ fontSize: "24px", fontWeight: 500 }}>Label Information</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="createUser-form">
        <div>
          <label htmlFor="">Channel Name *</label>
          <input defaultValue="" {...register("channelName")} />
        </div>
        <div>
          <label htmlFor="">Channel URL *</label>
          <input defaultValue="" {...register("channelURL")} />
        </div>
        <div className="editUser-from-grid">
          <div>
            <label htmlFor="">Subscribers Count *</label>
            <input defaultValue="" {...register("subscribers")} />
          </div>
          <div>
            <label htmlFor="">Videos Count *</label>
            <input defaultValue="" {...register("videos")} />
          </div>
        </div>
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

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
    </div>
  );
}

export default UserLabelForm;
