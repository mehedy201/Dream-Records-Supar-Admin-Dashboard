import { useState } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { RiDownloadLine } from "react-icons/ri";

const InvoiceUpload = ({
  title,
  description,
  onUpload,
  className,
  placeholderImg,
  placeholderTxt,
}) => {
  const [image, setImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
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
    setUploadedFile(file);
    if (onUpload) onUpload(file);
  };

  const handleRemove = () => {
    setImage(null);
    setUploadedFile(null);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = image;
    a.download = uploadedFile?.name || "download";
    a.click();
  };

  return (
    <div
      className="invoice-upload-container"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div>
        <div className={`invoice-upload-box ${className || ""}`}>
          <label className="upload-label">
            <img
              src={`src/assets/icons/${placeholderImg}`}
              alt="upload-icon"
              className="upload-icon"
            />
            <p>
              {placeholderTxt} or &nbsp;
              <span className="browse-file">Browse File</span>
            </p>
            <p style={{ color: "#BBBBBB", margin: 0 }}>Max. File size: 2MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
              className="file-input"
            />
          </label>
        </div>
        {image && (
          <>
            <div className="image-summary-row">
              <img src={image} alt="Preview" className="image-thumb" />
              <div className="image-info">
                <p className="file-name">
                  {uploadedFile.name.length > 25
                    ? uploadedFile.name.slice(0, 25) + "..."
                    : uploadedFile.name}
                </p>
                <p className="file-type">{uploadedFile?.type}</p>
              </div>
              <div className="image-actions">
                <button className="icon-button" onClick={handleDownload}>
                  <RiDownloadLine size={24} />
                </button>
                <button className="icon-button" onClick={handleRemove}>
                  <X size={24} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      {title && description && (
        <div className="img-upload-info">
          <h3 style={{ fontWeight: "500" }}>{title}</h3>
          <p style={{ color: "#838383" }}>{description}</p>
        </div>
      )}
    </div>
  );
};

InvoiceUpload.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholderImg: PropTypes.string,
  placeholderTxt: PropTypes.string,
};

export default InvoiceUpload;
