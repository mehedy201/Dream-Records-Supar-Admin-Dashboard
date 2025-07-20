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
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import AnalyticsTable from "../../components/table/AnalyticsTable";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import NotFoundPage from "../../components/NotFoundPage";

const artistColumns = [
  { label: "Report ID", key: "id" },
  { label: "Report Year", key: "year" },
  { label: "Report Month", key: "month" },
  { label: "Upload Date & Time", key: "uploadDateTime" },
  { label: "Action", key: "action" },
];

function Analytics() {

  const {pageNumber, perPageItem} = useParams();
  const { yearsList} = useSelector(state => state.yearsAndStatus);


  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get('search') || '';
  const years = filterParams.get('years') || '';

  const filterByYear = (yearValue) => {
    navigateWithParams(`/analytics/1/${perPageItem}`, { search: search, years: yearValue });
  }



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
        options={yearsList}
        placeholder={`${years ? years : 'All Time'}`}
        filterByYearAndStatus={filterByYear}
      />
    </>
  );

  // Fatch Release Data _______________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [notFound, setNotFound] = useState(false)
  const [analyticsData, setAnalyticsData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    axios.get(`http://localhost:5000/common/api/v1/analytics-and-balance/all-analytics?page=${pageNumber}&limit=${perPageItem}&search=${search}&years=${years}`)
    .then(res => {
      if(res.status === 200){
        setAnalyticsData(res.data.data)
        if(isEmptyArray(res.data.data))setNotFound(true)
          setFilteredCount(res.data.filteredCount);
        setTotalPages(res.data.totalPages);
        setLoading(false)
      }
    })
  },[pageNumber, perPageItem, search, years])

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/analytics/${page}/${perPageItem}`, { search: search, years: years });
  }
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigateWithParams(`/analytics/1/${perPageItem}`, { search: searchText, years: years });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/analytics/${pageNumber}/${perPageItem}`, { search: search, years: years });
  }

  if(loading)return <LoadingScreen/>

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
        <input onKeyPress={handleKeyPress} defaultValue={search} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..." style={{ width: "87%" }} />
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
      
      <AnalyticsTable
        data={analyticsData}
        columns={artistColumns}
      />
      {
        notFound && <NotFoundPage/>
      }
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
Analytics.propTypes = {
  analyticsTable: PropTypes.array.isRequired,
};
export default Analytics;
