import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { GoLinkExternal, GoPencil } from "react-icons/go";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../components/Modal";

import * as Tabs from "@radix-ui/react-tabs";
import "../Users.css";
import PropTypes from "prop-types";
import ArtistCard from "../../../components/ArtistCard";
import SelectDropdown from "../../../components/SelectDropdown";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { LablesItems } from "../../../data";
import Table from "../../../components/Table";
import { FaRegCheckCircle } from "react-icons/fa";
const personalInfo = [
  { title: "User Info:" },
  { label: "First Name:", value: "Joe" },
  { label: "Last Name:", value: "Aadil" },
  { label: "Email:", value: "johndoe@gmail.com" },
  { label: "Phone:", value: "+91 8001134466" },
  { label: "Created Date & Time:", value: "31 Jan 2025, 12:45 PM" },
  { label: "Last Active:", value: "31 Jan 2025, 12:45 PM" },
];
const userAddress = [
  { title: "Address" },
  { label: "Address Line 1:", value: "H.No 10 Ward No. Jharpuri Road Dungeja" },
  { label: "Address Line 2:", value: "Pinanagwan, Punhana, Nuh" },
  { label: "Postal Code:", value: "122508" },
  { label: "City:", value: "Gurgaon" },
  { label: "State:", value: "Haryana" },
  { label: "Country:", value: "India" },
];
const userLAbelInfo = [
  { title: "Label Info" },
  { label: "Channel Name:", value: "AKMDigital" },
  {
    label: "Channel URL:",
    value:
      "https://open.spotify.com/?flow_ctx=7aa5a067-6601-4e29-9794-07af35e39eee%3A1738420603",
  },
  { label: "Subscriber Count:", value: "124616956" },
  { label: "Videos Count:", value: "92357" },
];
const transactionColumns = [
  { label: "Type", key: "type" },
  { label: "Payment Method", key: "method" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];
const renderTransactionCell = (key, row) => {
  if (key === "type") {
    return (
      <div className={`transactions-type ${row.type.toLowerCase()}`}>
        <img src={`src/assets/icons/${row.type}.png`} alt="" />
        <p style={{ margin: "8px 0" }}>{row.type}</p>
      </div>
    );
  }
  if (key === "method") {
    return (
      <div>
        {row.method}
        <p className="transaction-method-sample">{row.methoda_sample}</p>
      </div>
    );
  }
  if (key === "status") {
    return (
      <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
    );
  }

  return row[key];
};
function SingleUser({ transactionsHistory, artistsItems }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
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
  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  return (
    <div className="main-content single-user-content">
      <Flex className="singleUser-img-div">
        <div className="singleLabel-image-div">
          <img src="src/assets/avatar.png" className="singleLabel-image" />
        </div>
        <div className="singleUser-img-txt">
          <br />
          <div>
            <span
              className={`card-type-txt status ${user?.status.toLowerCase()}`}
            >
              {user?.status}
            </span>

            <h1>Arpita Modak</h1>
            <h4>ArpitaModak</h4>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="dropdown-trigger singleLabel-dropdown-btn">
                <img src="src/assets/icons/vertical-threeDots.png" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="left"
              side="bottom"
              className="dropdown-content singleUser-dropdown-content"
            >
              <DropdownMenu.Item className="dropdown-item">
                <Link
                  to="/Edit-User"
                  style={{
                    cursor: "pointer",
                    color: "#202020",
                    textDecoration: "none",
                  }}
                >
                  <GoPencil /> Edit User Details
                </Link>
              </DropdownMenu.Item>
              <hr />

              {user?.status === "SUSPENDED" ? (
                <DropdownMenu.Item
                  className="dropdown-item"
                  onSelect={(e) => e.preventDefault()}
                  style={{ color: "rgba(0,113,63,0.87)" }}
                >
                  <FaRegCheckCircle /> Active User
                </DropdownMenu.Item>
              ) : (
                <>
                  <DropdownMenu.Item className="dropdown-item">
                    <Link
                      to="/edit-lable"
                      style={{
                        cursor: "pointer",
                        color: "#202020",
                        textDecoration: "none",
                      }}
                    >
                      <GoLinkExternal />
                      Open Account
                    </Link>
                  </DropdownMenu.Item>
                  <hr />

                  <DropdownMenu.Item
                    className="dropdown-item"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <span>
                          <AiOutlineDelete />
                          Suspend User
                        </span>
                      </Dialog.Trigger>
                      <Dialog.Portal>
                        <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                          <Modal title="Provide Suspend Details">
                            <p className="modal-description">
                              Please Provide Suspend Details Below
                            </p>
                            <label
                              htmlFor=""
                              style={{
                                fontSize: "12px",
                                marginBottom: "8px",
                                display: "block",
                              }}
                            >
                              Describe suspend reason here
                            </label>
                            <textarea
                              name=""
                              id=""
                              placeholder="Write reason here"
                              style={{ width: "100%" }}
                            ></textarea>
                            <Dialog.DialogClose
                              className="theme-btn"
                              style={{ width: "100%", margin: "16px 0 0 0" }}
                            >
                              Suspend
                            </Dialog.DialogClose>
                          </Modal>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </DropdownMenu.Item>
                </>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </Flex>
      {user?.status === "SUSPENDED" && (
        <>
          <div className="notice" style={{ fontSize: "12px", marginBottom: 0 }}>
            <InfoCircledIcon />
            <p>
              We are upgrading our platform to enhance your experience. You may
              notice new user interfaces appearing periodically. Thank you for
              your patience as we make these improvements.
            </p>
          </div>
        </>
      )}
      <div className="singleUser-grid">
        <div className="user-info">
          {personalInfo.map((item, index) => (
            <div key={index}>
              <h5>{item.title}</h5>
              <div className="d-flex">
                <p>{item.label}</p>
                <p className="user-value-text ">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="user-info">
          {userAddress.map((item, index) => (
            <div key={index}>
              <h5>{item.title}</h5>
              <div className="d-flex">
                <p>{item.label}</p>
                <p className="user-value-text ">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="user-info">
          {userLAbelInfo.map((item, index) => (
            <div key={index}>
              <h5>{item.title}</h5>
              <div className="d-flex">
                <p>{item.label}</p>
                <p className="user-value-text ">
                  {item.label === "Channel URL:" ? (
                    <a href={item.value}>{item.value.slice(0, 50) + "..."}</a>
                  ) : (
                    item.value
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="user-download-row">
          <div className="user-info">
            <h5 style={{ marginBottom: "10px" }}>Documents</h5>
            <span
              className="user-downloadRow-label"
              style={{ fontSize: "14px" }}
            >
              Government ID
            </span>
            <div className="d-flex">
              <div className="user-info-download-div">
                <p>Front Page.PDF</p>
                <button>Download</button>
              </div>
              <div className="user-info-download-div">
                <p>Front Page.PDF</p>
                <button>Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs.Root className="tabs-root" defaultValue="Artists">
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Artists"
          >
            Artists
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Labels"
          >
            Labels
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Transactions"
          >
            Transactions
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="tabs-content" value="Artists">
          <div className="search-setion">
            <input
              type="text"
              placeholder="Search..."
              style={{ width: "87%" }}
            />
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
          {user && user.status === "PENDING" ? (
            <br />
          ) : (
            <ArtistCard artistsItems={artistsItems} />
          )}
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="Labels">
          <div className="search-setion">
            <input
              type="text"
              placeholder="Search..."
              style={{ width: "87%" }}
            />
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
          <div className="lables-container">
            {LablesItems.map((item, index) => (
              <Link
                to="/single-lable"
                state={{ lable: item }}
                key={index}
                className="lables-card"
              >
                <img
                  src={`src/assets/lables/${item.img}`}
                  alt={`src/assets/lables/${item.img}`}
                />
                <Flex style={{ display: "flex" }}>
                  <div
                    className="card-type-txt"
                    style={
                      item.type == "Reject"
                        ? { background: "#FEEBEC", color: "#E5484D" }
                        : item.type == "Pending"
                        ? { background: "#FFEBD8", color: "#FFA552" }
                        : { background: "#E6F6EB", color: "#2B9A66" }
                    }
                  >
                    {item.type}
                  </div>
                  <div className="card-date-txt">{item.date}</div>
                </Flex>
                <p style={{ fontWeight: "500" }}>{item.name}</p>
              </Link>
            ))}
          </div>
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="Transactions">
          <br />
          <div className="signleUser-transaction-div">
            <p>Total Balance</p>
            <h3>€ 0.00</h3>
          </div>
          <Table
            columns={transactionColumns}
            data={transactionsHistory}
            renderCell={renderTransactionCell}
            className="transaction-table"
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
SingleUser.SingleUser = {
  artistsItems: PropTypes.array.isRequired,
  transactionsHistory: PropTypes.array.isRequired,
};
export default SingleUser;
