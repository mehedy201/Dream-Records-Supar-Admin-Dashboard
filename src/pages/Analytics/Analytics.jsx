import "./Analytics.css";
// import ImageUpload from "../../components/ImageUpload";
import { useEffect, useState } from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
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
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import NotFoundPage from "../../components/NotFoundPage";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import excelLogo from '../../assets/icons/Excel logo.png'
import uploadFileIcon from '../../assets/icons/upload-img.png'


const artistColumns = [
  { label: "Report ID", key: "id" },
  { label: "Report Year", key: "year" },
  { label: "Report Month", key: "month" },
  { label: "Upload Date & Time", key: "uploadDateTime" },
  { label: "Action", key: "action" },
];

const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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
        console.log(res.data.data)
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



  const [yearValue, setYearValue] = useState();
  const [monthValue, setMonthValue] = useState();
  const [yearValueError, setYearValueError] = useState('');
  const [monthValueError, setMonthValueError] = useState('');

  const [uploadedExcel, setUploadedExcel] = useState();
  const [uploadedExcelError, setUploadedExcelError] = useState();
  const [uploadLoading, setUploadLoading] = useState(false)

  const uploadExcel = (e) => {
    setUploadedExcelError('')
    setUploadLoading(true)
    const file = e[0];
    const formData = new FormData();
    formData.append('file', file);
    axios.post(`http://localhost:5000/common/api/v1/analytics-and-balance/excel-upload`, formData)
    .then(res => {
        console.log(res)
        setUploadLoading(false)
        setUploadedExcel(res.data.data)
    })
  }


  const [loadingForSubmit, setLoadingForSubmit] = useState(false);
  const uploadAnalyticsReport = () => {
    setLoadingForSubmit(true)
    setUploadedExcelError('')
    setYearValueError('')
    setMonthValueError('')
    if(!uploadedExcel){
      setUploadedExcelError('Please Select Excel File')
      return;
    }
    if(!yearValue){
      setYearValueError('Please Select Year')
      return;
    }
    if(!monthValue){
      setMonthValueError('Please Select Month')
      return;
    }
    const reportsDate = `${monthValue} ${yearValue}`
    const payloadData = {...uploadedExcel, reportsDate}
    axios.post(`http://localhost:5000/common/api/v1/analytics-and-balance`, payloadData)
    .then(res => {
        console.log(res.data.data)
        setShowReportModal(false);
        setShowReportSuccessModal(true);
        setUploadedExcel()
        setLoadingForSubmit(false)
    })
  }

  const deleteExcel = () => {
    if(!uploadedExcel) return;
    axios.delete(`http://localhost:5000/common/api/v1/analytics-and-balance/delete/excel-file?key=${uploadedExcel?.excelFileKey}`)
    .then(res => {
      if(res.status === 200){
        setUploadedExcel('')
      }
    })
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
              
              {
                !uploadedExcel && 
                <div style={{width: '100%'}}>
                <label style={{height: '60px', width: '100%', margin: 'auto', position: 'relative'}} className="upload-label">
                  <div style={{position: 'absolute', top: '50%', left: '50%', transform:'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                      <img
                          style={{margin: 'auto'}}
                          src={uploadFileIcon}
                          alt="upload-img"
                          className="upload-icon"
                      />
                    <p>
                      Drop your Excel here or
                    </p>
                    <span className="browse-file">Browse File</span>
                    {/* <p style={{ color: "#BBBBBB" }}>Max. File size: 50MB</p> */}
                  </div>
                  {
                    uploadLoading &&
                    <div style={{height: '60px', width: '100%', borderRadius: '10px', position: 'absolute', top: '50%', left: '50%', transform:'translate(-50%, -50%)', backgroundColor: 'black', opacity: '0.5'}}></div>
                  }
                  <input style={{height: '60px', width: '100%', opacity: '0'}} type="file" accept=".xls, .xlsx" id="fileInput" name='image' onChange={e => uploadExcel(e.target.files)} />
                </label>
                </div>
              }
              {
                uploadedExcel &&
                <>
                  <div>
                    <img src={excelLogo} alt="" />
                  </div>
                  <div>
                    <p>{uploadedExcel?.excelFileName}</p>
                    <small>.xlsx</small>
                  </div>
                  <button onClick={() => deleteExcel()} >Replace File</button>
                  <RxCross2 onClick={() => deleteExcel()} size={24} />
                </>
              }
            </div>
            {
              uploadedExcelError && <p style={{color: 'red'}}>{uploadedExcelError}</p>
            }
            <label htmlFor="" className="analytics-modal-label">
              Choose Year of the Report
            </label>

            <Select.Root onValueChange={value => setYearValue(value)}>
              <Select.Trigger className={`dropdown-trigger analytics-modal-dropdown`}>
                <Select.Value placeholder={ "Select an Years"} />
                <Select.Icon className="select-icon">
                  <ChevronDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="dropdown-content"
                  style={{ padding: 0, overflowY: "auto", zIndex: "123" }}
                >
                  <Select.Viewport>
                  {
                    yearsList.map(year => 
                      <Select.Item value={year} className="select-item">
                        <Select.ItemText>{year}</Select.ItemText>
                        <Select.ItemIndicator className="select-item-indicator">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  }
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            {
              yearValueError && <p style={{color: 'red'}}>{yearValueError}</p>
            }


            <label htmlFor="" className="analytics-modal-label">
              Choose Month of the Report
            </label>

            <Select.Root onValueChange={value => setMonthValue(value)}>
              <Select.Trigger className={`dropdown-trigger analytics-modal-dropdown`}>
                <Select.Value placeholder={ "Select Months"} />
                <Select.Icon className="select-icon">
                  <ChevronDown />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="dropdown-content"
                  style={{ padding: 0, overflowY: "auto", zIndex: "123" }}
                >
                  <Select.Viewport>
                  {
                    monthList.map(month => 
                      <Select.Item value={month} className="select-item">
                        <Select.ItemText>{month}</Select.ItemText>
                        <Select.ItemIndicator className="select-item-indicator">
                          <Check size={18} />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  }
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            {
              monthValueError && <p style={{color: 'red'}}>{monthValueError}</p>
            }
            <br />
            {
              loadingForSubmit && <p>Loading......</p>
            }
            <div className="analytics-deleteModal-btns">
              <Dialog.Close>Cancel</Dialog.Close>
              <button
                onClick={uploadAnalyticsReport}
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
