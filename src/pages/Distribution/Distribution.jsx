import "./Distribution.css";
// import { Theme, SegmentedControl, Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import QcApproval from "./components/QcApproval";
import InReviewPage from "./components/InReviewPage";
// import BarcodePage from "./components/BarcodePage";
import ToLivePage from "./components/ToLivePage";
import InIssuePage from "./components/InIssuePage";
import DistributionOverview from "./components/DistributionOverview";
import PropTypes from "prop-types";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Pagination from "../../components/Pagination";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";



function Distribution({ releaseItems }) {


  const navigate = useNavigate();
  const {status, pageNumber, perPageItem} = useParams();
  const { yearsList} = useSelector(state => state.yearsAndStatus);

  const location = useLocation();
  const currentPath = location.pathname;
  const pathSegments = currentPath.split('/');
  const queueSegment = pathSegments[2];


  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get('search') || '';
  const years = filterParams.get('years') || '';

  const filterByYear = (yearValue) => {
    navigateWithParams(`/distribution/queue/${status}/1/${perPageItem}`, { search: search, years: yearValue });
  }





  const [value, setValue] = useState("QCApproval");
  const [thumbStyle, setThumbStyle] = useState({ left: 0 });

  const QCApproval = useRef(null);
  const InReview = useRef(null);
  const Barcode = useRef(null);
  const ToLive = useRef(null);
  const InIssue = useRef(null);

  useEffect(() => {
    let currentBtn = null;
    if (value === "QCApproval") currentBtn = QCApproval.current;
    if (value === "InReview") currentBtn = InReview.current;
    if (value === "Barcode") currentBtn = Barcode.current;
    if (value === "ToLive") currentBtn = ToLive.current;
    if (value === "InIssue") currentBtn = InIssue.current;

    if (currentBtn) {
      const { offsetLeft, offsetWidth } = currentBtn;
      setThumbStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [value]);


    const [adminSummary, setAdminSummary] = useState();
    const [loading, setLoading] = useState(false);
    const [countForQueue, setCountForQueue] = useState();
    useEffect(() => {
      setLoading(true)
      axios.get(`http://localhost:5000/admin/api/v1/summary`)
      .then(res => {
        if(res.status === 200){
          setAdminSummary(res.data.data)
          setLoading(false)
          const dataForQueue = {
            QC_Approval: res.data.data.releaseByStatus[0].count,
            toLive: res.data.data.releaseByStatus[1].count,
            inReview: res.data.data.releaseByStatus[2].count,
            inIssues: res.data.data.releaseByStatus[3].count
          };
          setCountForQueue(dataForQueue)
        }
      })
    },[])


    // Fatch Release Data _______________________________________________
    const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
    const [filteredCount, setFilteredCount] = useState();
    const [totalPages, setTotalPages] = useState();
    const [notFound, setNotFound] = useState(false)
    const [releaseData, setReleaseData] = useState();
    useEffect(() => {
      axios.get(`http://localhost:5000/admin/api/v1/release?status=${status}&page=${pageNumber}&limit=${perPageItem}&search=${search}&years=${years}`)
      .then(res => {
        // console.log(res.data.data)
        setReleaseData(res.data.data)
        if(isEmptyArray(res.data.data))setNotFound(true)
        setFilteredCount(res.data.filteredCount);
        setTotalPages(res.data.totalPages);
      })
    },[status, pageNumber, perPageItem, search, years])

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/distribution/queue/${status}/${page}/${perPageItem}`, { search: search, years: years });
  }
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    console.log(event)
    if (event.key === 'Enter') {
      console.log('yes', searchText)
      navigateWithParams(`/distribution/queue/${status}/1/${perPageItem}`, { search: searchText, years: years });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/distribution/queue/${status}/${pageNumber}/${perPageItem}`, { search: search, years: years });
  }

    if(loading)return <LoadingScreen/>

  return (
    <div className="main-content">
      <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Distribution</h2>
      <Tabs.Root
        className="tabs-root"
        defaultValue={queueSegment ? queueSegment : "summary"}
        style={{ marginTop: 0 }}
      >
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            onClick={() => navigate(`/distribution`)}
            className="tabs-trigger distribution-tabs-trigger"
            value="summary"
          >
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => navigate(`/distribution/queue/pending/1/10`)}
            className="tabs-trigger distribution-tabs-trigger"
            value="queue"
          >
            Queue
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="tabs-content" value="summary">
          <div className="release-track-details">
            <DistributionOverview adminSummary={adminSummary} />
          </div>
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="queue">
          <div className="segmented-root">
            <div className="segmented-inner">
              <div
                className="segmented-thumb"
                style={{
                  left: `${thumbStyle.left}px`,
                  width: `${
                    value === "InIssue"
                      ? thumbStyle.width - 8
                      : thumbStyle.width
                  }px`,
                }}
              />
              <button
                ref={QCApproval}
                className={`segmented-item ${
                  status === "pending" ? "active" : ""
                }`}
                onClick={() => {setValue("QCApproval"); navigate(`/distribution/queue/pending/1/10`)}}
              >
                QC Approval {`(${countForQueue?.QC_Approval})`}
              </button>
              <button
                ref={InReview}
                className={`segmented-item ${
                  status === "review" ? "active" : ""
                }`}
                onClick={() => {setValue("InReview"); navigate(`/distribution/queue/review/1/10`)}}
              >
                In Review {`(${countForQueue?.inReview})`}
              </button>

              <button
                ref={ToLive}
                className={`segmented-item ${
                  status === "approved" ? "active" : ""
                }`}
                onClick={() => {setValue("ToLive"); navigate(`/distribution/queue/approved/1/10`) }}
              >
                To Live {`(${countForQueue?.toLive})`}
              </button>
              <button
                ref={InIssue}
                className={`segmented-item ${
                  status === "issue" ? "active" : ""
                }`}
                onClick={() => {setValue("InIssue"); navigate(`/distribution/queue/issue/1/10`)}}
              >
                In Issue {`(${countForQueue?.inIssues})`}
              </button>
            </div>

            <div className="segmented-content">
              {value === "QCApproval" && <QcApproval data={releaseData} setSearchText={setSearchText} handleKeyPress={handleKeyPress} search={search} years={years} filterByYear={filterByYear} yearsList={yearsList}/>}
              {value === "InReview" && <InReviewPage data={releaseData} setSearchText={setSearchText} handleKeyPress={handleKeyPress} search={search} years={years} filterByYear={filterByYear} yearsList={yearsList} />}
              {/* {value === "Barcode" && <BarcodePage setValue={setValue} />} */}
              {value === "ToLive" && <ToLivePage data={releaseData} setSearchText={setSearchText} handleKeyPress={handleKeyPress} search={search} years={years} filterByYear={filterByYear} yearsList={yearsList} />}
              {value === "InIssue" && <InIssuePage data={releaseData} />}

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
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
Distribution.propTypes = {
  releaseItems: PropTypes.array.isRequired,
};
export default Distribution;
