import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "../../components/Table";
import { GoPencil } from "react-icons/go";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Modal from "../../components/Modal";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import { RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
import "./labels.css";
import { Link } from "react-router-dom";
import SelectDropdown from "../../components/SelectDropdown";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
const labelColumns = [
  { label: "Label Name", key: "name" },
  { label: "User Name", key: "userName" },
  { label: "User Email", key: "email" },
  { label: "Created At", key: "date" },
  { label: "Release Count", key: "count" },
  { label: "Status", key: "status" },
  { label: "Action", key: "action" },
];
const renderLabelCell = (key, row) => {
  if (key === "name") {
    return (
      <Link
        to="/single-lable"
        style={{ color: "#1C2024", textDecoration: "none" }}
        state={{ lable: row }}
        className=" artistTable-img-row"
      >
        <img src={`src/assets/${row.img}`} alt="" />
        <p>{row.name}</p>
      </Link>
    );
  }

  if (key === "status") {
    return (
      <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
    );
  }
  if (key === "action") {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="dropdown-trigger artist-dropdown-btn">
            <img src="src/assets/icons/vertical-threeDots.png" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          align="left"
          side="bottom"
          className="dropdown-content artist-dropdown-content"
        >
          <DropdownMenu.Item className="dropdown-item">
            <div>
              <RiEyeLine /> View Details
            </div>
          </DropdownMenu.Item>
          <hr />
          <DropdownMenu.Item className="dropdown-item">
            <div>
              <GoPencil /> <span>Edit Label</span>
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
                  <RiDeleteBin6Line /> <span>Delete Label</span>
                </div>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                  <Modal title="Delete label?">
                    <p className="modal-description">
                      Are you sure you want to delete this label? This action is
                      irreversible, and all associated data, including artist
                      accounts, music releases, and analytics, will be
                      permanently removed.
                    </p>
                    <br />
                    <div className="label-deleteModal-btns">
                      <Button>No</Button>
                      <Button>Yes, Delete</Button>
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
  if (
    key === "name" ||
    key === "img" ||
    key === "userName" ||
    key === "email" ||
    key === "count" ||
    key === "action" ||
    key === "date"
  ) {
    return (
      <Link
        to="/single-lable"
        style={{ color: "#1C2024", textDecoration: "none" }}
        state={{ lable: row }}
      >
        {key === "name"
          ? row.name
          : key === "userName"
          ? row.userName
          : key === "email"
          ? row.email
          : key === "date"
          ? row.date
          : key === "count"
          ? row.count
          : row.action}
      </Link>
    );
  }
  return row[key];
};
function Labels({ labelsTable }) {
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

  return (
    <div className="main-content">
      {" "}
      <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Labels</h2>
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
        data={labelsTable}
        columns={labelColumns}
        renderCell={renderLabelCell}
      />
    </div>
  );
}
Labels.propTypes = {
  labelsTable: PropTypes.array.isRequired,
};
export default Labels;
