import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { X } from "lucide-react";

const ImageUpload = ({
  title,
  description,
  onUpload,
  className,
  placeholderImg,
  placeholderTxt,
}) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) validateAndSetImage(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) validateAndSetImage(file);
  };

  const validateAndSetImage = (file) => {
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      return;
    }
    setError("");
    setImage(URL.createObjectURL(file));
    if (onUpload) onUpload(file);
  };

  return (
    <div
      className="upload-container"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className={`upload-box ${className || ""}`}>
        {image ? (
          <div className="image-preview">
            <img src={image} alt="Uploaded" className="uploaded-img" />
            <button
              className="img-upload-remove-btn"
              onClick={() => setImage(null)}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="upload-label">
            <div>
              <img
                src={`src/assets/icons/${placeholderImg}`}
                alt="upload-img"
                className="upload-icon"
              />
              <p>
                {placeholderTxt} or &nbsp;
                <span className="browse-file">Browse File</span>
              </p>
              <p style={{ color: "#BBBBBB" }}>Max. File size: 2MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
                className="file-input"
              />
            </div>
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
