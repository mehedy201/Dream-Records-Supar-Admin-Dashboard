// import { TextArea } from "@radix-ui/themes";
import ImageUpload from "../../../components/ImageUpload";
// import Social from "../../../components/Social";
import PropTypes from "prop-types";
import { useState } from "react";

function EditLable({ labelSocialItems }) {
  const [labelSocialUrl, setLabelSocialUrl] = useState(labelSocialItems);

  const handleInputChange = (index, newUrl) => {
    const updatedItems = [...labelSocialUrl];
    updatedItems[index].url = newUrl;
    setLabelSocialUrl(updatedItems);
    localStorage.setItem("labelSocialUrl", JSON.stringify(updatedItems));
  };
  return (
    <div className="main-content">
      <div className="artist-editImg-div">
        {" "}
        <ImageUpload
          title="Label Image"
          description="This will be displayed on label profile"
          placeholderImg="upload-img.png"
          placeholderTxt="Drop your image here"
        />
      </div>
      <div className="editLable-info">
        <h4>Basic Information</h4>
        <label>Label name</label>
        <input type="text" />
      </div>
      <br />

      <div className="singleLable-social-div" style={{ marginLeft: 0 }}>
        <h4>Label Profiles</h4>
        {labelSocialUrl.map((item, index) => (
          <div key={index} className="add-atrist">
            <div style={{ margin: "auto" }}>
              {" "}
              <img src={`src/assets/social/${item.img}`} alt={item.name} />
            </div>
            <input
              type="text"
              placeholder={item.placeholder}
              className="social-input"
              value={item.url}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="imgUpload-save-btn">Save</button>
    </div>
  );
}
EditLable.propTypes = {
  labelSocialItems: PropTypes.array.isRequired,
};
export default EditLable;
