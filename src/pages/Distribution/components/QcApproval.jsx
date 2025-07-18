import { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import PropTypes from "prop-types";
import "../Distribution.css";
import SelectDropdown from "../../../components/SelectDropdown";
import ReleaseTable from "../../../components/table/ReleaseTable";



const artistColumns = [
  { label: "Release", key: "releaseName" },
  { label: "User Name", key: "userName" },
  { label: "Label", key: "label" },
  { label: "UPC", key: "upc" },
  { label: "Created At", key: "date" },
  { label: "Action", key: "action" },
];
function QcApproval({ data, handleKeyPress, setSearchText, search, years, filterByYear, yearsList }) {


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dropdownItem = (
    <SelectDropdown
      options={yearsList}
      placeholder={`${years ? years : 'All Time'}`}
      filterByYearAndStatus={filterByYear}
    />
  );
  

  return (
    <div>
      <div className="search-setion">
        <input onKeyPress={handleKeyPress} defaultValue={search} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search..." style={{ width: "85%" }} />

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
      <ReleaseTable
        data={data}
        columns={artistColumns}
      />
    </div>
  );
}
QcApproval.propTypes = {
  setValue: PropTypes.func.isRequired,
};
export default QcApproval;
