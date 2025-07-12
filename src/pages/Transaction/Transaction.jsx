// import { Flex } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Pagination from "../../components/Pagination";
import "./Transaction.css";
// import * as Dialog from "@radix-ui/react-dialog";
// import Modal from "../../components/Modal";
import Table from "../../components/Table";
import PropTypes from "prop-types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SelectDropdown from "../../components/SelectDropdown";
const transactionColumns = [
  { label: "User Name", key: "userName" },
  { label: "Email ID", key: "email" },
  { label: "Payment Method", key: "method" },
  { label: "Amount", key: "amount" },
  { label: "Date", key: "date" },
  { label: "Status", key: "status" },
  { label: "Action", key: "action" },
];

const renderTransactionCell = (key, row) => {
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
const Transaction = ({ transactions }) => {
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
  const ProcessTransaction = transactions.map((item) => ({
    ...item,
    action:
      item.action === "view_icon" ? (
        <Link to="/single-transaction" state={{ transaction: item }}>
          <IoEyeOutline
            style={{ width: "24px", height: "24px", color: "#838383" }}
          />
        </Link>
      ) : (
        item.action
      ),
  }));
  return (
    <div className="main-content">
      <h2 style={{ fontWeight: "500" }}>Transactions</h2>
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
      <br />
      <div className="notice">
        <InfoCircledIcon />
        <p>
          You can withdraw your earnings during the withdrawal periods in
          February, May, August, and November.
        </p>
      </div>
      <Table
        columns={transactionColumns}
        data={ProcessTransaction}
        renderCell={renderTransactionCell}
        className="transaction-table"
      />
      <Pagination />
    </div>
  );
};
export default Transaction;
Transaction.propTypes = {
  transactions: PropTypes.array.isRequired,
};
