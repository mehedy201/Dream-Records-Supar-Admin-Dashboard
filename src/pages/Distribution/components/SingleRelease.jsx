import * as Collapsible from "@radix-ui/react-collapsible";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dialog, Slider, Tabs } from "radix-ui";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { RiDeleteBin6Line, RiDownloadLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SelectDropdown from "../../../components/SelectDropdown";
import Table from "../../../components/Table";
import Chart from "./Chart";
import Modal from "../../../components/Modal";
import { FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { LuImageDown } from "react-icons/lu";

const singleColumns = [
  { label: "DSPs", key: "DSPs" },
  { label: "Streams", key: "Streams" },
  { label: "Album Downloads", key: "AlbumDownloads" },
  { label: "Track Downloads", key: "TrackDownloads" },
];
const singleRevenueColumns = [
  { label: "Total", key: "Total" },
  { label: "Revenue", key: "Revenue" },
];

function SingleRelease({
  releaseAlbumInfo,
  albumTrackList,
  singleReleaseATrackData,
  chartData,
  singleReleaseARevenueData,
  releaseTrackDetails,
  releaseCredits,
}) {
  const location = useLocation();
  const [release, setRelease] = useState(null);
  const [albumSongList, setAlbumSongList] = useState({});
  const [analyticsCollapse, setAnalyticsCollapse] = useState(false);
  const toggleAlbum = (index) => {
    setAlbumSongList((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle open/close for the specific album
    }));
  };
  useEffect(() => {
    const releaseFromState = location.state?.release;
    const releaseFromStorage = localStorage.getItem("release");
    const parsedRelease =
      releaseFromState ||
      (releaseFromStorage && JSON.parse(releaseFromStorage));

    if (parsedRelease) {
      setRelease(parsedRelease);
    }
  }, [location.state]);

  return (
    <div>
      <div
        className="main-content createRelease-content-div createRelease-overview-div"
        style={{ marginBottom: "20px" }}
      >
        {/* {release ? ( */}
        {/* <> */}
        {release?.type === "Error" && (
          <>
            {" "}
            <div className="notice">
              <FiAlertTriangle />
              <p>
                We are upgrading our platform to enhance your experience. You
                may notice new user interfaces appearing periodically. Thank you
                for your patience as we make these improvements.
              </p>
            </div>
            <br />
          </>
        )}
        <div className="d-flex release-overview-img-div">
          <div>
            <img
              src="src/assets/release.png"
              alt=""
              className="release-overview-img"
            />
          </div>
          <div className="d-flex" style={{ width: "100%" }}>
            <div>
              {release?.type === "ERROR" ? (
                <span
                  className={`status card-type-txt ${release.type.toLowerCase()}`}
                >
                  {release.type}
                </span>
              ) : release?.type === "Re-Submitted" ? (
                <>
                  {" "}
                  <span
                    className="card-type-txt"
                    style={
                      release.page == "QC Approval"
                        ? {
                            background: "#E6F6EB",
                            color: "#2B9A66",
                            textTransform: "capitalize",
                          }
                        : ""
                    }
                  >
                    {release.page}
                  </span>
                  &nbsp;&nbsp;
                  <span
                    className={`status card-type-txt ${release.type.toLowerCase()}`}
                    style={
                      release.type == "Re-Submitted"
                        ? {
                            textTransform: "capitalize",
                          }
                        : release.type == "IN REVIEW"
                        ? {
                            background: "#D5EFFF",
                            color: "#0090FF",
                          }
                        : ""
                    }
                  >
                    {release.type}
                  </span>
                </>
              ) : release?.page === "QC Approved" ? (
                <>
                  {" "}
                  <span
                    className={`status card-type-txt ${release.type.toLowerCase()}`}
                    style={
                      release.type == "IN REVIEW"
                        ? {
                            background: "#D5EFFF",
                            color: "#0090FF",
                          }
                        : ""
                    }
                  >
                    {release.type}
                  </span>
                  <span className="singleRelease-approved-txt">
                    QC Approved by: {release.approvedBy}
                  </span>
                </>
              ) : (
                ""
              )}
              <br />
              <h1>Ami Dur Hote Tomarei Dekhechi</h1>
              <h2>Arpita Modak</h2>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="dropdown-trigger singleArtist-dropdown-btn"
                  style={{ marginRight: 0 }}
                >
                  <img src="src/assets/icons/vertical-threeDots.png" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                align="left"
                side="bottom"
                className="dropdown-content qcApproval-dropdown-content"
              >
                <DropdownMenu.Item className="dropdown-item">
                  <div>
                    <LuImageDown /> Download Artwork
                  </div>
                </DropdownMenu.Item>
                <hr style={{ margin: 0 }} />
                <DropdownMenu.Item className="dropdown-item">
                  <div>
                    <FiArrowRight /> <span>Move to Review</span>
                  </div>
                </DropdownMenu.Item>
                <hr style={{ margin: 0 }} />
                <DropdownMenu.Item
                  className="dropdown-item"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Dialog.Root>
                    <Dialog.Trigger
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        padding: 0,
                      }}
                      className="dropdown-item"
                    >
                      <RiDeleteBin6Line /> <span>Reject Release</span>
                    </Dialog.Trigger>
                    <Modal title="Reject Release">
                      <div className="singleRelease-reject-modal">
                        <p className="modal-description">
                          Please fix the issue indicated below and then don’t
                          forget to re-submit your release for distribution.
                        </p>
                        <label className="singleRelease-modal-label" htmlFor="">
                          Reject Type
                        </label>
                        <SelectDropdown
                          options={["Account", "Profile", "Settings"]}
                          placeholder="Takedown"
                          className="singleRelease-modal-dropdown"
                        />

                        <label className="singleRelease-modal-label" htmlFor="">
                          Describe issue here *
                        </label>
                        <textarea placeholder="Write your issue here"></textarea>
                      </div>
                      <Dialog.Close className="close-button">
                        Reject
                      </Dialog.Close>
                    </Modal>
                  </Dialog.Root>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
        <hr />
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h3 className="release-album-title">Album Info</h3>
          <button className="singleRelease-editAlbum-btn">
            <GoPencil /> Edit Album
          </button>
        </div>
        <div className="release-album-info-row">
          {releaseAlbumInfo.map((item, index) => (
            <div key={index} className="d-flex">
              <p>{item.title}</p>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <hr />
        <h3 className="release-album-title">Tracks</h3>
        <br />
        {albumTrackList.map((album, index) => (
          <Collapsible.Root
            key={index}
            open={albumSongList[index] || false}
            onOpenChange={() => toggleAlbum(index)}
          >
            <div className="release-album-list">
              <IoPlayCircleOutline className="release-album-playIcon" />
              <div className="release-album-info">
                <p className="album-title">{album.title}</p>
                <small>{album.artist}</small>
              </div>
              <div className="d-flex release-album-RangeDiv">
                <p>{album.duration}</p>
                <Slider.Root
                  className="rangeSliderRoot"
                  defaultValue={[50]}
                  max={100}
                  step={1}
                >
                  <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                  </Slider.Track>
                  <Slider.Thumb className="SliderThumb" aria-label="Volume" />
                </Slider.Root>
                <button className="release-track-download-btn">
                  <RiDownloadLine /> Download
                </button>
                <button className="release-edit-track-btn">
                  <GoPencil /> Edit Track
                </button>
                <Collapsible.Trigger asChild>
                  {albumSongList[index] ? (
                    <IoIosArrowUp className="release-album-arrowIcon" />
                  ) : (
                    <IoIosArrowDown className="release-album-arrowIcon" />
                  )}
                </Collapsible.Trigger>
              </div>
            </div>
            <Collapsible.Content
              style={{ background: "#F9F9F9", borderRadius: "4px" }}
            >
              <div className="album-details">
                <Tabs.Root
                  className="tabs-root"
                  defaultValue="TrackDetails"
                  style={{ marginTop: 0 }}
                >
                  <Tabs.List className="tabs-list">
                    <Tabs.Trigger
                      className="tabs-trigger release-track-tabs-trigger"
                      value="TrackDetails"
                    >
                      Track Details
                    </Tabs.Trigger>
                    <Tabs.Trigger
                      className="tabs-trigger release-track-tabs-trigger"
                      value="Credits"
                    >
                      Credits
                    </Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content className="tabs-content" value="TrackDetails">
                    <div className="singleRelease-track-details">
                      {releaseTrackDetails.map((item, index) => (
                        <div key={index} className="d-flex">
                          <p>{item.title}</p>
                          <p>
                            {item.title === "Lyrics:"
                              ? item.value.length > 40 && (
                                  <>
                                    {item.value.slice(0, 40) + "..."}
                                    <br />
                                    <Dialog.Root>
                                      <Dialog.Trigger style={{ margin: 0 }}>
                                        Read More
                                      </Dialog.Trigger>
                                      <Modal title="Payment Rejection Details">
                                        <p className="modal-description">
                                          Tere Bin Main Yun Kaise JiyaKaise
                                        </p>
                                        <p className="modal-description">
                                          Jiya Tere BinTere Bin Main Yun
                                        </p>
                                        <p className="modal-description">
                                          Kaise JiyaKaise Jiya Tere BinLekar
                                        </p>
                                        <p className="modal-description">
                                          Yaad Teri Raaten Meri KatiLekar
                                        </p>
                                        <p className="modal-description">
                                          Yaad Teri Raaten Meri Katihjk
                                        </p>
                                      </Modal>
                                    </Dialog.Root>
                                  </>
                                )
                              : item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Tabs.Content>
                  <Tabs.Content className="tabs-content" value="Credits">
                    <br />
                    <div className="form-grid releaseCredit-formGrid">
                      {releaseCredits.map((item, index) => (
                        <div key={index} className="d-flex releaseCredit-items">
                          <p className="releaseCredit-items-title">
                            {item.title}
                          </p>
                          <div>
                            <div className="d-flex">
                              <img
                                src={`src/assets/artists/${item.value.img1}`}
                                alt=""
                              />
                              <p>{item.value.name1}</p>
                            </div>
                            <div className="d-flex">
                              {item.value.img2 && (
                                <>
                                  <img
                                    src={`src/assets/artists/${item.value.img2}`}
                                    alt=""
                                  />
                                  <p>{item.value?.name2}</p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tabs.Content>
                </Tabs.Root>
              </div>
            </Collapsible.Content>
            <br />
          </Collapsible.Root>
        ))}
      </div>
      <div className="release-analytics">
        <Collapsible.Root
          open={analyticsCollapse} // Use object state
          onOpenChange={() => setAnalyticsCollapse(!analyticsCollapse)}
        >
          <Collapsible.Trigger asChild>
            <div className="">
              <div className="d-flex">
                <h5 className="release-album-title">Analytics</h5>
                <div style={{ marginLeft: "auto" }}>
                  {analyticsCollapse ? (
                    <IoIosArrowUp
                      className="release-album-arrowIcon"
                      style={{ marginRight: "17px" }}
                    />
                  ) : (
                    <IoIosArrowDown
                      className="release-album-arrowIcon"
                      style={{ marginRight: "17px" }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Collapsible.Trigger>

          <Collapsible.Content>
            <div className="analytics-card-row">
              <div className="analytics-card">
                <h6>Total Streams</h6>
                <h2>3435</h2>
              </div>
              <div className="analytics-card">
                <h6>Total Revenue</h6>
                <h2>€3435</h2>
              </div>
            </div>
            <Tabs.Root
              className="tabs-root singleRelease-tabs"
              defaultValue="TrackDetails"
            >
              <Tabs.List className="tabs-list">
                <div className="singleRelease-tabsList">
                  <Tabs.Trigger className="tabs-trigger" value="TrackDetails">
                    Streams
                  </Tabs.Trigger>
                  <Tabs.Trigger className="tabs-trigger" value="Credits">
                    Revenue
                  </Tabs.Trigger>
                  <div className="d-flex" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      {" "}
                      <label htmlFor="">Period</label>
                      <SelectDropdown
                        options={["Account", "Profile", "Settings"]}
                        placeholder="Last Year"
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <label htmlFor="">By</label>
                      <SelectDropdown
                        options={["Account", "Profile", "Settings"]}
                        placeholder="DSP"
                      />
                    </div>
                  </div>
                </div>
              </Tabs.List>

              <Tabs.Content className="tabs-content" value="TrackDetails">
                <Chart chartData={chartData} />
                <Table columns={singleColumns} data={singleReleaseATrackData} />
              </Tabs.Content>
              <Tabs.Content className="tabs-content" value="Credits">
                <Chart chartData={chartData} />
                <Table
                  columns={singleRevenueColumns}
                  data={singleReleaseARevenueData}
                />
              </Tabs.Content>
            </Tabs.Root>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
}
SingleRelease.propTypes = {
  releaseAlbumInfo: PropTypes.array.isRequired,
  albumTrackList: PropTypes.array.isRequired,
  singleReleaseATrackData: PropTypes.array.isRequired,
  chartData: PropTypes.array.isRequired,
  singleReleaseARevenueData: PropTypes.array.isRequired,
  releaseTrackDetails: PropTypes.array.isRequired,
  releaseCredits: PropTypes.array.isRequired,
};
export default SingleRelease;
