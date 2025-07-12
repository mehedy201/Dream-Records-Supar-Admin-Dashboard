import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../components/Modal";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import Table from "../../../components/Table";
import InvoiceUpload from "./InvoiceUpload";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const transactionColumns = [
  { label: "Type", key: "type" },
  { label: "Payment Method", key: "method" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];

const renderTransactionCell = (key, row) => {
  if (key === "type") {
    return (
      <div className={`transactions-type ${row.type.toLowerCase()}`}>
        <img src={`src/assets/icons/${row.type}.png`} alt="" />
        <p style={{ margin: "8px 0" }}>{row.type}</p>
      </div>
    );
  }
  if (key === "method") {
    return (
      <div>
        {row.method}
        <p className="transaction-method-sample">{row.methoda_sample}</p>
      </div>
    );
  }
  if (key === "status") {
    return (
      <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
    );
  }

  return row[key];
};
function SingleTransaction({ transactionsHistory, transactionInfo }) {
  const [transactionDetail, setTransactionDetail] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.transaction) {
      setTransactionDetail(location.state.transaction);
    }
  }, [location.state]);

  return (
    <div className="main-content transaction-detail-content">
      <div>
        <div className="single-transaction-img-row">
          <div className="single-transaction-img-div">
            <img
              src="/src/assets/demo.jpg"
              className="single-transaction-img"
              alt=""
            />
          </div>
          <div className="singleTransaction-img-txt">
            <div>
              <br />
              <span
                className={`status ${transactionDetail?.status.toLowerCase()}`}
              >
                {transactionDetail?.status}
              </span>
              <h5>SBM Music</h5>
              <h1>-€1200</h1>
              <p>22 Jan 2025 &nbsp;&nbsp;01:51:40 pm</p>
            </div>
            {transactionDetail?.status === "Pending" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="dropdown-trigger singleTransaction-dropdown-btn">
                    <img src="src/assets/icons/vertical-threeDots.png" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                  align="left"
                  side="bottom"
                  className="dropdown-content singleTransaction-dropdown-content"
                >
                  <DropdownMenu.Item className="dropdown-item">
                    <IoIosCheckmarkCircleOutline /> Approve Transaction
                  </DropdownMenu.Item>
                  <hr />

                  <DropdownMenu.Item
                    className="dropdown-item"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <AiOutlineDelete />
                          Reject Transaction
                        </span>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                          <Modal title="Rejection Details">
                            <p className="modal-description">
                              Please fill the rejection details below
                            </p>
                            <p style={{ marginTop: "8px", fontSize: "14px" }}>
                              Describe issue here *{" "}
                            </p>
                            <textarea
                              name=""
                              id=""
                              placeholder="Enter reject description"
                              style={{ width: "100%" }}
                            ></textarea>
                            <Dialog.Close className="close-button">
                              Reject
                            </Dialog.Close>
                          </Modal>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </div>
        </div>
        <br />
        {transactionDetail?.status === "Rejected" && (
          <div className="notice">
            <InfoCircledIcon />
            <p>
              We are upgrading our platform to enhance your experience. You may
              notice new user interfaces appearing periodically. Thank you for
              your patience as we make these improvements.
            </p>
          </div>
        )}
        <div className="singleTransaction-info-grid">
          <div className="singleTransaction-info-div">
            <h6>Payment Info</h6>
            {transactionInfo.map((item, index) => (
              <div key={index} className="d-flex">
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="singleTransaction-invoice-div">
            <h6>Add Invoice</h6>
            <InvoiceUpload
              placeholderImg="upload-img.png"
              placeholderTxt="Drop your image here"
            />
          </div>
        </div>
      </div>

      <Table
        columns={transactionColumns}
        data={transactionsHistory}
        renderCell={renderTransactionCell}
        className="transaction-table"
      />
    </div>
  );
}
SingleTransaction.propTypes = {
  transactionInfo: PropTypes.array.isRequired,
  transactionsHistory: PropTypes.array.isRequired,
};

export default SingleTransaction;
