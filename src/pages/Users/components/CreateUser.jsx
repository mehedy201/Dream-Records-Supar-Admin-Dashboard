import { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import UserPersonalInformationForm from "./UserPersonalInformationForm";
import UserAddressInformationForm from "./UserAddressInformationForm";
import UserLabelForm from "./UserLabelForm";
import ImageUpload from "../../../components/ImageUpload";
const steps = [
  "Personal Details",
  "Address Information",
  "Label Verification",
  "Document Upload",
];
function CreateUser() {
  const [step, setStep] = useState(0);
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  return (
    <div className="main-content createUser-main-content">
      {step === 4 ? (
        <div className="createUser-track-create-successful">
          <img src="src/assets/icons/circle-tick.png" alt="" />
          <h5>User Created Successfully</h5>
          <p>
            Your user has been successfully created. You can now review the
            details, make edits, or proceed with distribution.
          </p>
          <br />
          <div className="d-flex">
            <button className="createUser-backDash-btn">
              Back to Dashboard
            </button>
            <button className="theme-btn" style={{ width: "100%" }}>
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

      {step === 0 && <UserPersonalInformationForm />}
      {step === 1 && <UserAddressInformationForm />}
      {step === 2 && <UserLabelForm />}
      {step === 3 && (
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
      )}
      {step === 4 || (
        <div className="createUser-btns">
          {step > 0 && (
            <button
              className="theme-btn2"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={handlePrev}
            >
              <ArrowLeft />
              &nbsp; Back
            </button>
          )}

          {step < steps.length - 1 ? (
            <button className="theme-btn" onClick={handleNext}>
              Next &nbsp; <ArrowRight />
            </button>
          ) : (
            <button className="theme-btn" onClick={() => setStep(4)}>
              Submit &nbsp; <ArrowRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateUser;
