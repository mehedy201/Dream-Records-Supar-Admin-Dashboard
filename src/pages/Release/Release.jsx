import { Flex } from "@radix-ui/themes";
import "./Release.css";
import PropTypes from "prop-types";

import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import ReleaseCard from "../../components/ReleaseCard";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";

const Release = ({ releaseItems }) => {
  // Independent state for each dropdown
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(false);

  return (
    <div className="main-content">
      <Flex className="page-heading">
        <h2>Releases</h2>
        <button className="theme-btn" style={{ padding: "0" }}>
          <Link
            to="/create-release"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "16px 20px",
            }}
          >
            + Create New
          </Link>
        </button>
      </Flex>

      <div className="search-setion">
        <input type="text" placeholder="Search..." />
        {/* First Dropdown */}
        <Dropdown
          label="All time"
          options={["Option 1", "Option 2", "Option 3"]}
          onSelect={setSelectedOption1}
          select={selectedOption1}
        />

        {/* Second Dropdown */}
        <Dropdown
          label="All Releases"
          options={["Option A", "Option B", "Option C"]}
          onSelect={setSelectedOption2}
          select={selectedOption2}
        />
      </div>
      <ReleaseCard releaseItems={releaseItems} />
      <Pagination />
    </div>
  );
};
Release.propTypes = {
  releaseItems: PropTypes.array.isRequired,
};
export default Release;
