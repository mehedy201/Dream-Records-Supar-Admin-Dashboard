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
import { Link, useParams, useSearchParams } from "react-router-dom";
import SelectDropdown from "../../components/SelectDropdown";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import useQueryParams from "../../hooks/useQueryParams";
import { useSelector } from "react-redux";
import axios from "axios";
import Pagination from "../../components/Pagination";
import LabelsTable from "../../components/table/LabelsTable";

function Labels() {
  const { yearsList, labelStatusList } = useSelector(
    (state) => state.yearsAndStatus
  );

  // Main Params ________________________________
  const { pageNumber, perPageItem, status } = useParams();
  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get("search") || "";
  const years = filterParams.get("years") || "";

  const filterByYear = (yearValue) => {
    navigateWithParams(`/labels/1/10/${status}`, {
      search: search,
      years: yearValue,
    });
  };
  const filterByStatus = (statusValue) => {
    navigateWithParams(`/labels/1/10/${statusValue}`, {
      search: search,
      years: years,
    });
  };

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
        options={yearsList}
        placeholder={`${years ? years : "All Time"}`}
        filterByYearAndStatus={filterByYear}
      />

      {isMobile && <br />}
      <SelectDropdown
        options={labelStatusList}
        placeholder={status}
        filterByYearAndStatus={filterByStatus}
      />
    </>
  );

  // Fatch Label Data _______________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [labelData, setLabelData] = useState();
  const [totalCount, setTotalCount] = useState();
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/labels?page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${search}&years=${years}`
      )
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.data);
          setLabelData(res.data.data);
          setTotalCount(res.data.totalCount);
          setFilteredCount(res.data.filteredCount);
          console.log(res.data.filteredCount);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch((er) => console.log(er));
  }, [pageNumber, perPageItem, search, years]);

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/labels/${page}/${perPageItem}/${status}`, {
      search: search,
      years: years,
    });
  };
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateWithParams(`/labels/1/${perPageItem}/${status}`, {
        search: searchText,
        years: years,
      });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/labels/${pageNumber}/${perPageItem}/${status}`, {
      search: search,
      years: years,
    });
  };

  return (
    <div className="main-content">
      {" "}
      <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Labels</h2>
      <div className="search-setion">
        <input
          onKeyDown={handleKeyPress}
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
      <LabelsTable data={labelData} />
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
}
Labels.propTypes = {
  labelsTable: PropTypes.array.isRequired,
};
export default Labels;
