import { useEffect, useState } from "react";
import SelectDropdown from "../../components/SelectDropdown";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import * as Tabs from "@radix-ui/react-tabs";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import Pagination from "../../components/Pagination";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import UserTable from "../../components/table/UserTable";
import isEmptyArray from "../../hooks/isEmptyArrayCheck";
import LoadingScreen from "../../components/LoadingScreen";
import NotFoundPage from "../../components/NotFoundPage";
const artistColumns = [
  { label: "Username", key: "Username" },
  { label: "Email", key: "email" },
  { label: "Status", key: "status" },
  { label: "Created At", key: "date" },
  { label: "Action", key: "action" },
];
const activeColumns = [
  { label: "Username", key: "Username" },
  { label: "Email", key: "email" },
  { label: "Status", key: "status" },
  { label: "Created At", key: "createDate" },
  { label: "Last Activation", key: "activation" },
  { label: "Action", key: "action" },
];
const suspendColumns = [
  { label: "Username", key: "Username" },
  { label: "Email", key: "email" },
  { label: "Status", key: "status" },
  { label: "Created At", key: "createDate" },
  { label: "Suspend Date", key: "suspendDate" },
  { label: "Action", key: "action" },
];

function Users() {

  const navigate = useNavigate();

  
  const { yearsList} = useSelector(state => state.yearsAndStatus);
  // Main Params ________________________________
  const {status, pageNumber, perPageItem} = useParams();
  // Filter Query Paramitars_____________________
  const { navigateWithParams } = useQueryParams();
  const [filterParams] = useSearchParams();
  const search = filterParams.get('search') || '';
  const years = filterParams.get('years') || '';

  const filterByYear = (yearValue) => {
    navigateWithParams(`/users/${status}/${pageNumber}/${perPageItem}`, { search: search, years: yearValue });
  }

 
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
      <SelectDropdown
        options={yearsList}
        placeholder={`${years ? years : 'All Time'}`}
        filterByYearAndStatus={filterByYear}
      />
  );


  // Fatch User Data _______________________________________________
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber));
  const [filteredCount, setFilteredCount] = useState();
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false)
  const [data, setData] = useState();
  useEffect( () => {
    setLoading(true)
    axios.get(`http://localhost:5000/admin/api/v1/users?status=${status}&page=${pageNumber}&limit=${perPageItem}&search=${search}&years=${years}`)
        .then( res => {
          if(res.status == 200){
            setData(res.data.data)
            if(isEmptyArray(res.data.data))setNotFound(true)
            setFilteredCount(res.data.filteredCount);
            setTotalPages(res.data.totalPages);
            setLoading(false)
          }
        })
        .catch(er => console.log(er));
  },[pageNumber, status, perPageItem, search, years])


  // Handle Page Change ________________________________
  const handlePageChange = (page) => {
    navigateWithParams(`/users/${status}/${page}/${perPageItem}`, { search: search, years: years });
  }
  // Search _____________________________________________
  const [searchText, setSearchText] = useState();
  const handleKeyPress = (event) => {
    console.log(event)
    if (event.key === 'Enter') {
      console.log('yes', searchText)
      navigateWithParams(`/users/${status}/1/${perPageItem}`, { search: searchText, years: years });
    }
  };

  // Handle Per Page Item _______________________________
  const handlePerPageItem = (perPageItem) => {
    navigateWithParams(`/users/${status}/${pageNumber}/${perPageItem}`, { search: search, years: years });
  }


  if(loading){
    return <LoadingScreen/>
  }



  return (
    <div className="main-content">
      {" "}
      {/* <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Users</h2> */}
      <Flex
        className="page-heading d-flex"
        style={{ justifyContent: "space-between" }}
      >
        <h2>Users</h2>
        <Link className="theme-btn" to={`/CreateUser`}>
          + Create New
        </Link>
      </Flex>
      <div className="search-setion">
        <input onKeyPress={handleKeyPress} defaultValue={search} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..." style={{ width: "87%" }} />
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
      <Tabs.Root
        className="tabs-root"
        defaultValue={status}
        style={{ marginTop: 0 }}
      >
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Pending"
            onClick={() => navigate('/users/Pending/1/10')}
          >
            New Users
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Active"
            onClick={() => navigate('/users/Active/1/10')}
          >
            Active Users
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Suspended"
            onClick={() => navigate('/users/Suspended/1/10')}
          >
            Suspended Users
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="tabs-content" value="Pending">
          <UserTable
            data={data}
            columns={artistColumns}
          />
          {
            notFound && <NotFoundPage/> 
          }
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="Active">
          <UserTable
            data={data}
            columns={activeColumns}
          />
          {
            notFound && <NotFoundPage/> 
          }
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="Suspended">
          <UserTable
            data={data}
            columns={suspendColumns}
          />
          {
            notFound && <NotFoundPage/> 
          }
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
Users.propTypes = {
  newUsersTable: PropTypes.array.isRequired,
  activeUsersTable: PropTypes.array.isRequired,
  suspendUsersTable: PropTypes.array.isRequired,
};
export default Users;
