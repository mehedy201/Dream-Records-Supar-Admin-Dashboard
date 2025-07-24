import PropTypes from "prop-types";
import inputImg from '../../../assets/icons/upload-img.png'

const InvoiceUpload = ({
  uploadWithdrawalInvoice,
}) => {
  

  return (
    <div
      className="invoice-upload-container"
      onDragOver={(e) => e.preventDefault()}
    >
      <div>

          <div className={`invoice-upload-box`}>
            <label className="upload-label">
              <img
                src={inputImg}
                alt="upload-icon"
                className="upload-icon"
              />
              <p>
                Drop Invoice here or &nbsp;
                <span className="browse-file">Browse File</span>
              </p>
              <p style={{ color: "#BBBBBB", margin: 0 }}>Max. File size: 2MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>uploadWithdrawalInvoice(e.target.files)}
                hidden
                className="file-input"
              />
            </label>
          </div>
      </div>
    </div>
  );
};

InvoiceUpload.propTypes = {
  uploadWithdrawalInvoice: PropTypes.func,
};

export default InvoiceUpload;
