// import "./ServiceRequest.css";
// import * as Tabs from "@radix-ui/react-tabs";
// import { useEffect, useState } from "react";
// import Pagination from "../../components/Pagination";

// import PropTypes from "prop-types";
// import ReleaseClaim from "./components/ReleaseClaim";
// import ContentID from "./components/ContentID";
// import ClaimVideo from "./components/ClaimVideo";
// import BlockedVideo from "./components/BlockedVideo";
// import OAC from "./components/OAC";
// import ProfileLinking from "./components/ProfileLinking";
// import Whitelist from "./components/Whitelist";
// import { InfoCircledIcon } from "@radix-ui/react-icons";
// import { useParams, useSearchParams } from "react-router-dom";
// import useQueryParams from "../../hooks/useQueryParams";
// import isEmptyArray from "../../hooks/isEmptyArrayCheck";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// const releaseColumns = [
//   { label: "Release", key: "release" },
//   { label: "User Name", key: "username" },
//   { label: "Type", key: "type" },
//   { label: "URL", key: "url" },
//   { label: "Created At", key: "date" },
//   { label: "Status", key: "status" },
//   { label: "Reason", key: "reason" },
// ];

// const renderReleaseCell = (key, row) => {
//   if (key === "release") {
//     return (
//       <div className="release-table-img-td">
//         <img src={`src/assets/${row.img}`} alt="" />
//         <div>
//           <p>{row.release}</p>
//           <small>UPC: {row.release_sample}</small>
//         </div>
//       </div>
//     );
//   }
//   if (key === "url") {
//     return row.url.length > 22 ? row.url.slice(0, 22) + "..." : row.url;
//   }
//   if (key === "username") {
//     return <span>{row.username ? row.username.replace(/\s/g, "") : ""}</span>;
//   }
//   if (key === "status") {
//     return (
//       <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
//     );
//   }

//   return row[key];
// };

// const ServiceRequest = ({ artistsItems, Release_Claim }) => {
//   const [selectedOption1, setSelectedOption1] = useState(false);
//   const [modalReleaseDropdown1, setModalReleaseDropdown1] = useState(false);



//   const { reFetchServiceRequest } = useSelector(state => state.reFetchSlice);
//   const dispatch = useDispatch();
//   const {pageNumber, perPageItem, status, request} = useParams();


//    // Filter Query Paramitars_____________________
//   const { navigateWithParams } = useQueryParams();
//   const [filterParams] = useSearchParams();
//   const search = filterParams.get('search') || '';
//   const years = filterParams.get('years') || '';

//   const filterByYear = (yearValue) => {
//     navigateWithParams(`/service-request/${request}/1/10/${status}`, { search: search, years: yearValue });
//   }
//   const filterByStatus = (statusValue) => {
//     navigateWithParams(`/service-request/${request}/1/10/${statusValue}`, { search: search, years: years });
//   }


//   const modifyRequest = (request) => {
//     if (request.includes("-")) {
//         return request.replace("-", " ");
//     }
//     return request;
//   }

//   // Fatch Service Request Data _______________________________________________
//   const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
//   const [filteredCount, setFilteredCount] = useState();
//   const [totalPages, setTotalPages] = useState();
//   const [loading, setLoading] = useState(false);
//   const [serviceCount, setServiceCount] = useState();
//   const [notFound, setNotFound] = useState(false)
//   useEffect(() => {
//     setLoading(true)
//     // All Service Request Count _______________________
//     axios.get(`http://localhost:5000/common/api/v1/claim-release/admin-get-all-service-request-count`)
//     .then(res => {
//       if(res.status === 200){
//         setServiceCount(res.data.data)
//       }
//     })
//     axios.get(`http://localhost:5000/common/api/v1/claim-release/all-claim/?type=${request}&page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${search}&years=${years}`)
//     .then(res => {
//         if(res.status === 200){
//           dispatch(setServiceRequestData(res.data.data))
//           if(isEmptyArray(res.data.data))setNotFound(true)
//           setFilteredCount(res.data.filteredCount);
//           setTotalPages(res.data.totalPages);
//           setLoading(false)
//         }
//     })
//     setLoading(false)
//   },[pageNumber, perPageItem, years, search, reFetchServiceRequest])

//   // Search _____________________________________________
//   const [searchText, setSearchText] = useState();
//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       navigateWithParams(`/service-request/${request}/1/${perPageItem}/${status}`, { search: searchText, years: years });
//     }
//   };






//   return (
//     <div className="main-content" style={{ position: "relative" }}>
//       <div className="notice">
//         <InfoCircledIcon />
//         <p>
//           We are upgrading our platform to enhance your experience. You may
//           notice new user interfaces appearing periodically. Thank you for your
//           patience as we make these improvements.
//         </p>
//       </div>
//       <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Service Request</h2>
//       <Tabs.Root className="tabs-root" defaultValue="Release Claim">
//         <Tabs.List className="tabs-list">
//           <Tabs.Trigger className="tabs-trigger" value="Release Claim">
//             Release Claim
//             <div className="tabs-notification">
//               <p>4</p>
//             </div>
//           </Tabs.Trigger>
//           <Tabs.Trigger className="tabs-trigger" value="Content ID">
//             Content ID
//             <div className="tabs-notification">
//               <p>4</p>
//             </div>
//           </Tabs.Trigger>
//           <Tabs.Trigger className="tabs-trigger" value="Claim Video">
//             Claim Video
//             <div className="tabs-notification">
//               <p>4</p>
//             </div>
//           </Tabs.Trigger>
//           <Tabs.Trigger className="tabs-trigger" value="Blocked Video">
//             Blocked Video
//             <div className="tabs-notification">
//               <p>4</p>
//             </div>
//           </Tabs.Trigger>
//           <Tabs.Trigger className="tabs-trigger" value="OAC">
//             OAC
//             <div className="tabs-notification">
//               <p>4</p>
//             </div>
//           </Tabs.Trigger>
//           <Tabs.Trigger className="tabs-trigger" value="Profile Linking">
//             Profile Linking{" "}
//             <div className="tabs-notification">
//               <p>4</p>
//             </div>
//           </Tabs.Trigger>
//           <Tabs.Trigger className="tabs-trigger" value="Whitelist">
//             Whitelist{" "}
//             <div className="tabs-notification">
//               <p>4</p>
//             </div>
//           </Tabs.Trigger>
//         </Tabs.List>

//         <div className="tabs-content">
//           <Tabs.Content className="tab-panel" value="Release Claim">
//             <ReleaseClaim
//               years={years}
//               notFound={notFound}
//               filterByYear={filterByYear}
//               filterByStatus={filterByStatus}
//               handleKeyPress={handleKeyPress}
//               setSearchText={setSearchText}
//             />
//           </Tabs.Content>

//           <Tabs.Content className="tab-panel" value="Content ID">
//             <ContentID
//               Release_Claim={Release_Claim}
//               renderReleaseCell={renderReleaseCell}
//               setModalReleaseDropdown1={setModalReleaseDropdown1}
//               modalReleaseDropdown1={modalReleaseDropdown1}
//             />
//           </Tabs.Content>

//           <Tabs.Content className="tab-panel" value="Claim Video">
//             <ClaimVideo
//               Release_Claim={Release_Claim}
//               setModalReleaseDropdown1={setModalReleaseDropdown1}
//               renderReleaseCell={renderReleaseCell}
//               modalReleaseDropdown1={modalReleaseDropdown1}
//             />
//           </Tabs.Content>
//           <Tabs.Content className="tab-panel" value="Blocked Video">
//             <BlockedVideo
//               Release_Claim={Release_Claim}
//               setModalReleaseDropdown1={setModalReleaseDropdown1}
//               renderReleaseCell={renderReleaseCell}
//               modalReleaseDropdown1={modalReleaseDropdown1}
//             />
//           </Tabs.Content>
//           <Tabs.Content className="tab-panel" value="OAC">
//             <OAC
//               Release_Claim={Release_Claim}
//               setSelectedOption1={setSelectedOption1}
//               selectedOption1={selectedOption1}
//               setModalReleaseDropdown1={setModalReleaseDropdown1}
//               renderReleaseCell={renderReleaseCell}
//               modalReleaseDropdown1={modalReleaseDropdown1}
//               artistsItems={artistsItems}
//             />
//           </Tabs.Content>
//           <Tabs.Content className="tab-panel" value="Profile Linking">
//             <ProfileLinking
//               Release_Claim={Release_Claim}
//               setModalReleaseDropdown1={setModalReleaseDropdown1}
//               renderReleaseCell={renderReleaseCell}
//               modalReleaseDropdown1={modalReleaseDropdown1}
//               artistsItems={artistsItems}
//             />
//           </Tabs.Content>
//           <Tabs.Content className="tab-panel" value="Whitelist">
//             <Whitelist
//               Release_Claim={Release_Claim}
//               setModalReleaseDropdown1={setModalReleaseDropdown1}
//               renderReleaseCell={renderReleaseCell}
//               modalReleaseDropdown1={modalReleaseDropdown1}
//               artistsItems={artistsItems}
//             />
//           </Tabs.Content>
//         </div>
//       </Tabs.Root>
//       <Pagination />
//     </div>
//   );
// };
// ServiceRequest.propTypes = {
//   artistsItems: PropTypes.array.isRequired, // Ensure artistsItems is an array
//   Release_Claim: PropTypes.array.isRequired, // Ensure artistsItems is an array
// };
// export default ServiceRequest;


import "./ServiceRequest.css";
import * as Tabs from "@radix-ui/react-tabs";
import Pagination from "../../components/Pagination";

import PropTypes from "prop-types";
import ReleaseClaim from "./components/ReleaseClaim";
import ContentID from "./components/ContentID";
import ClaimVideo from "./components/ClaimVideo";
import BlockedVideo from "./components/BlockedVideo";
import OAC from "./components/OAC";
import ProfileLinking from "./components/ProfileLinking";
import Whitelist from "./components/Whitelist";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setServiceRequestData } from "../../redux/features/serviceRequestPageDataHandleSlice/serviceRequestPageDataHandleSlice";
import useQueryParams from "../../hooks/useQueryParams";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import LoadingScreen from "../../components/LoadingScreen";
const releaseColumns = [
  { label: "Release", key: "release" },
  { label: "Type", key: "type" },
  { label: "URL", key: "url" },
  { label: "Created At", key: "date" },
  { label: "Status", key: "status" },
  { label: "Reason", key: "reason" },
];

// const renderReleaseCell = (key, row) => {
//   if (key === "release") {
//     return (
//       <div className="release-table-img-td">
//         <img src={`src/assets/${row.img}`} alt="" />
//         <div>
//           <p>{row.release}</p>
//           <small>UPC: {row.release_sample}</small>
//         </div>
//       </div>
//     );
//   }
//   if (key === "url") {
//     return row.url.length > 22 ? row.url.slice(0, 22) + "..." : row.url;
//   }
//   if (key === "status") {
//     return (
//       <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
//     );
//   }

//   return row[key];
// };

const ServiceRequest = () => {

  // const {userNameIdRoll} = useSelector((state) => state.userData);
  const { reFetchServiceRequest } = useSelector(state => state.reFetchSlice);
  const dispatch = useDispatch();
  const {pageNumber, perPageItem, status, request} = useParams();
  const navigate = useNavigate();

   // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get('search') || '';
  const years = filterParams.get('years') || '';

  const filterByYear = (yearValue) => {
    navigateWithParams(`/service-request/${request}/1/10/${status}`, { search: search, years: yearValue });
  }
  const filterByStatus = (statusValue) => {
    navigateWithParams(`/service-request/${request}/1/10/${statusValue}`, { search: search, years: years });
  }


  const modifyRequest = (request) => {
    if (request.includes("-")) {
        return request.replace("-", " ");
    }
    return request;
  }

  // Fatch Service Request Data _______________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const [serviceCount, setServiceCount] = useState();
  const [notFound, setNotFound] = useState(false)
  useEffect(() => {
    setLoading(true)
    // All Service Request Count _______________________
    axios.get(`http://localhost:5000/common/api/v1/claim-release/admin-get-all-service-request-count`)
    .then(res => {
      if(res.status === 200){
        setServiceCount(res.data.data)
        setLoading(false)
      }
    })
    axios.get(`http://localhost:5000/common/api/v1/claim-release/all-claim/?type=${request}&page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${search}&years=${years}`)
    .then(res => {
        if(res.status === 200){
          console.log(res.data.data)
          dispatch(setServiceRequestData(res.data.data))
          if(isEmptyArray(res.data.data)){
            setNotFound(true)
          }else{
            setNotFound(false)
          }
          setFilteredCount(res.data.filteredCount);
          setTotalPages(res.data.totalPages);
          setLoading(false)
        }
    })
  },[pageNumber, perPageItem, years, search, reFetchServiceRequest])

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/service-request/${request}/${page}/${perPageItem}/${status}`, { search: search, years: years });
  }
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigateWithParams(`/service-request/${request}/1/${perPageItem}/${status}`, { search: searchText, years: years });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    console.log('object')
    navigateWithParams(`/service-request/${request}/${pageNumber}/${perPageItem}/${status}`, { search: search, years: years });
  }

 if(loading){
  return <LoadingScreen/>
 }

  return (
    <div className="main-content" style={{ position: "relative" }}>
      <Tabs.Root
        className="tabs-root"
        defaultValue={modifyRequest(request)}
        style={{ marginTop: "85px" }}
      >
        <Tabs.List className="tabs-list">
          <Tabs.Trigger onClick={() => navigate('/service-request/Release-Claim/1/10/All')} className="tabs-trigger" value="Release Claim">
            Release Claim
            <div className="tabs-notification">
              <p>{serviceCount?.ReleaseClaim}</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger onClick={() => navigate('/service-request/Content-ID/1/10/All')} className="tabs-trigger" value="Content ID">
            Content ID
            <div className="tabs-notification">
              <p>{serviceCount?.ContentID}</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger onClick={() => navigate('/service-request/Claim-Video/1/10/All')} className="tabs-trigger" value="Claim Video">
            Claim Video
            <div className="tabs-notification">
              <p>{serviceCount?.ClaimVideo}</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger onClick={() => navigate('/service-request/Blocked-Video/1/10/All')} className="tabs-trigger" value="Blocked Video">
            Blocked Video
            <div className="tabs-notification">
              <p>{serviceCount?.BlockedVideo}</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger onClick={() => navigate('/service-request/OAC/1/10/All')} className="tabs-trigger" value="OAC">
            OAC
            <div className="tabs-notification">
              <p>{serviceCount?.OAC}</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger onClick={() => navigate('/service-request/Profile-Linking/1/10/All')} className="tabs-trigger" value="Profile Linking">
            Profile Linking{" "}
            <div className="tabs-notification">
              <p>{serviceCount?.ProfileLinking}</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger onClick={() => navigate('/service-request/Whitelist/1/10/All')} className="tabs-trigger" value="Whitelist">
            Whitelist{" "}
            <div className="tabs-notification">
              <p>{serviceCount?.Whitelist}</p>
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        <div className="tabs-content">
          <Tabs.Content className="tab-panel" value="Release Claim">
            <ReleaseClaim
              years={years}
              notFound={notFound}
              filterByYear={filterByYear}
              filterByStatus={filterByStatus}
              handleKeyPress={handleKeyPress}
              setSearchText={setSearchText}
            />
          </Tabs.Content>

          <Tabs.Content className="tab-panel" value="Content ID">
            <ContentID
              years={years}
              notFound={notFound}
              // renderReleaseCell={renderReleaseCell}
              filterByYear={filterByYear}
              filterByStatus={filterByStatus}
              handleKeyPress={handleKeyPress}
              setSearchText={setSearchText}
            />
          </Tabs.Content>

          <Tabs.Content className="tab-panel" value="Claim Video">
            <ClaimVideo
              years={years}
              notFound={notFound}
              // renderReleaseCell={renderReleaseCell}
              filterByYear={filterByYear}
              filterByStatus={filterByStatus}
              handleKeyPress={handleKeyPress}
              setSearchText={setSearchText}
            />
          </Tabs.Content>
          <Tabs.Content className="tab-panel" value="Blocked Video">
            <BlockedVideo
              years={years}
              notFound={notFound}
              // renderReleaseCell={renderReleaseCell}
              filterByYear={filterByYear}
              filterByStatus={filterByStatus}
              handleKeyPress={handleKeyPress}
              setSearchText={setSearchText}
            />
          </Tabs.Content>
          <Tabs.Content className="tab-panel" value="OAC">
            <OAC
              years={years}
              notFound={notFound}
              // renderReleaseCell={renderReleaseCell}
              filterByYear={filterByYear}
              filterByStatus={filterByStatus}
              handleKeyPress={handleKeyPress}
              setSearchText={setSearchText}
            />
          </Tabs.Content>
          <Tabs.Content className="tab-panel" value="Profile Linking">
            <ProfileLinking
              years={years}
              notFound={notFound}
              // renderReleaseCell={renderReleaseCell}
              filterByYear={filterByYear}
              filterByStatus={filterByStatus}
              handleKeyPress={handleKeyPress}
              setSearchText={setSearchText}
            />
          </Tabs.Content>
          <Tabs.Content className="tab-panel" value="Whitelist">
            <Whitelist
              years={years}
              notFound={notFound}
              // renderReleaseCell={renderReleaseCell}
              filterByYear={filterByYear}
              filterByStatus={filterByStatus}
              handleKeyPress={handleKeyPress}
              setSearchText={setSearchText}
            />
          </Tabs.Content>
        </div>
      </Tabs.Root>
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
ServiceRequest.propTypes = {
  artistsItems: PropTypes.array.isRequired, // Ensure artistsItems is an array
  Release_Claim: PropTypes.array.isRequired, // Ensure artistsItems is an array
};
export default ServiceRequest;

