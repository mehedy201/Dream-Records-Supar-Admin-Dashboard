import { useState } from "react";

import UserPersonalInformationForm from "./UserPersonalInformationForm";
import UserAddressInformationForm from "./UserAddressInformationForm";
// import UserLabelForm from "./UserLabelForm";
// import ImageUpload from "../../../components/ImageUpload";
import SetUserPassword from "./SetUserPassword";
import { useNavigate } from "react-router-dom";
import circleTickImg from '../../../assets/icons/circle-tick.png';
const steps = [
  "Personal Details",
  "Address Information",
  // "Label Verification",
  "Set Password",
  // "Document Upload",
];
function CreateUser() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="main-content createUser-main-content">
      {step === 3 ? (
        <div className="createUser-track-create-successful">
          <img src={circleTickImg} alt="" />
          <h5>User Created Successfully</h5>
          <p>
            Your user has been successfully created. You can now review the
            details, make edits, or proceed with distribution.
          </p>
          <br />
          <div className="d-flex">
            <button onClick={() => navigate('/')} className="createUser-backDash-btn">
              Back to Dashboard
            </button>
            <button onClick={() => navigate('/users/Active/1/10')} className="theme-btn" style={{ width: "100%" }}>
              View User
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`d-flex createUser-step ${
                step == index ? "step-active" : ""
              } ${step > index ? "release-step-before" : ""}${
                index === steps.length - 1 ? "release-last-step" : ""
              }`}
            >
              <div className="release-step-number"> {index + 1}</div>
              <p>{item}</p>
              {index !== steps.length - 1 && (
                <div className="release-step-line"></div>
              )}
            </div>
          ))}
        </div>
      )}

      {step === 0 && <UserPersonalInformationForm step={step} setStep={setStep}/>}
      {step === 1 && <UserAddressInformationForm step={step} setStep={setStep}/>}
      {step === 2 && <SetUserPassword step={step} setStep={setStep}/>}
      {/* {step === 3 && (
        <>
          {" "}
          <h4 style={{ fontSize: "24px", fontWeight: 500 }}>
            Document Information
          </h4>
          <div className="createUser-upload-div">
            <label htmlFor="">Upload Government ID *</label>
            <div className="d-flex">
              <div
                style={{
                  marginRight: window.innerWidth <= 420 ? "5px" : "10px",
                }}
              >
                <ImageUpload
                  placeholderImg="identity.png"
                  placeholderTxt="Drop Front Side of ID here"
                  className="createUser-identity-imgUpload"
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <ImageUpload
                  placeholderImg="identity.png"
                  placeholderTxt="Drop Back Side of ID here"
                  className="createUser-identity-imgUpload"
                />
              </div>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}

export default CreateUser;
