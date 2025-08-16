import { InfoCircledIcon } from "@radix-ui/react-icons";
import Pagination from "../../components/Pagination";
import "./Transaction.css";
import PropTypes from "prop-types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useParams, useSearchParams } from "react-router-dom";
import SelectDropdown from "../../components/SelectDropdown";
import axios from "axios";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import TransactionTable from "../../components/table/TransactionTable";
const transactionColumns = [
  { label: "User Name", key: "userName" },
  { label: "Email ID", key: "email" },
  { label: "Payment Method", key: "method" },
  { label: "Amount", key: "amount" },
  { label: "Date", key: "date" },
  { label: "Status", key: "status" },
  { label: "Action", key: "action" },
];

const Transaction = () => {
  const { pageNumber, perPageItem, status } = useParams();
  const { yearsList } = useSelector((state) => state.yearsAndStatus);

  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get("search") || "";
  const years = filterParams.get("years") || "";

  const filterByYear = (yearValue) => {
    navigateWithParams(`/transaction/${status}/1/${perPageItem}`, {
      search: search,
      years: yearValue,
    });
  };
  const filterByStatus = (statusValue) => {
    navigateWithParams(`/transaction/${statusValue}/1/10`, {
      search: search,
      years: years,
    });
  };

  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const [transectionData, setTransectionData] = useState();
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/admin/withdrawal-list?page=${pageNumber}&limit=${perPageItem}&status=${status}&type=Withdraw&search=${search}&years=${years}`
      )
      .then((res) => {
        setTransectionData(res.data.data);
        setFilteredCount(res.data.filteredCount);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      });
  }, [pageNumber, perPageItem, search, years]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Years and Status Dropdown______________________________________
  const dropdownItem = (
    <>
      <SelectDropdown
        options={yearsList}
        placeholder={`${years ? years : "All Time"}`}
        filterByYearAndStatus={filterByYear}
      />

      {isMobile && <br />}
      <SelectDropdown
        options={["All", "Pending", "Success", "Rejected"]}
        placeholder={status}
        filterByYearAndStatus={filterByStatus}
      />
    </>
  );

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/transaction/${status}/${page}/${perPageItem}`, {
      search: search,
      years: years,
    });
  };
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateWithParams(`/transaction/${status}/1/${perPageItem}`, {
        search: searchText,
        years: years,
      });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/transaction/${status}/${pageNumber}/${perPageItem}`, {
      search: search,
      years: years,
    });
  };


  // Withdraw page Notice_______________________________
  const [withdrawPageNotices, setWithdrawPageNotices] = useState();
  useEffect(() => {
    axios
      .get(
        "https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/withdraw-page-notice"
      )
      .then((res) => {
        setWithdrawPageNotices(res.data.data);
      });
  }, []);

  return (
    <div className="main-content">
      <h2 style={{ fontWeight: "500" }}>Transactions</h2>
      <div className="search-setion">
        <input
          onKeyPress={handleKeyPress}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search..."
        />
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
        {withdrawPageNotices &&
        withdrawPageNotices?.map((notice) => (
          <div key={notice._id} className="notice">
            <InfoCircledIcon />
            <p style={{whiteSpace: 'normal',wordBreak: 'break-word',overflowWrap: 'break-word'}} dangerouslySetInnerHTML={{ __html: notice?.notice }}></p>
          </div>
        ))}
      <TransactionTable
        columns={transactionColumns}
        data={transectionData}
        // renderCell={renderTransactionCell}
        className="transaction-table"
      />
      <Pagination
        totalDataCount={filteredCount}
        totalPages={totalPages}
        currentPage={currentPage}
        perPageItem={perPageItem}
        setCurrentPage={setCurrentPage}
        handlePageChange={handlePageChange}
        customFunDropDown={handlePerPageItem}
      />
    </div>
  );
};
export default Transaction;
Transaction.propTypes = {
  transactions: PropTypes.array.isRequired,
};
