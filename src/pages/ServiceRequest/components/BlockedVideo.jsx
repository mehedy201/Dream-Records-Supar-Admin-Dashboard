import { useEffect, useRef, useState } from "react";
import { Flex } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import PropTypes from "prop-types";
import SelectDropdown from "../../../components/SelectDropdown";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFoundComponent from "../../../components/NotFoundComponent";
import { Dialog } from "radix-ui";
import Modal from "../../../components/Modal";
import localDate from "../../../hooks/localDate";
import { IoEyeOutline } from "react-icons/io5";
import releasePlaceHolderImg from '../../../assets/release-placeholder.png'
import ServiceRequestStatusUpdateForm from "../../../components/FormForUpdateStatus/ServiceRequestStatusUpdateForm";
import localTime from "../../../hooks/localTime";
import { cdnLink } from "../../../hooks/cdnLink";


function BlockedVideo({
  years,
  notFound,
  filterByYear,
  filterByStatus,
  handleKeyPress,
  setSearchText,
}) {

  const {status} = useParams();
  const {serviceRequestData} = useSelector((state) => state.serviceRequestPageSlice);
  const { yearsList } = useSelector(state => state.yearsAndStatus);

  const [filterParams] = useSearchParams();
  const search = filterParams.get("search") || "";

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
        {isMobile && <br />}
        <SelectDropdown
          options={['All', 'Pending', 'Solved','Rejected']}
          placeholder={status}
          filterByYearAndStatus={filterByStatus}
        />
      </>
    );

    const closeRef = useRef(null);


 

  return (
    <div>
      {" "}
      <Flex className="page-heading serviceRequest-heading">
        <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Service Request</h2>
      </Flex>
      <div className="search-setion">
        <input defaultValue={search} onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..." />
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



      {/* Tabel  */}
      <div className="table-wrapper">
        <table className='theme-table'>
          <thead>
            <tr>
              <th>Release</th>
              <th>Video Link</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              serviceRequestData ?
              serviceRequestData?.map((data, index) => 
                <tr key={index}>
                    <td>
                      {
                        Array.isArray(data?.release) &&
                        data?.release?.map(item => 
                          <div style={{margin: '3px'}} key={item?._id} className="release-table-img-td">
                            <img src={item?.key ? cdnLink(item?.key) : releasePlaceHolderImg} alt="" />
                            <div>
                              <p>{item?.releaseTitle}</p>
                              <small>UPC: {item?.UPC}</small>
                            </div>
                          </div>
                        )
                      }
                      {
                        typeof data?.release === 'object' && data?.release?.releaseTitle &&
                        <div className="release-table-img-td">
                          <img src={data?.release?.key ? cdnLink(data?.release?.key) : releasePlaceHolderImg} alt="" />
                          <div>
                            <p>{data?.release?.releaseTitle}</p>
                            <small>UPC: {data?.release?.UPC}</small>
                          </div>
                        </div>
                      }
                    </td>
                    <td><a href={data?.claimLink?.startsWith("http") ? data?.claimLink : `https://${data?.claimLink}`}target="_blank" rel="noopener noreferrer">{data?.claimLink?.length > 50 ? `${data?.claimLink.slice(0, 50)}...` : data?.claimLink}</a></td>
                    <td>{data?.isoDate ? `${localDate(data?.isoDate)} ${localTime(data?.isoDate)}` : '--'}</td>
                    <td><span className={`status ${data?.status?.toLowerCase()}`}>{data?.status}</span></td>
                    <td>
                      <Dialog.Root>
                        <Dialog.Trigger className="serviceRequest-view-trigger">
                          <IoEyeOutline style={{ width: "24px", height: "24px" }} />
                        </Dialog.Trigger>
                        <Modal title='Blocked Video'>
                          {
                            Array.isArray(data?.release) &&
                            data?.release?.map(item => 
                              <div style={{padding: '5px 0px'}} key={item?._id}>
                                <div style={{gap: '10px'}} className="d-flex">
                                  <p style={{margin: '5px 0px'}}>Tittle:</p>
                                  <p style={{margin: '5px 0px'}}>{item?.releaseTitle}</p>
                                </div>
                                <small>UPC: {item?.UPC}</small>
                              </div>
                            )
                          }
                          { data?.release?.releaseTitle && 
                            <div style={{padding: '5px 0px'}}>
                                <div style={{gap: '10px'}} className="d-flex">
                                  <p style={{margin: '5px 0px'}}>Tittle:</p>
                                  <p style={{margin: '5px 0px'}}>{data?.release?.releaseTitle}</p>
                                </div>
                                <small>UPC: {data?.release?.UPC}</small>
                              </div>
                          }
                          <div style={{gap: '10px'}} className="d-flex">
                              <p>Video Link:</p>
                              <p><a href={data?.claimLink?.startsWith("http") ? data?.claimLink : `https://${data?.claimLink}`}target="_blank" rel="noopener noreferrer">{data?.claimLink?.length > 50 ? `${data?.claimLink.slice(0, 50)}...` : data?.claimLink}</a></p>
                          </div>
                          <div style={{gap: '10px'}} className="d-flex">
                            <p>Created At:</p>
                            <p>{data?.isoDate ? `${localDate(data?.isoDate)} ${localTime(data?.isoDate)}` : '--'}</p>
                          </div>
                          <div style={{gap: '10px'}} className="d-flex">
                            <p>Status:</p>
                            <p>{data?.status}</p>
                          </div>
                          {
                            data?.actionRequired &&
                            <div style={{gap: '10px'}} className="">
                              <p style={{ fontSize: "14px", color: "#838383" }}>
                                Reject Reason:
                              </p>
                              <div style={{whiteSpace: 'normal',wordBreak: 'break-word',overflowWrap: 'break-word',}} dangerouslySetInnerHTML={{ __html: data?.actionRequired }} />
                            </div>
                          }

                          {
                            data?.rejectionReasons && 
                            <div>
                              {
                                data?.rejectionReasons?.map((r, index) => 
                                  <div key={index}>
                                    <p style={{fontWeight: '14px'}}>{r}</p>
                                  </div>
                                )
                              }
                            </div>
                          }
                          <br />
                          <hr />
                          <br />
                          {/* Update Claim Status Form  */}
                          <ServiceRequestStatusUpdateForm id={data._id} closeRef={closeRef}/>
                          {/* Hidden Dialog.Close for programmatic close */}
                          <Dialog.Close asChild>
                            <button ref={closeRef} style={{ display: 'none' }} />
                          </Dialog.Close>
                        </Modal>
                      </Dialog.Root>
                    </td>
                </tr>
              ) : null
            }
          </tbody>
        </table>
      </div>













      {/* {
        serviceRequestData &&
        <Table
          serviceRequestData={serviceRequestData}
          tableFor="ClaimVideo"
        />
      } */}
      {
        notFound && <NotFoundComponent/> 
      }
    </div>
  );
}
BlockedVideo.propTypes = {
  modalReleaseDropdown1: PropTypes.bool.isRequired,
  setModalReleaseDropdown1: PropTypes.func.isRequired,
  Release_Claim: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,
};
export default BlockedVideo;
