import { Button, Flex } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ReleaseCard from "../../../components/ReleaseCard";
import PropTypes from "prop-types";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { GoPencil } from "react-icons/go";
import Modal from "../../../components/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import { ChevronRight, Edit } from "lucide-react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Dropdown from "../../../components/Dropdown";
import { useSelector } from "react-redux";
import useQueryParams from "../../../hooks/useQueryParams";
import axios from "axios";
import labelPlaceHolderImg from "../../../assets/lables/lables-placeholder.png";
import threeDots from "../../../assets/icons/vertical-threeDots.png";
import instagramImg from "../../../assets/social/instagram.png";
import facebookImg from "../../../assets/social/facebook.png";
import youtubeImg from "../../../assets/social/youtube-icon.png";
import Pagination from "../../../components/Pagination";
import localDate from "../../../hooks/localDate";
import LabelStatusUpdateComponent from "../../../components/FormForUpdateStatus/LabelStatusUpdateComponent";
import FormSubmitLoading from "../../../components/FormSubmitLoading";
import { FiAlertTriangle } from "react-icons/fi";
import { cdnLink } from "../../../hooks/cdnLink";

function SingleLable() {
  const navigate = useNavigate();
  const { id, pageNumber, perPageItem, status } = useParams();
  const { yearsList, releaseStatusList } = useSelector(
    (state) => state.yearsAndStatus
  );

  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get("search") || "";
  const years = filterParams.get("years") || "";

  const [label, setLabel] = useState({ labelName: "label" });
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/single-labels/${id}`
      )
      .then((res) => {
        if (res.status == 200) {
          setLabel(res.data.data[0]);
          console.log(res.data.data);
        }
      });
  }, [id]);

  // Delete Label________________________
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteLabel = (id, imgKey) => {
    setDeleteLoading(true);
    axios
      .delete(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/delete-labels/${id}?imgKey=${imgKey}`
      )
      .then((res) => {
        if (res.status == 200) {
          setDeleteLoading(false);
          navigate("/labels/1/10/All");
        } else {
          setDeleteLoading(false);
        }
      })
      .catch((er) => console.log(er));
  };

  // Release Under Label __________________________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [releaseData, setReleaseData] = useState();
  const [totalCount, setTotalCount] = useState();
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  // Get Release List ______________________________________________________________
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/labels/${id}?page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${
          search ? search : ""
        }&years=${years ? years : ""}`
      )
      .then((res) => {
        if (res.status == 200) {
          setTotalCount(res.data.totalCount);
          setFilteredCount(res.data.filteredCount);
          setReleaseData(res.data.data);
          setTotalPages(res.data.totalPages);
        }
      })
      .catch((er) => console.log(er));
  }, [pageNumber, status, id, perPageItem, search, years]);

  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [lable, setLable] = useState(null);
  const [socialItems, setSocialItems] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.lable) {
      setLable(location.state.lable);
    }
  }, [location.state]);

  useEffect(() => {
    const stored = localStorage.getItem("labelSocialUrl");
    if (stored) {
      const parsed = JSON.parse(stored);
      const filtered = parsed.filter((item) => item.url.trim() !== "");
      setSocialItems(filtered);
    }
  }, []);

  // Years and status Dropdown__________________________
  const handleYearDropDown = (yearValue) => {
    navigateWithParams(`/labels/${id}/1/${perPageItem}/${status}`, {
      search: search,
      years: yearValue,
    });
  };
  const handleStatusDropDown = (statusValue) => {
    navigateWithParams(`/labels/${id}/1/${perPageItem}/${statusValue}`, {
      search: search,
      years: years,
    });
  };
  const dropdownItem = (
    <>
      <Dropdown
        label={years ? years : "All Time"}
        options={yearsList}
        customFunDropDown={handleYearDropDown}
      />
      {isMobile && <br />}
      <Dropdown
        label={status}
        options={releaseStatusList}
        customFunDropDown={handleStatusDropDown}
      />
    </>
  );

  //  This Function For Label Release Section
  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/labels/${id}/${page}/${perPageItem}/${status}`, {
      search: search,
      years: years,
    });
  };
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateWithParams(`/labels/${id}/1/${perPageItem}/${status}`, {
        search: searchText,
        years: years,
      });
    }
  };
  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItemValue) => {
    navigateWithParams(
      `/labels/${id}/${pageNumber}/${perPageItemValue}/${status}`,
      { search: search, years: years }
    );
  };

  const lebelCloseRef = useRef(null);

  return (
    <div className="main-content">
      <div className="lable-details">
        {label?.rejectionReasons && label.status === "Rejected" && (
          <>
            {label?.rejectionReasons.map((reason, index) => (
              <div className="notice">
                <FiAlertTriangle />
                <span style={{ marginLeft: "5px" }}>{reason}</span>
              </div>
            ))}
          </>
        )}
        {label?.actionRequired && label.status === "Rejected" && (
          <>
            <div className="notice">
              <FiAlertTriangle />
              <span
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  marginLeft: "5px",
                }}
                dangerouslySetInnerHTML={{
                  __html: label?.actionRequired,
                }}
              ></span>
            </div>
            <br />
          </>
        )}
        <Flex className="lable-img-row">
          <div>
            {" "}
            <img
              src={label.key ? cdnLink(label.key) : labelPlaceHolderImg}
              className="singleLabel-image"
              alt=""
            />
          </div>
          <div className="lable-img-txt">
            <div>
              <br />
              <span
                className={`card-type-txt status ${label?.status?.toLowerCase()}`}
              >
                {label?.status}
              </span>

              <h1>{label?.labelName}</h1>
              <h4>Created on {localDate(label?.date)}</h4>
            </div>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="dropdown-trigger singleLabel-dropdown-btn">
                <img src={threeDots} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="left"
              side="bottom"
              className="dropdown-content singleArtist-dropdown-content"
            >
              <DropdownMenu.Item className="dropdown-item">
                <Link
                  to={`/edit-label/${label._id}`}
                  // state={{ artistSocialItems }}
                  style={{
                    cursor: "pointer",
                    color: "#202020",
                    textDecoration: "none",
                  }}
                >
                  <GoPencil /> Edit Label
                </Link>
              </DropdownMenu.Item>
              <hr />

              <DropdownMenu.Item
                className="dropdown-item"
                onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
              >
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <span style={{ color: "black" }}>
                      <Edit /> Update Status
                    </span>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">
                      <Modal title="Update Label Status">
                        {/* Label Status Update Form ____________ */}
                        <LabelStatusUpdateComponent
                          label={label}
                          closeRef={lebelCloseRef}
                        />
                        {/* Label Status Update Form ____________ */}

                        {/* Hidden Dialog.Close for programmatic close */}
                        <Dialog.Close asChild>
                          <button
                            ref={lebelCloseRef}
                            style={{ display: "none" }}
                          />
                        </Dialog.Close>
                      </Modal>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </DropdownMenu.Item>
              {/* <DropdownMenu.Item
                className="dropdown-item"
                onSelect={(e) => e.preventDefault()} // Prevent dropdown from closing
              >
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <span>
                      <AiOutlineDelete /> Delete Lebel
                    </span>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">
                      <Modal title="Delete Artist Profile?">
                        <p className="modal-description">
                          Are you sure you want to delete this Label profile?
                          This action is irreversible, and all associated data,
                          including music releases and analytics, will be
                          permanently removed.
                        </p>
                        <br />
                        {deleteLoading && <FormSubmitLoading />}
                        <div className="singleArtist-deleteModal-btns">
                          <Dialog.Close asChild>
                            <Button>No</Button>
                          </Dialog.Close>
                          <Button
                            onClick={() => deleteLabel(label._id, label?.key)}
                          >
                            Yes, Delete
                          </Button>
                        </div>
                      </Modal>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </DropdownMenu.Item> */}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <div className="singleLabel-social-row">
          <div className="singleArtist-info" style={{ marginBottom: 0 }}>
            <h4>Total Releases</h4>
            <h1>{totalCount}</h1>
            {/* <Button
              onClick={() => navigate("/distribution/queue/live/1/10")}
              style={{ cursor: "pointer" }}
              className="singleArtist-pg-allRelease-btn"
            >
              All Releases &nbsp;&nbsp; <ChevronRight />
            </Button> */}
          </div>
          <div className="singleArtist-social-div" style={{ marginBottom: 0 }}>
            <h4>label Profiles</h4>
            <div className="d-flex single-pg-social">
              {label?.instagram && (
                <a
                  className="social-div"
                  target="_blank"
                  href={`https://www.instagram.com/${label.instagram}`}
                >
                  <img src={instagramImg} alt={""} />
                </a>
              )}
              {label?.facebook && (
                <a className="social-div" target="_blank" href={label.facebook}>
                  <img src={facebookImg} alt={""} />
                </a>
              )}
              {label?.youtube && (
                <a className="social-div" target="_blank" href={label.youtube}>
                  <img src={youtubeImg} alt={""} />
                </a>
              )}
            </div>
          </div>
        </div>
        {/* </> */}
        {/* ) : (
          <p>No artist found! Try selecting an label first.</p>
        )} */}
      </div>
      <h4
        style={{
          color: "#838383",
          fontSize: "20px",
          fontWeight: "500",
          margin: "24px 0 0 0",
        }}
      >
        Releases under this artist
      </h4>
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
      <ReleaseCard releaseItems={releaseData} />

      <Pagination
        totalDataCount={filteredCount}
        totalPages={totalPages}
        currentPage={currentPage}
        perPageItem={perPageItem}
        setCurrentPage={setCurrentPage}
        handlePageChange={handlePageChange}
        customFunDropDown={handlePerPageItem}
      />
      <br />
      <br />
    </div>
  );
}
SingleLable.propTypes = {
  releaseItems: PropTypes.array.isRequired, // Ensure artistsItems is an array
};
export default SingleLable;
