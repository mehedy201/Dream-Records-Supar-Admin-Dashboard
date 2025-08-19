import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import { FaRegCheckCircle } from "react-icons/fa";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import threeDot from "../../../assets/icons/vertical-threeDots.png";
import localDate from "../../../hooks/localDate";
import localTime from "../../../hooks/localTime";
import useQueryParams from "../../../hooks/useQueryParams";
import { useSelector } from "react-redux";
import labelPlacheholderImg from "../../../assets/lables/lables-placeholder.png";
import isEmptyArray from "../../../hooks/isEmptyArrayCheck";
import Pagination from "../../../components/Pagination";
import userDemoImg from "../../../assets/artists/artist4.png";
import NotFoundPage from "../../../components/NotFoundPage";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import textToHTML from "../../../hooks/textToHTML";
import SpecificUserTransaactionTable from "../../../components/table/SpecificUserTransaactionTable";
import FormSubmitLoading from "../../../components/FormSubmitLoading";
import { useForm } from "react-hook-form";

const transactionColumns = [
  { label: "Type", key: "type" },
  { label: "Payment Method", key: "method" },
  { label: "Amount", key: "amount" },
  { label: "Status", key: "status" },
  { label: "Date", key: "date" },
  { label: "Action", key: "action" },
];

function SingleUser() {
  const navigate = useNavigate();
  const { id, item, pageNumber, perPageItem } = useParams();

  const { yearsList, labelStatusList } = useSelector((state) => state.yearsAndStatus);
  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get("search") || "";
  const years = filterParams.get("years") || "";
  const status = filterParams.get("status") || "";

  const filterByYear = (yearValue) => {
    navigateWithParams(`/user/${id}/${item}/1/${perPageItem}`, {
      search: search,
      years: yearValue,
      status: status,
    });
  };

  const filterByStatus = (statusValue) => {
    navigateWithParams(`/user/${id}/${item}/1/${perPageItem}`, {
      search: search,
      years: years,
      status: statusValue,
    });
  };

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [reFetchUser, setRefetchUser] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/users/${id}`
      )
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.data);
          setUserData(res.data.data);
          setLoading(false);
        }
      });
  }, [id, reFetchUser]);

  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [itemData, setItemData] = useState();
  const [itemLoading, setItemLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    setItemLoading(true);
    setNotFound(false)
    if (item === "artist") {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/${id}?page=${pageNumber}&limit=${perPageItem}&search=${search}&years=${years}`
        )
        .then((res) => {
          if (res.status == 200) {
            setItemData(res.data.data);
            if (isEmptyArray(res.data.data)) setNotFound(true);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
            setItemLoading(false);
          }
        })
        .catch((er) => console.log(er));
    }
    if (item === "labels") {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/${id}?page=${pageNumber}&limit=${perPageItem}&status=${status}&search=${search}&years=${years}`
        )
        .then((res) => {
          if (res.status == 200) {
            setItemData(res.data.data);
            if (isEmptyArray(res.data.data)) setNotFound(true);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
            setItemLoading(false);
          }
        })
        .catch((er) => console.log(er));
    }
    if (item === "transactions") {
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/payment/${id}?page=${pageNumber}&limit=${perPageItem}`
        )
        .then((res) => {
          if (res.status === 200) {
            setItemData(res.data.data);
            // console.log(res.data.data);
            if (isEmptyArray(res.data.data)) setNotFound(true);
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
            setItemLoading(false);
          }
        });
    }
  }, [id, pageNumber, perPageItem, status, search, years]);

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
    <>
      <SelectDropdown
        options={yearsList}
        placeholder={`${years ? years : "All Time"}`}
        filterByYearAndStatus={filterByYear}
      />
  
      {isMobile && <br />}
      {
        item === "labels" &&
        <SelectDropdown
          options={labelStatusList}
          placeholder={status ? status : "All"}
          filterByYearAndStatus={filterByStatus}
        />
      }
    </>
  );
  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location.state]);

  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/user/${id}/${item}/${page}/${perPageItem}`, {
      search: search,
      years: years,
      status: status,
    });
  };
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigateWithParams(`/user/${id}/${item}/1/${perPageItem}`, {
        search: searchText,
        years: years,
        status: status,
      });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/user/${id}/${item}/${pageNumber}/${perPageItem}`, {
      search: search,
      years: years,
      status: status,
    });
  };

  const closeRef = useRef(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [suspendReasonErr, setSuspendReasonErr] = useState();
  const userLocked = (id) => {
    console.log("yes");
    console.log("suspendReason", suspendReason);
    setSuspendReasonErr("");
    if (!suspendReason) {
      console.log("yes not suspend reason");
      setSuspendReasonErr("Please describe suspend reason!");
      return;
    }
    const date = new Date().toISOString();
    const userLocked = true;
    const userLockedDate = date;
    const status = "Suspended";
    const payload = {
      userLocked,
      userLockedDate,
      suspendReason: textToHTML(suspendReason),
      status,
    };
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/users/suspend-and-unsuspend/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          setRefetchUser(reFetchUser + 1);
          toast.success("User Locked");
          closeRef.current?.click(); // close modal
        }
      });
  };

  const userUnlocked = (id) => {
    const userLocked = false;
    const userLockedDate = "";
    const suspendReason = "";
    const status = "Active";
    const payload = { userLocked, userLockedDate, suspendReason, status };
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/users/suspend-and-unsuspend/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          setRefetchUser(reFetchUser + 1);
          toast.success("User Unlocked");
        }
      });
  };







  const passwordCloseRef = useRef(null);
  const [passMatchErr, setPassMatchErr] = useState('');
  const {register, handleSubmit, formState: {errors}} = useForm();
  const [passwordChangeLoading, setPasswordChangeLoading] = useState();
  const onSubmit = async (data) => {
    setPassMatchErr('');
    setPasswordChangeLoading(true);
    // First check if new passwords match
    if (data.pass1 !== data.pass2) {
        setPassMatchErr('New passwords do not match');
        setPasswordChangeLoading(false);
        return;
    }

    const payload = {newPassword: data.pass1, id, admin: 'Admin'}
    axios.patch(`https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/change-password`, payload)
    .then(res => {
      if(res.data.status === 200){
        toast.success(res.data.message)
        setPasswordChangeLoading(false)
        passwordCloseRef.current?.click();
      }else{
        toast.error(res.data.message)
        passwordCloseRef.current?.click();
        setPasswordChangeLoading(false)
      }
    })
  }


  const emailCloseRef = useRef(null);
  const [email, setEmail] = useState();
  const [emailErr, setEmailErr] = useState();
  const [currentEmail, setCurrentEmail] = useState();
  const [currentEmailErr, setCurrentEmailErr] = useState();
  const [emailChangeLoading, setEmailChangeLoading] = useState(false);
  const changeEmailFunc = () => {
    setEmailChangeLoading(true)
    setEmailErr('')
    setCurrentEmailErr('')
    if(!currentEmail){
      setCurrentEmailErr('Current Email required')
    }
    if(!email){
      setEmailErr('Email required')
    }
    
    const payload = {newEmail: email, currentEmail, id}
    axios.patch(`https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/change-email`, payload)
    .then(res => {
      console.log(res)
      if(res.data.status === 200){
        toast.success(res.data.message)
        setEmailChangeLoading(false)
        emailCloseRef.current?.click();
      }else{
        // toast.error(res.data.message.message)
        setEmailErr(res.data.message.message)
        setEmailChangeLoading(false)
      }
    })

  }


  const openAccountNewTab = (data) => {
    const payload = {email: data.email, password: data.password}
    axios
      .post(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/authentication/magic-login`,
        payload
      )
      .then((res) => {
        if (res.data.status === 200) {
          const token = res.data.token
          toast.success(res.data.message);
          window.open(
            `https://app.dreamrecords.in/login?token=${token}`,
            "_blank"
          );

        } else {
          toast.success(res.data.message);
        }
      });
  }






  if (loading) return <LoadingScreen />;

  return (
    <div className="main-content single-user-content">
      {userData?.suspendReason && (
        <div className="notice">
          <InfoCircledIcon />
          <p
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: userData?.suspendReason }}
          ></p>
        </div>
      )}
      <Flex className="singleUser-img-div">
        <div className="singleLabel-image-div">
          <img
            src={userData?.photoURL ? userData?.photoURL : userDemoImg}
            className="singleLabel-image"
          />
        </div>
        <div className="singleUser-img-txt">
          <br />
          <div>
            <span
              className={`card-type-txt status ${user?.status.toLowerCase()}`}
            >
              {user?.status}
            </span>

            <h1>
              {userData?.first_name} {userData?.last_name}
            </h1>
            <h4>{userData?.userName}</h4>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="dropdown-trigger singleLabel-dropdown-btn">
                <img src={threeDot} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="left"
              side="bottom"
              className="dropdown-content singleUser-dropdown-content"
            >
              <DropdownMenu.Item className="dropdown-item">
                <Link
                  to={`/edit-User/${id}`}
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
              <DropdownMenu.Item onClick={() => openAccountNewTab(userData)} className="dropdown-item">
                  <GoLinkExternal />
                  Open Account
              </DropdownMenu.Item>

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
                  <hr />

                  {userData?.userLocked === true && (
                    <DropdownMenu.Item
                      onClick={() => userUnlocked(userData?._id)}
                      className="dropdown-item"
                    >
                      <Link
                        style={{
                          cursor: "pointer",
                          color: "#202020",
                          textDecoration: "none",
                        }}
                      >
                        <Lock />
                        Unsuspend
                      </Link>
                    </DropdownMenu.Item>
                  )}

                  {(userData?.userLocked === false ||
                    userData?.userLocked === undefined) && (
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
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  setSuspendReason(e.target.value);
                                  setSuspendReasonErr("");
                                }}
                                onKeyDown={(e) => e.stopPropagation()}
                              ></textarea>
                              {suspendReasonErr && (
                                <p style={{ color: "red" }}>
                                  {suspendReasonErr}
                                </p>
                              )}

                              <button
                                style={{ width: "100%", margin: "16px 0 0 0" }}
                                className="theme-btn"
                                onClick={() => userLocked(userData?._id)}
                              >
                                Suspend
                              </button>

                              {/* Hidden Dialog.Close for programmatic close */}
                              <Dialog.Close asChild>
                                <button
                                  ref={closeRef}
                                  style={{ display: "none" }}
                                />
                              </Dialog.Close>
                            </Modal>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                    </DropdownMenu.Item>
                  )}
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
        {/* Personal Information ________________________________ */}
        <div className="user-info">
          <h5>User Info:</h5>
          <div style={{ marginTop: "14px" }} className="d-flex">
            <p>First Name:</p>
            <p className="user-value-text">{userData?.first_name}</p>
          </div>
          <div className="d-flex">
            <p>Last Name:</p>
            <p className="user-value-text">{userData?.last_name}</p>
          </div>
          <div className="d-flex">
            <p>Email:</p>
            <p className="user-value-text">{userData?.email}</p>
          </div>
          <div className="d-flex">
            <p>Phone:</p>
            <p className="user-value-text">{userData?.phone}</p>
          </div>
          <div className="d-flex">
            <p>Created Date &amp; Time:</p>
            <p className="user-value-text">
              {userData?.openingDateISO
                ? localDate(userData?.openingDateISO)
                : userData?.openingDate}{" "}
              {userData?.openingDateISO
                ? localTime(userData?.openingDateISO)
                : ""}
            </p>
          </div>
          <div className="d-flex">
            <p>Last Active:</p>
            <p className="user-value-text">
              {localDate(userData?.lastLogin)} {localTime(userData?.lastLogin)}
            </p>
          </div>
        </div>

        {/* Address ________________________________ */}
        <div className="user-info">
          <h5>Address</h5>
          <div style={{ marginTop: "14px" }} className="d-flex">
            <p>Address Line 1:</p>
            <p className="user-value-text">{userData?.addressLine1}</p>
          </div>
          <div className="d-flex">
            <p>Address Line 2:</p>
            <p className="user-value-text">{userData?.addressLine2}</p>
          </div>
          <div className="d-flex">
            <p>Postal Code:</p>
            <p className="user-value-text">{userData?.postalCode}</p>
          </div>
          <div className="d-flex">
            <p>City:</p>
            <p className="user-value-text">{userData?.city}</p>
          </div>
          <div className="d-flex">
            <p>State:</p>
            <p className="user-value-text">{userData?.state?.name}</p>
          </div>
          <div className="d-flex">
            <p>Country:</p>
            <p className="user-value-text">{userData?.country?.name}</p>
          </div>
        </div>

        
          {/* <div className="user-info">
            <h5>Label Info</h5>
            <div style={{ marginTop: "14px" }}>
              <div className="d-flex">
                <p>Channel Name:</p>
                <p className="user-value-text">demo</p>
              </div>
              <div className="d-flex">
                <p>Channel URL:</p>
                <p className="user-value-text">demo</p>
              </div>
              <div className="d-flex">
                <p>Subscriber Count:</p>
                <p className="user-value-text">1</p>
              </div>
              <div className="d-flex">
                <p>Videos Count:</p>
                <p className="user-value-text">11</p>
              </div>
            </div>
          </div> */}


        {/* <div className="user-download-row">
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
        </div> */}







      </div>
        <h5 style={{marginBottom: '0px', padding: '12px'}}>Security Info</h5>
        <div style={{alignItems: 'center', marginTop: '0px'}} className="profile-info d-flex">
          <div style={{ width: "80%" }}>        
            <div style={{margin: '10px 0px'}} className="d-flex">
              <p>Email</p>
              <p className="profile-value-text">{userData?.email}</p>
            </div>
            <div style={{margin: '10px 0px'}} className="d-flex">
              <p>Password</p>
              <p className="profile-value-text">*************</p>
            </div>
          </div>
          <div>
            <Dialog.Root>
              <Dialog.Trigger className="profile-email-btn">
                Change Email
              </Dialog.Trigger>
              <Modal title="Change Email">
                <div className="prodile-modal">
                      <label>Current Email</label>
                      <input type="email" onChange={e => setCurrentEmail(e.target.value)}/>
                      <label>New Email</label>
                      <input type="email" onChange={e => setEmail(e.target.value)}/>
                      {
                        emailChangeLoading && <FormSubmitLoading/>
                      }
                      {
                        emailErr && <p style={{color: 'red'}}>{emailErr}</p>
                      }
                  </div>
                  <button onClick={changeEmailFunc} className="close-button">
                    Change Email
                  </button>
          
                  {/* Hidden Dialog.Close for programmatic close */}
                  <Dialog.Close asChild>
                    <button
                      ref={emailCloseRef}
                      style={{ display: "none" }}
                    />
                  </Dialog.Close>
              </Modal>
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger className="profile-pass-btn">
                Change Password
              </Dialog.Trigger>
              <Modal title="Change Password">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="prodile-modal">
                      {/* <label>Enter current Password</label>
                      <input type="password" placeholder="************" {...register('currentPass', {required: true})}/>
                      {errors.currentPass && <p>Current Password Required</p>} */}
                      <label>Enter New Password</label>
                      <input type="password" placeholder="************" {...register('pass1', {required: true})}/>
                      {errors.pass1 && <p>Password Required</p>}
                      <label>Confirm New Password</label>
                      <input type="password" placeholder="************" {...register('pass2', {required: true})}/>
                      {errors.pass2 && <p>Password Required</p>}
                      {
                        passwordChangeLoading && <FormSubmitLoading/>
                      }
                      {
                        passMatchErr && <p>{passMatchErr}</p>
                      }
                  </div>
                  <button type="submit" className="close-button">
                    Change Password
                  </button>
          
                  {/* Hidden Dialog.Close for programmatic close */}
                  <Dialog.Close asChild>
                    <button
                      ref={passwordCloseRef}
                      style={{ display: "none" }}
                    />
                  </Dialog.Close>
                </form>
              </Modal>
            </Dialog.Root>
          </div>
        </div>

      <Tabs.Root className="tabs-root" defaultValue={item}>
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            onClick={() => navigate(`/user/${id}/artist/1/10`)}
            className="tabs-trigger distribution-tabs-trigger"
            value="artist"
          >
            Artists
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => navigate(`/user/${id}/labels/1/10`)}
            className="tabs-trigger distribution-tabs-trigger"
            value="labels"
          >
            Labels
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => navigate(`/user/${id}/transactions/1/10`)}
            className="tabs-trigger distribution-tabs-trigger"
            value="transactions"
          >
            Transactions
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="tabs-content" value="artist">
          <div className="search-setion">
            <input
              onKeyPress={handleKeyPress}
              onChange={(e) => setSearchText(e.target.value)}
              defaultValue={search}
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
            <div>
              {notFound && <NotFoundPage />}
              {itemData && !notFound && <ArtistCard artistsItems={itemData} />}
            </div>
          )}
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="labels">
          <div className="search-setion">
            <input
              onKeyPress={handleKeyPress}
              onChange={(e) => setSearchText(e.target.value)}
              defaultValue={search}
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
            {notFound && <NotFoundPage />}
            {itemData &&
              !notFound &&
              itemData?.map((item, index) => (
                <Link
                  to={`/labels/${item._id}/1/10/All`}
                  state={{ lable: item }}
                  key={index}
                  className="lables-card"
                >
                  <img
                    src={item?.imgUrl ? item?.imgUrl : labelPlacheholderImg}
                    alt="Labels"
                  />
                  <Flex style={{ display: "flex" }}>
                    <div
                      className="card-type-txt"
                      style={
                        item.status == "Rejected"
                          ? { background: "#FEEBEC", color: "#E5484D" }
                          : item.status == "Pending"
                          ? { background: "#FFEBD8", color: "#FFA552" }
                          : { background: "#E6F6EB", color: "#2B9A66" }
                      }
                    >
                      {item.status}
                    </div>
                    <div className="card-date-txt">{localDate(item.date)}</div>
                  </Flex>
                  <p style={{ fontWeight: "500" }}>{item.labelName}</p>
                </Link>
              ))}
          </div>
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="transactions">
          <br />
          <div className="signleUser-transaction-div">
            <p>Total Balance</p>
            <h3>&#8377;  {userData?.balance?.amount}</h3>
          </div>
          {notFound && <NotFoundPage />}
          {itemData && !notFound && (
            <SpecificUserTransaactionTable columns={transactionColumns} data={itemData} />
          )}
        </Tabs.Content>
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
}
SingleUser.SingleUser = {
  artistsItems: PropTypes.array.isRequired,
  transactionsHistory: PropTypes.array.isRequired,
};
export default SingleUser;
