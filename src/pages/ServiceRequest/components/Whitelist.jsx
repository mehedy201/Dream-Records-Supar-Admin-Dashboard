import { useEffect, useState } from "react";
import { Flex } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import PropTypes from "prop-types";
import Table from "../../../components/Table";
import SelectDropdown from "../../../components/SelectDropdown";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFoundComponent from "../../../components/NotFoundComponent";

function Whitelist({ 
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


  return (
    <div>
      <Flex className="page-heading serviceRequest-heading">
        <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Service Request</h2>
      </Flex>
      <div className="search-setion">
        <input onKeyPress={handleKeyPress} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..." />
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
      {
        serviceRequestData &&
        <Table
          serviceRequestData={serviceRequestData}
          tableFor="Whitelist"
        />
      }
      {
        notFound && <NotFoundComponent/> 
      }
    </div>
  );
}
Whitelist.propTypes = {
  modalReleaseDropdown1: PropTypes.bool.isRequired,
  setModalReleaseDropdown1: PropTypes.func.isRequired,
  Release_Claim: PropTypes.array.isRequired,
  renderReleaseCell: PropTypes.func.isRequired,

  artistsItems: PropTypes.array.isRequired,
};
export default Whitelist;
