import "./ServiceRequest.css";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import Pagination from "../../components/Pagination";

import PropTypes from "prop-types";
import ReleaseClaim from "./components/ReleaseClaim";
import ContentID from "./components/ContentID";
import ClaimVideo from "./components/ClaimVideo";
import BlockedVideo from "./components/BlockedVideo";
import OAC from "./components/OAC";
import ProfileLinking from "./components/ProfileLinking";
import Whitelist from "./components/Whitelist";
import { InfoCircledIcon } from "@radix-ui/react-icons";
const releaseColumns = [
  { label: "Release", key: "release" },
  { label: "User Name", key: "username" },
  { label: "Type", key: "type" },
  { label: "URL", key: "url" },
  { label: "Created At", key: "date" },
  { label: "Status", key: "status" },
  { label: "Reason", key: "reason" },
];

const renderReleaseCell = (key, row) => {
  if (key === "release") {
    return (
      <div className="release-table-img-td">
        <img src={`src/assets/${row.img}`} alt="" />
        <div>
          <p>{row.release}</p>
          <small>UPC: {row.release_sample}</small>
        </div>
      </div>
    );
  }
  if (key === "url") {
    return row.url.length > 22 ? row.url.slice(0, 22) + "..." : row.url;
  }
  if (key === "username") {
    return <span>{row.username ? row.username.replace(/\s/g, "") : ""}</span>;
  }
  if (key === "status") {
    return (
      <span className={`status ${row.status.toLowerCase()}`}>{row.status}</span>
    );
  }

  return row[key];
};

const ServiceRequest = ({ artistsItems, Release_Claim }) => {
  const [selectedOption1, setSelectedOption1] = useState(false);
  const [modalReleaseDropdown1, setModalReleaseDropdown1] = useState(false);

  return (
    <div className="main-content" style={{ position: "relative" }}>
      <div className="notice">
        <InfoCircledIcon />
        <p>
          We are upgrading our platform to enhance your experience. You may
          notice new user interfaces appearing periodically. Thank you for your
          patience as we make these improvements.
        </p>
      </div>
      <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Service Request</h2>
      <Tabs.Root className="tabs-root" defaultValue="Release Claim">
        <Tabs.List className="tabs-list">
          <Tabs.Trigger className="tabs-trigger" value="Release Claim">
            Release Claim
            <div className="tabs-notification">
              <p>4</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger className="tabs-trigger" value="Content ID">
            Content ID
            <div className="tabs-notification">
              <p>4</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger className="tabs-trigger" value="Claim Video">
            Claim Video
            <div className="tabs-notification">
              <p>4</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger className="tabs-trigger" value="Blocked Video">
            Blocked Video
            <div className="tabs-notification">
              <p>4</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger className="tabs-trigger" value="OAC">
            OAC
            <div className="tabs-notification">
              <p>4</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger className="tabs-trigger" value="Profile Linking">
            Profile Linking{" "}
            <div className="tabs-notification">
              <p>4</p>
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger className="tabs-trigger" value="Whitelist">
            Whitelist{" "}
            <div className="tabs-notification">
              <p>4</p>
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        <div className="tabs-content">
          <Tabs.Content className="tab-panel" value="Release Claim">
            <ReleaseClaim
              Release_Claim={Release_Claim}
              renderReleaseCell={renderReleaseCell}
              releaseColumns={releaseColumns}
            />
          </Tabs.Content>

          <Tabs.Content className="tab-panel" value="Content ID">
            <ContentID
              Release_Claim={Release_Claim}
              renderReleaseCell={renderReleaseCell}
              setModalReleaseDropdown1={setModalReleaseDropdown1}
              modalReleaseDropdown1={modalReleaseDropdown1}
            />
          </Tabs.Content>

          <Tabs.Content className="tab-panel" value="Claim Video">
            <ClaimVideo
              Release_Claim={Release_Claim}
              setModalReleaseDropdown1={setModalReleaseDropdown1}
              renderReleaseCell={renderReleaseCell}
              modalReleaseDropdown1={modalReleaseDropdown1}
            />
          </Tabs.Content>
          <Tabs.Content className="tab-panel" value="Blocked Video">
            <BlockedVideo
              Release_Claim={Release_Claim}
              setModalReleaseDropdown1={setModalReleaseDropdown1}
              renderReleaseCell={renderReleaseCell}
              modalReleaseDropdown1={modalReleaseDropdown1}
            />
          </Tabs.Content>
          <Tabs.Content className="tab-panel" value="OAC">
            <OAC
              Release_Claim={Release_Claim}
              setSelectedOption1={setSelectedOption1}
              selectedOption1={selectedOption1}
              setModalReleaseDropdown1={setModalReleaseDropdown1}
              renderReleaseCell={renderReleaseCell}
              modalReleaseDropdown1={modalReleaseDropdown1}
              artistsItems={artistsItems}
            />
          </Tabs.Content>
          <Tabs.Content className="tab-panel" value="Profile Linking">
            <ProfileLinking
              Release_Claim={Release_Claim}
              setModalReleaseDropdown1={setModalReleaseDropdown1}
              renderReleaseCell={renderReleaseCell}
              modalReleaseDropdown1={modalReleaseDropdown1}
              artistsItems={artistsItems}
            />
          </Tabs.Content>
          <Tabs.Content className="tab-panel" value="Whitelist">
            <Whitelist
              Release_Claim={Release_Claim}
              setModalReleaseDropdown1={setModalReleaseDropdown1}
              renderReleaseCell={renderReleaseCell}
              modalReleaseDropdown1={modalReleaseDropdown1}
              artistsItems={artistsItems}
            />
          </Tabs.Content>
        </div>
      </Tabs.Root>
      <Pagination />
    </div>
  );
};
ServiceRequest.propTypes = {
  artistsItems: PropTypes.array.isRequired, // Ensure artistsItems is an array
  Release_Claim: PropTypes.array.isRequired, // Ensure artistsItems is an array
};
export default ServiceRequest;
