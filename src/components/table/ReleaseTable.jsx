import releasePlaceHolderImg from "../../assets/release-placeholder.png";
import threeDots from "../../assets/icons/vertical-threeDots.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Select from "@radix-ui/react-select";
import { Dialog } from "radix-ui";
import { LuImageDown } from "react-icons/lu";
import { FiArrowRight } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import localDate from "../../hooks/localDate";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { Check, ChevronDown } from "lucide-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FaCheck } from "react-icons/fa";
import textToHTML from "../../hooks/textToHTML";

const ReleaseTable = ({ columns = [], data }) => {
  /// Change Status and Reject Function____________________________________
  // _____________________________________________________________________
  // Move to Review Releae Function___________________________________
  const { userData } = useSelector((state) => state.userData);

  const [releaseRejectionsList, setReleaseRejectionsList] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/release-rejections-list`
      )
      .then((res) => {
        if (res.status == 200) {
          setReleaseRejectionsList(res.data.data);
        }
      });
  }, []);

  const moveToReview = (id) => {
    const payload = {
      status: "Review",
      reviewAdminInfo: {
        adminEmail: userData?.email,
        adminUserName: userData?.userName,
        adminId: userData?._id,
        updatedAt: new Date().toISOString(),
      },
    };
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-status/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          window.location.reload();
        }
      });
  };
  // Move to Live Releae Function___________________________________
  const moveToLive = (id) => {
    const payload = {
      status: "Live",
      liveAdminInfo: {
        adminEmail: userData?.email,
        adminUserName: userData?.userName,
        adminId: userData?._id,
        updatedAt: new Date().toISOString(),
      },
    };
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-status/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          window.location.reload();
        }
      });
  };

  // Reject Releae Function___________________________________
  const [rejectType, setRejectType] = useState();
  const [errorRejectType, setErrorRejectType] = useState("");
  const [rejectInputText, setRejectInputText] = useState("");
  const [errorRejectInputText, setErrorRejectInputText] = useState();
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [rejectedReasonErr, setRejectedReasonErr] = useState("");
  const closeRef = useRef(null);
  const rejectRelease = (id) => {
    setErrorRejectType("");
    setErrorRejectInputText("");
    setRejectedReasonErr("");
    if (!rejectType) {
      setErrorRejectType("Please Select Type");
      return;
    }
    if (!rejectInputText) {
      setErrorRejectInputText("Reject reason required");
      return;
    }
    if (selectedReasons.length === 0) {
      setRejectedReasonErr("At least one reason is required");
      return;
    }

    const actionRequired = textToHTML(rejectInputText);
    let actionReqHistory = Array.isArray(data?.actionReqHistory)
      ? [...data.actionReqHistory]
      : [];
    actionReqHistory.push(actionRequired);

    let payload = {};
    if (rejectType === "Action Required") {
      payload = {
        status: rejectType,
        actionRequired,
        rejectionReasons: selectedReasons,
        actionRequiredAdminInfo: {
          adminEmail: userData?.email,
          adminUserName: userData?.userName,
          adminId: userData?._id,
          updatedAt: new Date().toISOString(),
        },
      };
    } else if (rejectType === "Takedown") {
      payload = {
        status: rejectType,
        actionRequired,
        rejectionReasons: selectedReasons,
        takedownAdminInfo: {
          adminEmail: userData?.email,
          adminUserName: userData?.userName,
          adminId: userData?._id,
          updatedAt: new Date().toISOString(),
        },
      };
    } else if (rejectType === "Blocked") {
      payload = {
        status: rejectType,
        actionRequired,
        rejectionReasons: selectedReasons,
        blockedAdminInfo: {
          adminEmail: userData?.email,
          adminUserName: userData?.userName,
          adminId: userData?._id,
          updatedAt: new Date().toISOString(),
        },
      };
    } else if (rejectType === "Suspend") {
      payload = {
        status: rejectType,
        actionRequired,
        rejectionReasons: selectedReasons,
        suspendAdminInfo: {
          adminEmail: userData?.email,
          adminUserName: userData?.userName,
          adminId: userData?._id,
          updatedAt: new Date().toISOString(),
        },
      };
    } else if (rejectType === "Error") {
      payload = {
        status: rejectType,
        actionRequired,
        rejectionReasons: selectedReasons,
        errorAdminInfo: {
          adminEmail: userData?.email,
          adminUserName: userData?.userName,
          adminId: userData?._id,
          updatedAt: new Date().toISOString(),
        },
      };
    }

    console.log(data);

    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-status/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          window.location.reload();
          closeRef.current?.click(); // close modal
        }
      });
  };

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  return (
    <div className="table-wrapper">
      <table className="theme-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d?._id}>
              <td>
                <Link
                  to={`/release/${d?._id}`}
                  style={{ color: "#1C2024", textDecoration: "none" }}
                  className="artistTable-img-row"
                >
                  <img
                    src={d?.imgUrl ? d.imgUrl : releasePlaceHolderImg}
                    alt=""
                    style={{ borderRadius: "6px" }}
                  />
                  <p>
                    {d?.releaseTitle?.length > 22
                      ? d?.releaseTitle.slice(0, 22) + "..."
                      : d?.releaseTitle}
                  </p>
                </Link>
              </td>
              <td>{d?.userName}</td>
              <td>{d?.labels?.map((label) => label.labelName)}</td>
              <td>{d?.UPC ? d.UPC : "--"}</td>
              <td>{localDate(d?.date)}</td>
              <td>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="dropdown-trigger artist-dropdown-btn">
                      <img src={threeDots} />
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content
                    align="left"
                    side="bottom"
                    className="dropdown-content qcApproval-dropdown-content"
                  >
                    <DropdownMenu.Item className="dropdown-item">
                      <div>
                        <a
                          href={d?.imgUrl}
                          download={`${d?.imgUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <LuImageDown /> Download Artwork
                        </a>
                      </div>
                    </DropdownMenu.Item>
                    <hr />
                    <DropdownMenu.Item className="dropdown-item">
                      <div>
                        {d?.status === "QC Approval" && (
                          <>
                            <FiArrowRight />{" "}
                            <span onClick={() => moveToReview(d._id)}>
                              Move to Review
                            </span>
                          </>
                        )}
                        {d?.status === "Review" && (
                          <>
                            <FiArrowRight />{" "}
                            <span onClick={() => moveToLive(d._id)}>
                              Move to Live
                            </span>
                          </>
                        )}
                      </div>
                    </DropdownMenu.Item>
                    <hr />
                    <DropdownMenu.Item
                      className="dropdown-item"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Dialog.Root>
                        <Dialog.Trigger
                          style={{
                            width: "100%",
                            background: "none",
                            border: "none",
                            padding: 0,
                          }}
                          className="dropdown-item"
                        >
                          <RiDeleteBin6Line /> <span>Reject Release</span>
                        </Dialog.Trigger>
                        <Modal title="Reject Release">
                          <div className="singleRelease-reject-modal">
                            <p className="modal-description">
                              Please fix the issue indicated below and then
                              don’t forget to re-submit your release for
                              distribution.
                            </p>
                            <label
                              className="singleRelease-modal-label"
                              htmlFor=""
                            >
                              Reject Type
                            </label>
                            <Select.Root
                              onValueChange={(value) => {
                                setRejectType(value);
                                setErrorRejectType("");
                              }}
                            >
                              <Select.Trigger
                                className={`dropdown-trigger analytics-modal-dropdown`}
                              >
                                <Select.Value
                                  placeholder={"Select Reject Type"}
                                />
                                <Select.Icon className="select-icon">
                                  <ChevronDown />
                                </Select.Icon>
                              </Select.Trigger>
                              <Select.Portal>
                                <Select.Content
                                  className="dropdown-content"
                                  style={{
                                    padding: 0,
                                    overflowY: "auto",
                                    zIndex: "123",
                                  }}
                                >
                                  <Select.Viewport>
                                    <Select.Item
                                      value="Action Required"
                                      className="select-item"
                                    >
                                      <Select.ItemText>
                                        Action Required
                                      </Select.ItemText>
                                      <Select.ItemIndicator className="select-item-indicator">
                                        <Check size={18} />
                                      </Select.ItemIndicator>
                                    </Select.Item>
                                    <Select.Item
                                      value="Takedown"
                                      className="select-item"
                                    >
                                      <Select.ItemText>
                                        Takedown
                                      </Select.ItemText>
                                      <Select.ItemIndicator className="select-item-indicator">
                                        <Check size={18} />
                                      </Select.ItemIndicator>
                                    </Select.Item>
                                    <Select.Item
                                      value="Blocked"
                                      className="select-item"
                                    >
                                      <Select.ItemText>Blocked</Select.ItemText>
                                      <Select.ItemIndicator className="select-item-indicator">
                                        <Check size={18} />
                                      </Select.ItemIndicator>
                                    </Select.Item>
                                  </Select.Viewport>
                                </Select.Content>
                              </Select.Portal>
                            </Select.Root>
                            {errorRejectType && (
                              <p style={{ color: "red" }}>{errorRejectType}</p>
                            )}

                            <p>Rejected Reasons</p>
                            {releaseRejectionsList?.map((option) => {
                              const isChecked = selectedReasons.includes(
                                option.option
                              );
                              return (
                                <div
                                  key={option._id}
                                  style={{
                                    display: "flex",
                                    gap: "5px",
                                    alignItems: "center",
                                  }}
                                  className="checkbox-container"
                                >
                                  <Checkbox.Root
                                    id={option._id}
                                    className="CheckboxRoot"
                                    checked={isChecked}
                                    onCheckedChange={() => {
                                      toggleReason(option.option);
                                      setRejectedReasonErr("");
                                    }}
                                  >
                                    <Checkbox.Indicator className="CheckboxIndicator">
                                      <FaCheck />
                                    </Checkbox.Indicator>
                                  </Checkbox.Root>
                                  <label
                                    htmlFor={option._id}
                                    className="checkbox-label"
                                  >
                                    {option.option}
                                  </label>
                                </div>
                              );
                            })}

                            {rejectedReasonErr && (
                              <p style={{ color: "red" }}>
                                {rejectedReasonErr}
                              </p>
                            )}

                            <label
                              className="singleRelease-modal-label"
                              htmlFor=""
                            >
                              Describe issue here *
                            </label>
                            <textarea
                              placeholder="Write your issue here"
                              style={{ width: "100%" }}
                              value={rejectInputText}
                              onChange={(e) => {
                                setRejectInputText(e.target.value);
                                setErrorRejectInputText("");
                              }}
                              onKeyDown={(e) => e.stopPropagation()}
                            ></textarea>
                            {errorRejectInputText && (
                              <p style={{ color: "red" }}>
                                {errorRejectInputText}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => rejectRelease(d._id)}
                            className="close-button"
                          >
                            Reject
                          </button>

                          {/* Hidden Dialog.Close for programmatic close */}
                          <Dialog.Close asChild>
                            <button
                              ref={closeRef}
                              style={{ display: "none" }}
                            />
                          </Dialog.Close>
                        </Modal>
                      </Dialog.Root>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReleaseTable;
