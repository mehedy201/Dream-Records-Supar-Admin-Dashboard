import { useEffect, useState } from "react";
import Table from "../../components/Table";
import PropTypes from "prop-types";
import "./Artists.css";
import { GoPencil } from "react-icons/go";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Modal from "../../components/Modal";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import Pagination from "../../components/Pagination";
import { RiDeleteBin6Line, RiEyeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import SelectDropdown from "../../components/SelectDropdown";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
const artistColumns = [
  { label: "Artist Name", key: "artistName" },
  { label: "User Name", key: "userName" },
  { label: "User Email", key: "email" },
  { label: "Created At", key: "date" },
  { label: "Release Count", key: "count" },
  { label: "Action", key: "action" },
];
const renderArtistCell = (key, row) => {
  if (key === "artistName") {
    return (
      <Link
        to="/SingleArtist"
        style={{ color: "#1C2024", textDecoration: "none" }}
        state={{ artist: row }}
        className=" artistTable-img-row"
      >
        <img src={`src/assets/${row.img}`} alt="" />
        <p>{row.artistName}</p>
      </Link>
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
              <GoPencil /> <span>Edit Artist</span>
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
                  <RiDeleteBin6Line /> <span>Delete Artist</span>
                </div>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                  <Modal title="Delete Artist ?">
                    <p className="modal-description">
                      Are you sure you want to delete this label? This action is
                      irreversible, and all associated data, including artist
                      accounts, music releases, and analytics, will be
                      permanently removed.
                    </p>
                    <br />
                    <div className="artist-deleteModal-btns">
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
    key === "artistName" ||
    key === "userName" ||
    key === "email" ||
    key === "count" ||
    key === "date" ||
    key === "action"
  ) {
    return (
      <Link
        to="/SingleArtist"
        style={{ color: "#1C2024", textDecoration: "none" }}
        state={{ artist: row }}
      >
        {key === "artistName"
          ? row.artistName
          : key === "userName"
          ? row.userName
          : key === "email"
          ? row.email
          : key === "date"
          ? row.date
          : key === "count"
          ? row.count
          : key === "action"
          ? row.action
          : ""}
      </Link>
    );
  }
  return row[key];
};
function Artists({ artistTable }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownItem = (
    <SelectDropdown
      options={["Account", "Profile", "Settings"]}
      placeholder="All Time"
    />
  );
  return (
    <div className="main-content">
      <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Artists</h2>
      <div className="search-setion">
        <input type="text" placeholder="Search..." style={{ width: "87%" }} />
        {/* First Dropdown */}
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
        data={artistTable}
        columns={artistColumns}
        renderCell={renderArtistCell}
      />
      <Pagination />
    </div>
  );
}
Artists.propTypes = {
  artistTable: PropTypes.array.isRequired,
};
export default Artists;
