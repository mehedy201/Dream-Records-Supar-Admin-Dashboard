import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { X } from "lucide-react";
import placeholderImg from "../assets/icons/upload-img.png";
import axios from "axios";
import { cdnLink } from "../hooks/cdnLink";


const ImageUpload = ({
  link,
  imgLink,
  setImgLink,
  title,
  description,
  className,
  placeholderTxt,
  setUploadedImage,
  uploadedImage,
}) => {
  const [error, setError] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleFileChange = (e) => {
    setError("");
    setUploadLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    // Check image size ___________________________________
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2 MB.");
      setUploadLoading(false);
      return;
    }
    axios
      .post(link, formData)
      .then((res) => {
        if (res.status == 200) {
          setImgLink(res.data.data.key);
          setUploadedImage(res.data.data);
          setUploadLoading(false);
        }
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="upload-container">
      <div className={`upload-box ${className || ""}`}>
        {imgLink ? (
          <div className="image-preview">
            <img src={cdnLink(imgLink)} alt="Uploaded" className="uploaded-img" />
            <button
              className="img-upload-remove-btn"
              onClick={() => deleteFile(uploadedImage.key)}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label
            style={{
              height: "256px",
              width: "256px",
              margin: "auto",
              position: "relative",
            }}
            className="upload-label"
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={placeholderImg}
                alt="upload-img"
                className="upload-icon"
              />
              <p>
                {placeholderTxt} or &nbsp;
                <span className="browse-file">Browse File</span>
              </p>
              <p style={{ color: "#BBBBBB" }}>Max. File size: 2MB</p>
            </div>
            {uploadLoading && (
              <div
                style={{
                  height: "256px",
                  width: "256px",
                  borderRadius: "10px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "black",
                  opacity: "0.5",
                }}
              ></div>
            )}
            <input
              style={{ height: "256px", width: "256px", opacity: "0" }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </label>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}
      {title && description ? (
        <>
          <div className="img-upload-info">
            <h3 style={{ fontWeight: "500" }}>{title}</h3>
            <p style={{ color: "#838383" }}>{description}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

// ✅ Add PropTypes validation
ImageUpload.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired, // Ensure onUpload is a required function
  className: PropTypes.string,
  placeholderImg: PropTypes.string,
  placeholderTxt: PropTypes.string,
};

export default ImageUpload;
