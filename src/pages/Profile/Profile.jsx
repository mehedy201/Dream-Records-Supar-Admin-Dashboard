import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import "./Profile.css";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCamera } from "react-icons/fa";
import Modal from "../../components/Modal";
const personalInfo = [
  { title: "Personal Info" },
  { label: "First Name:", value: "John" },
  { label: "Last Name:", value: "Doe" },
];

const security = [
  { title: "Security Info" },

  { label: "Email:", value: "johndoe@gmail.com" },
  {
    label: "Password:",
    value: "*********",
  },
];

function Profile() {
  const [image, setImage] = useState(null);

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  return (
    <div className="main-content profile-content">
      <Flex className="profile-img-flex">
        <div className="profile-img">
          {image ? (
            <>
              <img src={image} alt="Uploaded" className="uploaded-img" />{" "}
              <div onClick={() => document.getElementById("fileInput").click()}>
                <FaCamera />
              </div>
            </>
          ) : (
            <>
              <img
                src="src/assets/artists/artist1.png"
                alt="Profile"
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                value={image}
              />
              <div onClick={() => document.getElementById("fileInput").click()}>
                <FaCamera />
              </div>
            </>
          )}
        </div>
        <div className="profile-img-txt">
          <h1>John Doe</h1>
        </div>
      </Flex>
      <div className="profile-info">
        {personalInfo.map((item, index) => (
          <div key={index}>
            <h5>{item.title}</h5>
            <div className="d-flex">
              <p>{item.label}</p>
              <p className="profile-value-text ">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="profile-info d-flex">
        <div style={{ width: "80%" }}>
          {security.map((item, index) => (
            <div key={index}>
              <h5>{item.title}</h5>

              <div className="d-flex">
                <p>{item.label}</p>
                <p className="profile-value-text">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <Dialog.Root>
          <Dialog.Trigger className="profile-email-btn">
            Change Email
          </Dialog.Trigger>
          <Modal title="Change Email">
            <div className="prodile-modal">
              <label>Enter current Email</label>
              <input type="text" placeholder="" />
              <label>Enter New Email</label>
              <input type="text" placeholder="" />
            </div>
            <Dialog.Close className="close-button">Change Email</Dialog.Close>
          </Modal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger className="profile-pass-btn">
            Change Password
          </Dialog.Trigger>
          <Modal title="Change Password">
            <div className="prodile-modal">
              <label>Enter current Password</label>
              <input type="text" placeholder="************" />
              <label>Enter New Password</label>
              <input type="text" placeholder="************" />
              <label>Confirm New Password</label>
              <input type="text" placeholder="************" />
            </div>
            <Dialog.Close className="close-button">
              Change Password
            </Dialog.Close>
          </Modal>
        </Dialog.Root>
      </div>
    </div>
  );
}

export default Profile;
