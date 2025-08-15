import releasePlaceHolderImg from "../../assets/release-placeholder.png";
import threeDots from "../../assets/icons/vertical-threeDots.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Select from "@radix-ui/react-select";
import { Dialog } from "radix-ui";
import { LuImageDown } from "react-icons/lu";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
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
import ReleaseStatusSuspendForm from "../FormForUpdateStatus/ReleaseStatusSuspendForm";
import { useForm } from "react-hook-form";
import threeDotImg from "../../assets/icons/vertical-threeDots.png";

const ReleaseTable = ({ columns = [], data }) => {
  /// Change Status and Reject Function____________________________________
  // _____________________________________________________________________
  const { userData } = useSelector((state) => state.userData);
  // Move to QC Approval Function____________________________________
  const moveToQC = (id) => {
    const payload = {
      status: "QC Approval",
      qcApprovalAdminInfo: {
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

  // Move to Review Releae Function_______________________________________
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

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Move to Live form submit handler
  const onMoveToLiveSubmit = (formData, id) => {
    const payload = {
      status: "Live",
      liveAdminInfo: {
        adminEmail: userData?.email,
        adminUserName: userData?.userName,
        adminId: userData?._id,
        updatedAt: new Date().toISOString(),
      },
      UPC: formData.upc,
      ISRC: formData.isrc,
    };

    // Send to backend
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-status/${id}`,
        payload
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });

    reset();
    closeRef.current?.click();
  };

  const closeRef = useRef(null);

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
                    <button
                      className="dropdown-trigger singleArtist-dropdown-btn"
                      style={{ marginRight: 0 }}
                    >
                      <img src={threeDotImg} />
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
                    <hr style={{ margin: 0 }} />
                    {(d?.status === "Review" ||
                      d?.status === "Blocked" ||
                      d?.status === "Error" ||
                      d?.status === "Takedown") && (
                      <DropdownMenu.Item
                        onClick={() => moveToQC(d?._id)}
                        className="dropdown-item"
                      >
                        <div>
                          <FiArrowLeft style={{ color: "black" }} />
                          <span>Move to QC Approval</span>
                        </div>
                      </DropdownMenu.Item>
                    )}
                    {(d?.status === "QC Approval" || d?.status === "Live") && (
                      <DropdownMenu.Item
                        onClick={() => moveToReview(d?._id)}
                        className="dropdown-item"
                      >
                        <div>
                          {d?.status === "QC Approval" ? (
                            <FiArrowRight style={{ color: "black" }} />
                          ) : (
                            <FiArrowLeft style={{ color: "black" }} />
                          )}
                          <span>Move to Review</span>
                        </div>
                      </DropdownMenu.Item>
                    )}
                    {(d?.status === "Review") && (
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
                            {d?.status === "Review" ? (
                              <FiArrowRight style={{ color: "black" }} />
                            ) : (
                              <FiArrowLeft style={{ color: "black" }} />
                            )}
                            <span style={{ color: "black" }}>Move to Live</span>
                          </Dialog.Trigger>
                          <Modal title="Move to Live">
                            <div className="singleRelease-reject-modal">
                              <form
                                onSubmit={handleSubmit((formData) =>
                                  onMoveToLiveSubmit(formData, d._id)
                                )}
                              >
                                <div className="singleRelease-reject-modal">
                                  <label>
                                    UPC:
                                    <input
                                      {...register("upc", {
                                        required: "UPC is required",
                                      })}
                                      defaultValue={d?.UPC}
                                      style={{ width: "100%", marginBottom: 8 }}
                                    />
                                    {errors.upc && (
                                      <span style={{ color: "red" }}>
                                        {errors.upc.message}
                                      </span>
                                    )}
                                  </label>
                                  {d?.tracks?.map((track, idx) => (
                                    <label
                                      key={track._id || idx}
                                      style={{
                                        display: "block",
                                        marginTop: 12,
                                      }}
                                    >
                                      ISRC for Track {idx + 1} (
                                      {track.tittle || "Untitled"}):
                                      <input
                                        {...register(`isrc.${idx}`, {
                                          required: "ISRC is required",
                                        })}
                                        defaultValue={track.ISRC}
                                        style={{
                                          width: "100%",
                                          marginBottom: 4,
                                        }}
                                      />
                                      {errors.isrc && errors.isrc[idx] && (
                                        <span style={{ color: "red" }}>
                                          {errors.isrc[idx].message}
                                        </span>
                                      )}
                                    </label>
                                  ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "20px",
                                  }}
                                >
                                  <Dialog.Close asChild>
                                    <button
                                      type="button"
                                      style={{
                                        padding: "10px 20px",
                                        borderRadius: "6px",
                                        border: "1px solid red",
                                      }}
                                      onClick={() => reset()}
                                    >
                                      Cancel
                                    </button>
                                  </Dialog.Close>
                                  <button type="submit" className="theme-btn">
                                    Move to Live
                                  </button>
                                </div>
                              </form>
                            </div>

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
                    )}
                    <hr style={{ margin: 0 }} />

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
                          {/* Reject Release Componets start_______________________ */}
                          {/* _____________________________________________________ */}

                          <ReleaseStatusSuspendForm
                            id={d?._id}
                            closeRef={closeRef}
                            releaseData={d}
                          />

                          {/* Reject Release Componets End_______________________ */}
                          {/* _____________________________________________________ */}

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
