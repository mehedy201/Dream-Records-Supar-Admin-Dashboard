import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "../../../components/Modal";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import PropTypes from "prop-types";
import Table from "../../../components/Table";
import { IoEyeOutline } from "react-icons/io5";
import CheckBox from "../../../components/CheckBox";
import SelectDropdown from "../../../components/SelectDropdown";
const WhiteListColumns = [
  { label: "Release", key: "release" },
  { label: "User Name", key: "username" },
  { label: "Whitelist Link", key: "url" },
  { label: "Created At", key: "date" },
  { label: "Status", key: "status" },
  { label: "Action", key: "reason" },
];
function Whitelist({
  Release_Claim,

  renderReleaseCell,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownItem = (
    <>
      <SelectDropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="All time"
      />

      {isMobile && <br />}
      <SelectDropdown
        options={["Option 1", "Option 2", "Option 3"]}
        placeholder="All Releases"
      />
    </>
  );
  const ProcessWhitelist = Release_Claim.map((item, index) => ({
    ...item,
    reason:
      item.reason === "info_icon" ? (
        <Dialog.Root key={index}>
          <Dialog.Trigger className="serviceRequest-view-trigger">
            <IoEyeOutline style={{ width: "24px", height: "24px" }} />
          </Dialog.Trigger>
          <Modal title="White List" className="serviceRequest-modal-content">
            <div className="serviceRequest-tableModal-info">
              <div className="d-flex">
                <p>Type:</p>
                <p>Instagram</p>
              </div>
              <div className="d-flex">
                <p>Choose Label:</p>
                <p>Arpita Modak</p>
              </div>
              <div className="serviceRequest-track-div">
                <p>Track 1</p>
                <div className="d-flex">
                  <p>Tittle:</p>
                  <p>{item.release}</p>
                </div>
                <div className="d-flex">
                  <p>UPC:</p>
                  <p>{item.release_sample}</p>
                </div>
              </div>
              <div className="serviceRequest-track-div">
                <p>Track 2</p>
                <div className="d-flex">
                  <p>Tittle:</p>
                  <p>{item.release}</p>
                </div>
                <div className="d-flex">
                  <p>UPC:</p>
                  <p>{item.release_sample}</p>
                </div>
              </div>
              <div className="serviceRequest-track-div">
                <p>Track 3</p>
                <div className="d-flex">
                  <p>Tittle:</p>
                  <p>{item.release}</p>
                </div>
                <div className="d-flex">
                  <p>UPC:</p>
                  <p>{item.release_sample}</p>
                </div>
              </div>
              <div className="serviceRequest-track-div">
                <p>Track 4</p>
                <div className="d-flex">
                  <p>Tittle:</p>
                  <p>{item.release}</p>
                </div>
                <div className="d-flex">
                  <p>UPC:</p>
                  <p>{item.release_sample}</p>
                </div>
              </div>
              <div className="serviceRequest-track-div">
                <p>Track 5</p>
                <div className="d-flex">
                  <p>Tittle:</p>
                  <p>{item.release}</p>
                </div>
                <div className="d-flex">
                  <p>UPC:</p>
                  <p>{item.release_sample}</p>
                </div>
              </div>

              <div className="d-flex">
                <p>Give the link to whitelist</p>
                <p>
                  {item.url.length > 30
                    ? item.url.slice(0, 30) + "..."
                    : item.url}
                </p>
              </div>
              <p>Change Status: </p>

              <SelectDropdown
                className="serviceRequest-modal-dropdown"
                options={["Rejected", "Approve", "Settings"]}
                placeholder={item.status}
              />
              {item.status === "REJECTED" ? (
                <>
                  <br />
                  <CheckBox
                    label="Reason 1"
                    fromPage="serviceRequestPage"
                    defaultChecked={true}
                  />
                  <CheckBox
                    label="Reason 2"
                    fromPage="serviceRequestPage"
                    defaultChecked={true}
                  />
                  <CheckBox
                    label="Reason 3"
                    fromPage="serviceRequestPage"
                    defaultChecked={true}
                  />
                  <CheckBox
                    label="Reason 4"
                    fromPage="serviceRequestPage"
                    defaultChecked={true}
                  />
                  <CheckBox
                    label="Reason 5"
                    fromPage="serviceRequestPage"
                    defaultChecked={true}
                  />
                  <p style={{ marginTop: "8px" }}>Reject Reason: </p>
                  <textarea
                    name=""
                    id=""
                    placeholder="Enter reject description"
                    style={{ width: "100%" }}
                  ></textarea>
                  <p
                    className="messageBox-time"
                    style={{ paddingRight: 0, marginBottom: 0 }}
                  >
                    21 Jan 2025, 19:25
                  </p>
                </>
              ) : (
                <br />
              )}
              <Dialog.Close className="close-button">Submit</Dialog.Close>
            </div>
          </Modal>
        </Dialog.Root>
      ) : (
        item.reason
      ),
  }));
  return (
    <div>
      <div className="search-setion">
        <input type="text" placeholder="Search..." />
        {isMobile ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="dropdown-trigger"
                style={{
                  width: "56px",
                  justifyContent: "center",
                  marginRight: "0",
                }}
              >
                <HiOutlineAdjustmentsHorizontal
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="center"
              side="bottom"
              className="dropdown-content"
            >
              {dropdownItem}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          dropdownItem
        )}
      </div>
      <Table
        columns={WhiteListColumns}
        data={ProcessWhitelist}
        renderCell={renderReleaseCell}
      />
    </div>
  );
}
Whitelist.propTypes = {
  modalReleaseDropdown1: PropTypes.bool.isRequired,
  setModalReleaseDropdown1: PropTypes.func.isRequired,
  Release_Claim: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,
  selectedOption1: PropTypes.bool.isRequired,
  setSelectedOption1: PropTypes.func.isRequired,
  selectedOption2: PropTypes.bool.isRequired,
  setSelectedOption2: PropTypes.func.isRequired,
  artistsItems: PropTypes.array.isRequired,
};
export default Whitelist;
