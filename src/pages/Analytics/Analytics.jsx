import "./Analytics.css";
// import ImageUpload from "../../components/ImageUpload";
import { useEffect, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Table from "../../components/Table";
import * as Dialog from "@radix-ui/react-dialog";
import { RiDeleteBin6Line, RiFileDownloadLine } from "react-icons/ri";
import Modal from "../../components/Modal";
import PropTypes from "prop-types";
import { Flex } from "@radix-ui/themes";
import SelectDropdown from "../../components/SelectDropdown";
import { RxCross2 } from "react-icons/rx";
import Pagination from "../../components/Pagination";
const artistColumns = [
  { label: "Report ID", key: "id" },
  { label: "Report Year", key: "year" },
  { label: "Report Month", key: "month" },
  { label: "Upload Date & Time", key: "uploadDateTime" },
  { label: "Action", key: "action" },
];
const renderArtistCell = (key, row) => {
  if (key === "artistName") {
    return (
      <div className=" artistTable-img-row">
        <img src={`src/assets/${row.img}`} alt="" />
        <p>{row.artistName}</p>
      </div>
    );
  }
  if (key === "action") {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="dropdown-trigger analytics-dropdown-btn">
            <img src="src/assets/icons/vertical-threeDots.png" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          align="left"
          side="bottom"
          className="dropdown-content artist-dropdown-content"
          style={{ width: "190px", left: "-200px" }}
        >
          <DropdownMenu.Item className="dropdown-item">
            <div>
              <RiFileDownloadLine /> Download Report
            </div>
          </DropdownMenu.Item>
          <hr />

          <DropdownMenu.Item
            className="dropdown-item"
            onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
          >
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <div>
                  <RiDeleteBin6Line /> <span>Delete Report</span>
                </div>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                  <Modal title="Delete Report?">
                    <p className="modal-description">
                      Are you sure you want to delete this report? This action
                      is irreversible, and you will not be able to recover the
                      deleted data.
                    </p>
                    <br />
                    <div className="analytics-deleteModal-btns">
                      <Dialog.Close>No</Dialog.Close>
                      <Dialog.Close>Yes, Delete</Dialog.Close>
                    </div>
                  </Modal>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }

  return row[key];
};
function Analytics({ analyticsTable }) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false);

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
    </>
  );

  return (
    <div className="main-content">
      <Flex className="page-heading d-flex">
        <h2>Analytics</h2>
        <Dialog.Root open={showReportModal} onOpenChange={setShowReportModal}>
          <Dialog.Trigger
            className="theme-btn"
            onClick={() => setShowReportModal(true)}
          >
            + Create New
          </Dialog.Trigger>
          <Modal title="Upload New Report" className="analytics-report-modal">
            <div className="analytics-modal-report">
              <div>
                <img src="src/assets/icons/Excel logo.png" alt="" />
              </div>
              <div>
                <p>December Report</p>
                <small>.xlsx</small>
              </div>
              <button>Replace File</button>
              <RxCross2 size={24} />
            </div>
            <label htmlFor="" className="analytics-modal-label">
              Choose Year of the Report
            </label>

            <SelectDropdown
              options={["Option 1", "Option 2", "Option 3"]}
              placeholder="Select Year"
              className="analytics-modal-dropdown"
            />
            <label htmlFor="" className="analytics-modal-label">
              Choose Month of the Report
            </label>

            <SelectDropdown
              options={["Option 1", "Option 2", "Option 3"]}
              placeholder="Select month"
              className="analytics-modal-dropdown"
            />
            <br />
            <div className="analytics-deleteModal-btns">
              <Dialog.Close>Cancel</Dialog.Close>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setShowReportSuccessModal(true);
                }}
              >
                Upload Report
              </button>
            </div>
          </Modal>
        </Dialog.Root>
        {/* Success Modal */}
        <Dialog.Root
          open={showReportSuccessModal}
          onOpenChange={setShowReportSuccessModal}
        >
          <Modal title="Report Uploaded Successfully">
            <p className="modal-description">
              Your report has been successfully uploaded. You can now review it
              in your dashboard or download a copy if needed.
            </p>

            <Dialog.Close className="modal-close-btn" style={{ width: "100%" }}>
              Close
            </Dialog.Close>
          </Modal>
        </Dialog.Root>
      </Flex>

      <div className="search-setion">
        <input type="text" placeholder="Search..." style={{ width: "87%" }} />
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
        data={analyticsTable}
        columns={artistColumns}
        renderCell={renderArtistCell}
      />
      <Pagination />
    </div>
  );
}
Analytics.propTypes = {
  analyticsTable: PropTypes.array.isRequired,
};
export default Analytics;
