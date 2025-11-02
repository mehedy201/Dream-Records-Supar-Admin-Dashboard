import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../components/Modal";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import InvoiceUpload from "./InvoiceUpload";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import axios from "axios";
import demoUserImg from "../../../assets/artists/artist4.png";
import threeDotImg from "../../../assets/icons/vertical-threeDots.png";
import localDate from "../../../hooks/localDate";
import localTime from "../../../hooks/localTime";
import SpecificUserTransaactionTable from "../../../components/table/SpecificUserTransaactionTable";
import isEmptyArray from "../../../hooks/isEmptyArrayCheck";
import Pagination from "../../../components/Pagination";
import toast from "react-hot-toast";
import NotFoundPage from "../../../components/NotFoundPage";
import { useForm } from "react-hook-form";
import textToHTML from "../../../hooks/textToHTML";
import demoFileImg from "../../../assets/icons/upload-file.png";
import { RiDownloadLine } from "react-icons/ri";
import { X } from "lucide-react";
import { cdnLink } from "../../../hooks/cdnLink";

const transactionColumns = [
  { label: "Type", key: "type" },
  { label: "Payment Method", key: "method" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];

function SingleTransaction() {
  const { id, pageNumber, perPageItem } = useParams();
  const navigate = useNavigate();
  const [reFetch, setReFetch] = useState(1);

  const [masterUserId, setMasterUserId] = useState();
  const [withdrawData, setWithdrawData] = useState();
  const [imgKey, setImgKey] = useState();
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/single-withdrawal/${id}`
      )
      .then((res) => {
        if (res.data.status == 200) {
          const url = res?.data?.data?.photoURL
          const key = url?.split(".com/")[1];
          setImgKey(key);
          setWithdrawData(res.data.data);
          setMasterUserId(res.data.data.masterUserId);
        }
      });
  }, [id, reFetch]);

  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  // const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState();
  useEffect(() => {
    if (masterUserId) {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/${masterUserId}?page=${pageNumber}&limit=${perPageItem}`
        )
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.data);
            setPaymentDetails(res.data.data);
            if (isEmptyArray(res.data.data)) setNotFound(true);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
          }
        });
    }
  }, [masterUserId, pageNumber, perPageItem, reFetch]);

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigate(`/single-transaction/${id}/${page}/${perPageItem}`);
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigate(`/single-transaction/${id}/${pageNumber}/${perPageItem}`);
  };

  // Approved Withdrwal Status
  const handleUpdateStatusApproved = (id) => {
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/admin/approved-withdrawal-request/single/${id}`
      )
      .then((res) => {
        if (res.status == 200) {
          setReFetch(reFetch + 1);
          toast.success("Withdrawal Status Updated!");
        }
      });
  };

  // Reject Withdrwal _______________________________________________
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const rejectResoan = textToHTML(data.rejectResoan);
    const payload = { rejectResoan };
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/admin/cancle-withdrawal-request/single/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          setReFetch(reFetch + 1);
          toast.success("Withdrawal Status Updated!");
        }
      });
    console.log(rejectResoan);
    setOpen(false);
  };

  // Upload Invoice _______________________________________________________________________________________
  const [invoiceUploadErr, setInvoiceUploadErr] = useState();
  const uploadWithdrawalInvoice = (e) => {
    setInvoiceUploadErr("");
    const file = e[0];
    if (file.size > 2 * 1024 * 1024) {
      setInvoiceUploadErr("File size must be less than 2MB.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/admin/withdrawal-invoice-upload/${id}`,
        formData
      )
      .then((res) => {
        if (res.status == 200) {
          setReFetch(reFetch + 1);
          toast.success("File Uploaded");
        }
      });
  };

  // Delete Invoice _______________________________________________________________________________________
  const handleRemoveInvoice = (id) => {
    axios
      .delete(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/admin/delete-withdrawal-invoice/single/${id}`
      )
      .then((res) => {
        if (res.status == 200) {
          setReFetch(reFetch + 1);
        }
      });
  };

  return (
    <div className="main-content transaction-detail-content">
      <div>
        <div className="single-transaction-img-row">
          <div className="single-transaction-img-div">
            <img
              src={
                withdrawData?.key ? cdnLink(withdrawData?.key) : withdrawData?.photoURL ? cdnLink(imgKey) : demoUserImg
              }
              className="single-transaction-img"
              alt=""
            />
          </div>
          <div className="singleTransaction-img-txt">
            <div>
              <br />
              <span className={`status ${withdrawData?.status?.toLowerCase()}`}>
                {withdrawData?.status}
              </span>
              <h5>{withdrawData?.userName}</h5>
              <h1>&#8377; {withdrawData?.amount}</h1>
              <p>
                {localDate(withdrawData?.date)} &nbsp;&nbsp;{" "}
                {localTime(withdrawData?.date)}
              </p>
            </div>
            {withdrawData?.status === "Pending" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="dropdown-trigger singleTransaction-dropdown-btn">
                    <img src={threeDotImg} />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                  align="left"
                  side="bottom"
                  className="dropdown-content singleTransaction-dropdown-content"
                >
                  <DropdownMenu.Item
                    onClick={() =>
                      handleUpdateStatusApproved(withdrawData?._id)
                    }
                    className="dropdown-item"
                  >
                    <IoIosCheckmarkCircleOutline /> Approve Transaction
                  </DropdownMenu.Item>
                  <hr />

                  <DropdownMenu.Item
                    className="dropdown-item"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Dialog.Root open={open} onOpenChange={setOpen}>
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <textarea
                                {...register("rejectResoan", {
                                  required: true,
                                })}
                                placeholder="Enter reject description"
                                style={{
                                  width: "100%",
                                  minHeight: "100px",
                                  resize: "vertical",
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === " " || e.key === "Enter") {
                                    e.stopPropagation();
                                  }
                                }}
                              />
                              {errors.rejectResoan && (
                                <span style={{ color: "red" }}>
                                  Please enter a reject reason
                                </span>
                              )}
                              <button className="close-button" type="submit">
                                Reject
                              </button>
                            </form>
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
        {withdrawData?.status === "Rejected" && (
          <div className="notice">
            <InfoCircledIcon />
            <div
              dangerouslySetInnerHTML={{ __html: withdrawData?.rejectResoan }}
            />
          </div>
        )}
        <div className="singleTransaction-info-grid">
          <div className="singleTransaction-info-div">
            <h6>Payment Info</h6>
            {withdrawData?.bankInfo?.paymentMethod === "Bank Account" && (
              <>
                <div className="d-flex">
                  <p>Payment Method:</p>
                  <p>{withdrawData?.bankInfo?.paymentMethod}</p>
                </div>
                <div className="d-flex">
                  <p>Account Type:</p>
                  <p>{withdrawData?.bankInfo?.bankAccountType}</p>
                </div>
                <div className="d-flex">
                  <p>Beneficiary Name:</p>
                  <p>{withdrawData?.bankInfo?.account_holder_name}</p>
                </div>
                <div className="d-flex">
                  <p>Bank Name:</p>
                  <p>{withdrawData?.bankInfo?.bank_name}</p>
                </div>
                <div className="d-flex">
                  <p>Account Number:</p>
                  <p>{withdrawData?.bankInfo?.account_number}</p>
                </div>
                <div className="d-flex">
                  <p>IFSC:</p>
                  <p>{withdrawData?.bankInfo?.IFSC}</p>
                </div>
                <div className="d-flex">
                  <p>Business Entity Type:</p>
                  <p>{withdrawData?.bankInfo?.bankBusinessTypeOption}</p>
                </div>
                <div className="d-flex">
                  <p>GST Registered:</p>
                  <p>{withdrawData?.bankInfo?.isGST}</p>
                </div>
                <div className="d-flex">
                  <p>GST Number:</p>
                  <p>{withdrawData?.bankInfo?.GSTNumber}</p>
                </div>
              </>
            )}
            {!withdrawData?.bankInfo?.paymentMethod && (
              <>
                {/* <div className="d-flex">
                  <p>Payment Method:</p>
                  <p>{withdrawData?.bankInfo?.paymentMethod}</p>
                </div>
                <div className="d-flex">
                  <p>Account Type:</p>
                  <p>{withdrawData?.bankInfo?.bankAccountType}</p>
                </div> */}
                <div className="d-flex">
                  <p>Beneficiary Name:</p>
                  <p>{withdrawData?.bankInfo?.account_holder_name}</p>
                </div>
                <div className="d-flex">
                  <p>Bank Name:</p>
                  <p>{withdrawData?.bankInfo?.bank_name}</p>
                </div>
                <div className="d-flex">
                  <p>Account Number:</p>
                  <p>{withdrawData?.bankInfo?.account_number}</p>
                </div>
                <div className="d-flex">
                  <p>IFSC:</p>
                  <p>{withdrawData?.bankInfo?.IFSC}</p>
                </div>
                {/* <div className="d-flex">
                  <p>Business Entity Type:</p>
                  <p>{withdrawData?.bankInfo?.bankBusinessTypeOption}</p>
                </div>
                <div className="d-flex">
                  <p>GST Registered:</p>
                  <p>{withdrawData?.bankInfo?.isGST}</p>
                </div>
                <div className="d-flex">
                  <p>GST Number:</p>
                  <p>{withdrawData?.bankInfo?.GSTNumber}</p>
                </div> */}
              </>
            )}
          </div>
          {/* <div className="singleTransaction-invoice-div">
            <h6>Add Invoice</h6>
            {withdrawData?.invoice ? (
              <div>
                <div className="image-summary-row">
                  <img
                    src={demoFileImg}
                    style={{ transform: "rotate(3.142rad)" }}
                    alt="Preview"
                    className="image-thumb"
                  />
                  <div className="image-info">
                    <p className="file-name">
                      {withdrawData?.invoice?.fileName.length > 25
                        ? withdrawData?.invoice?.fileName.slice(0, 25) + "..."
                        : withdrawData?.invoice?.fileName}
                    </p>
                  </div>
                  <div className="image-actions">
                    <a
                      href={withdrawData?.invoice?.fileUrl}
                      download="invoice.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="icon-button">
                        <RiDownloadLine size={24} />
                      </button>
                    </a>

                    <button
                      className="icon-button"
                      onClick={() => handleRemoveInvoice(id)}
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <InvoiceUpload
                uploadWithdrawalInvoice={uploadWithdrawalInvoice}
              />
            )}
            {invoiceUploadErr && <p>{invoiceUploadErr}</p>}
          </div> */}
        </div>
      </div>

      <SpecificUserTransaactionTable
        columns={transactionColumns}
        data={paymentDetails}
      />
      {notFound && <NotFoundPage />}
      <Pagination
        totalDataCount={filteredCount}
        totalPages={totalPages}
        currentPage={currentPage}
        perPageItem={perPageItem}
        setCurrentPage={setCurrentPage}
        handlePageChange={handlePageChange}
        customFunDropDown={handlePerPageItem}
      />
    </div>
  );
}
SingleTransaction.propTypes = {
  transactionInfo: PropTypes.array.isRequired,
  transactionsHistory: PropTypes.array.isRequired,
};

export default SingleTransaction;
