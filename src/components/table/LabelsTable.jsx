import releasePlaceHolderImg from "../../assets/release-placeholder.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
import localDate from "../../hooks/localDate";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import threeDotImg from "../../assets/icons/vertical-threeDots.png";
import { GoPencil } from "react-icons/go";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRef, useState } from "react";
import FormSubmitLoading from "../FormSubmitLoading";
import { cdnLink } from "../../hooks/cdnLink";

const LabelsTable = ({ data }) => {
  const closeRef = useRef(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  // Delete Label________________________
  const deleteLabel = (id, imgKey) => {
    setDeleteLoading(true);
    axios
      .delete(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/delete-labels/${id}?imgKey=${imgKey}`
      )
      .then((res) => {
        if (res.status == 200) {
          setDeleteLoading(false);
          closeRef.current?.click();
          window.location.reload();
        } else {
          setDeleteLoading(false);
        }
      })
      .catch((er) => console.log(er));
  };

  const navigate = useNavigate();
  return (
    <div className="table-wrapper">
      <table className="theme-table">
        <thead>
          <tr>
            <th>Label Name</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d?._id}>
              <td>
                <Link
                  to={`/labels/${d._id}/1/10/All`}
                  style={{ color: "#1C2024", textDecoration: "none" }}
                  className="artistTable-img-row"
                >
                  <img
                    src={d?.key ? cdnLink(d?.key) : releasePlaceHolderImg}
                    alt=""
                    style={{ borderRadius: "50%" }}
                  />
                  <p>{d?.labelName}</p>
                </Link>
              </td>
              <td>{d?.userName}</td>
              <td>{d?.email ? d?.email : "--"}</td>
              <td>{d?.date ? localDate(d?.date) : "--"}</td>
              <td>
                <span className={`status ${d.status.toLowerCase()}`}>
                  {d.status}
                </span>
              </td>
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
                    <DropdownMenu.Item
                      onClick={() => navigate(`/labels/${d._id}/1/10/All`)}
                      className="dropdown-item"
                    >
                      <div>
                        <RiEyeLine /> View Details
                      </div>
                    </DropdownMenu.Item>
                    <hr style={{ margin: 0 }} />

                    <DropdownMenu.Item
                      onClick={() => navigate(`/edit-label/${d._id}`)}
                      className="dropdown-item"
                    >
                      <div>
                        <GoPencil /> Edit Details
                      </div>
                    </DropdownMenu.Item>
                    <hr style={{ margin: 0 }} />
                    {/* <DropdownMenu.Item
                      className="dropdown-item"
                      onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
                    >
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <div>
                            <RiDeleteBin6Line /> <span>Delete Label</span>
                          </div>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="dialog-overlay" />
                          <Dialog.Content className="dialog-content">
                            <Modal title="Delete label?">
                              <p className="modal-description">
                                Are you sure you want to delete this label? This
                                action is irreversible, and all associated data,
                                including artist accounts, music releases, and
                                analytics, will be permanently removed.
                              </p>
                              <br />
                              {
                                deleteLoading && <FormSubmitLoading /> // Show loading while deleting
                              }
                              <div className="label-deleteModal-btns">
                                <Button
                                  onClick={() => closeRef.current?.click()}
                                >
                                  No
                                </Button>
                                <Button
                                  onClick={() => deleteLabel(d._id, d.key)}
                                >
                                  Yes, Delete
                                </Button>
                              </div>
                              <Dialog.Close asChild>
                                <button
                                  ref={closeRef}
                                  style={{ display: "none" }}
                                />
                              </Dialog.Close>
                            </Modal>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    </DropdownMenu.Item> */}
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

export default LabelsTable;
