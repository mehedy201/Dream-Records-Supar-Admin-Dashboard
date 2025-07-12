import { useEffect, useState } from "react";
import SelectDropdown from "../../components/SelectDropdown";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import * as Tabs from "@radix-ui/react-tabs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Table from "../../components/Table";
// import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { IoEyeOutline } from "react-icons/io5";
import { Flex } from "@radix-ui/themes";
const artistColumns = [
  { label: "Username", key: "Username" },
  { label: "Email", key: "email" },
  { label: "Status", key: "status" },
  { label: "Created At", key: "date" },
  { label: "Action", key: "action" },
];
const activeColumns = [
  { label: "Username", key: "Username" },
  { label: "Email", key: "email" },
  { label: "Status", key: "status" },
  { label: "Account Created", key: "createDate" },
  { label: "Last Activation", key: "activation" },
  { label: "Action", key: "action" },
];
const suspendColumns = [
  { label: "Username", key: "Username" },
  { label: "Email", key: "email" },
  { label: "Account Created", key: "createDate" },
  { label: "Status", key: "status" },
  { label: "Suspend Date", key: "suspendDate" },
  { label: "Action", key: "action" },
];
const renderUsersCell = (key, row) => {
  if (key === "Username") {
    return (
      <div className=" artistTable-img-row">
        <img src={`src/assets/${row.img}`} alt="" />
        <p>{row.Username}</p>
      </div>
    );
  }
  if (key === "status") {
    return (
      <div className={`status ${row.status.toLowerCase()}`}>{row.status}</div>
    );
  }
  if (key === "action") {
    return (
      <Link
        to="/SingleUser"
        style={{ color: "#1C2024", textDecoration: "none" }}
        state={{ user: row }}
      >
        <IoEyeOutline style={{ width: "24px", height: "24px" }} />
      </Link>
    );
  }

  return row[key];
};
function Users({ newUsersTable, activeUsersTable, suspendUsersTable }) {
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
      {" "}
      {/* <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Users</h2> */}
      <Flex
        className="page-heading d-flex"
        style={{ justifyContent: "space-between" }}
      >
        <h2>Users</h2>
        <Link className="theme-btn" to={`/CreateUser`}>
          + Create New
        </Link>
      </Flex>
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
      <br />
      <Tabs.Root
        className="tabs-root"
        defaultValue="NewUsers"
        style={{ marginTop: 0 }}
      >
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="NewUsers"
          >
            New Users
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Active"
          >
            Active Users
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Suspended"
          >
            Suspended Users
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="tabs-content" value="NewUsers">
          <Table
            data={newUsersTable}
            columns={artistColumns}
            renderCell={renderUsersCell}
          />
          <Pagination />
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="Active">
          <Table
            data={activeUsersTable}
            columns={activeColumns}
            renderCell={renderUsersCell}
          />
          <Pagination />
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="Suspended">
          <Table
            data={suspendUsersTable}
            columns={suspendColumns}
            renderCell={renderUsersCell}
          />
          <Pagination />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
Users.propTypes = {
  newUsersTable: PropTypes.array.isRequired,
  activeUsersTable: PropTypes.array.isRequired,
  suspendUsersTable: PropTypes.array.isRequired,
};
export default Users;
