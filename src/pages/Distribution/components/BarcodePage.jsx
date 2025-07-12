import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Pagination from "../../../components/Pagination";
import Table from "../../../components/Table";
import { QCApprovalTable } from "../../../data";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuImageDown } from "react-icons/lu";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SelectDropdown from "../../../components/SelectDropdown";
const artistColumns = [
  { label: "Release", key: "releaseName" },
  { label: "User Name", key: "userName" },
  { label: "User Email", key: "email" },
  { label: "Label", key: "label" },
  { label: "UPC", key: "upc" },
  { label: "Created At", key: "date" },
  { label: "Action", key: "action" },
];
function BarcodePage({ setValue }) {
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

  const renderQCApprovalCell = (key, row) => {
    if (key === "releaseName") {
      return (
        <Link
          to="/single-release"
          style={{ color: "#1C2024", textDecoration: "none" }}
          state={{ release: row }}
          className=" artistTable-img-row"
        >
          <img
            src={`src/assets/${row.img}`}
            alt=""
            style={{ borderRadius: "6px" }}
          />
          <p>
            {row.releaseName.length > 22
              ? row.releaseName.slice(0, 22) + "..."
              : row.releaseName}
          </p>
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
            className="dropdown-content qcApproval-dropdown-content"
          >
            <DropdownMenu.Item className="dropdown-item">
              <div>
                <LuImageDown /> Download Artwork
              </div>
            </DropdownMenu.Item>
            <hr />
            <DropdownMenu.Item className="dropdown-item">
              <div onClick={() => setValue("ToLive")}>
                <FiArrowRight /> <span>Go Live</span>
              </div>
            </DropdownMenu.Item>
            <hr />
            <DropdownMenu.Item className="dropdown-item">
              <div onClick={() => setValue("InReview")}>
                <FiArrowLeft /> <span>Move to review</span>
              </div>
            </DropdownMenu.Item>
            <hr />
            <DropdownMenu.Item className="dropdown-item">
              <div>
                <RiDeleteBin6Line /> <span>Reject Release</span>
              </div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      );
    }
    if (
      key === "userName" ||
      key === "email" ||
      key === "label" ||
      key === "upc" ||
      key === "date"
    ) {
      return (
        <Link
          to="/single-release"
          style={{ color: "#1C2024", textDecoration: "none" }}
          state={{ release: row }}
        >
          {key === "userName"
            ? row.userName
            : key === "email"
            ? row.email
            : key === "label"
            ? row.label
            : key === "upc"
            ? row.upc
            : key === "date"
            ? row.date
            : key === "action"
            ? row.action
            : ""}
        </Link>
      );
    }
    return row[key];
  };
  return (
    <div>
      <div className="search-setion">
        <input type="text" placeholder="Search..." style={{ width: "85%" }} />
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
        data={QCApprovalTable}
        columns={artistColumns}
        renderCell={renderQCApprovalCell}
      />
      <Pagination />
    </div>
  );
}
BarcodePage.propTypes = {
  setValue: PropTypes.func.isRequired,
};
export default BarcodePage;
