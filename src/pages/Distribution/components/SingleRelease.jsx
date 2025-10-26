import * as Collapsible from "@radix-ui/react-collapsible";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dialog, Tabs } from "radix-ui";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Chart from "./Chart";
import Modal from "../../../components/Modal";
import { FiAlertTriangle, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { LuImageDown } from "react-icons/lu";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import threeDotImg from "../../../assets/icons/vertical-threeDots.png";
import localDate from "../../../hooks/localDate";
import TrackViewCollapsSection from "../../../components/TrackViewCollapsSection";
import { useDispatch, useSelector } from "react-redux";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import SingleReleasePageTable from "../../../components/SingleReleasePageTable";
import isEmptyArray from "../../../hooks/isEmptyArrayCheck";
import NotFoundPage from "../../../components/NotFoundPage";
import {
  setData,
  setReleaseAlbumInfo,
  setTracksInfo,
} from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";
import AlbumInfoEditComponent from "../EditRelease/AlbumInfoEditComponent";
import { useForm } from "react-hook-form";
import ReleaseStatusSuspendForm from "../../../components/FormForUpdateStatus/ReleaseStatusSuspendForm";
import { cdnLink } from "../../../hooks/cdnLink";

const dspColumn = [
  { label: "DSPs", key: "DSPs" },
  { label: "Streams", key: "Streams" },
  { label: "Revenue", key: "Revenue" },
];
const territoryColumn = [
  { label: "Territory", key: "Territory" },
  { label: "Streams", key: "Streams" },
  { label: "Revenue", key: "Revenue" },
];
const totalRevineuStreamColumn = [
  { label: "Total", key: "Total" },
  { label: "Streams", key: "Streams" },
  { label: "Revenue", key: "Revenue" },
];

function SingleRelease() {
  const { id } = useParams();
  const { yearsList } = useSelector((state) => state.yearsAndStatus);
  const { tracksInfo, data, releaseAlbumInfo } = useSelector(
    (state) => state.releaseData
  );

  const dispatch = useDispatch();

  const [analyticsCollapse, setAnalyticsCollapse] = useState(true);

  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState();
  const [reFetchData, setReFetchData] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/release/${id}`
      )
      .then((res) => {
        // console.log(res)
        // Set Full Release Data_________
        dispatch(setData(res.data.data));
        // Set Album Info________________
        const albumInfo = { ...res.data.data };
        // console.log('albumInfo', albumInfo)
        delete albumInfo?.tracks;
        dispatch(setReleaseAlbumInfo(albumInfo));
        // Set Tracks Info______________
        dispatch(setTracksInfo(res?.data?.data?.tracks));
        setLoading(false);
      });
  }, [id, reFetchData]);

  // Analytics Table Componet Data Process_________________
  const [tableColumn, setTableColumn] = useState(dspColumn);
  const [tableData, setTableData] = useState();
  const [dspTableData, setDspTableData] = useState();
  const [territoryTableData, setTerritoryTableData] = useState();
  const [totalSummary, setTotalSummary] = useState();
  const dspAndTerittoriGet = (data) => {
    // ========== DSP Aggregation ==========
    const dspMap = {};
    data?.forEach((entry) => {
      entry.byDSP.forEach((dsp) => {
        if (!dspMap[dsp.dsp]) {
          dspMap[dsp.dsp] = { revenue: 0, streams: 0 };
        }
        dspMap[dsp.dsp].revenue += dsp.revenue;
        dspMap[dsp.dsp].streams += dsp.streams;
      });
    });

    let byDsp = Object.entries(dspMap).map(([dsp, { revenue, streams }]) => ({
      dsp,
      revenue: Number(revenue.toFixed(2)),
      streams,
    }));

    // sort dsp data (highest first)
    byDsp.sort(
      (a, b) => b.streams + b.revenue - (a.streams + a.revenue)
    );

    // add total row for dsp
    const totalDsp = byDsp.reduce(
      (acc, item) => {
        acc.streams += item.streams;
        acc.revenue += item.revenue;
        return acc;
      },
      { dsp: "TOTAL", streams: 0, revenue: 0 }
    );
    totalDsp.revenue = Number(totalDsp.revenue.toFixed(2));
    byDsp.push(totalDsp);

    // ========== Territory Aggregation ==========
    const territoryMap = {};
    data?.forEach((entry) => {
      entry.byTerritory.forEach((t) => {
        if (!territoryMap[t.territory]) {
          territoryMap[t.territory] = { revenue: 0, streams: 0 };
        }
        territoryMap[t.territory].revenue += t.revenue;
        territoryMap[t.territory].streams += t.streams;
      });
    });

    let byTerritory = Object.entries(territoryMap).map(
      ([territory, { revenue, streams }]) => ({
        territory,
        revenue: Number(revenue.toFixed(2)),
        streams,
      })
    );

    // sort territory data (highest first)
    byTerritory.sort(
      (a, b) => b.streams + b.revenue - (a.streams + a.revenue)
    );

    // add total row for territory
    const totalTerritory = byTerritory.reduce(
      (acc, item) => {
        acc.streams += item.streams;
        acc.revenue += item.revenue;
        return acc;
      },
      { territory: "TOTAL", streams: 0, revenue: 0 }
    );
    totalTerritory.revenue = Number(totalTerritory.revenue.toFixed(2));
    byTerritory.push(totalTerritory);

    // ========== Global Total Summary ==========
    const totalSummaryData = data?.reduce(
      (acc, entry) => {
        acc.streams += entry?.totalStreams || 0;
        acc.revenue += entry?.totalRevenue || 0;
        return acc;
      },
      { total: "TOTAL", streams: 0, revenue: 0 }
    );

    totalSummaryData.revenue = Number(totalSummaryData.revenue.toFixed(2));

    // ========== Save State ==========
    setTableData(byDsp);
    setDspTableData(byDsp);
    setTerritoryTableData(byTerritory);
    setTotalSummary([totalSummaryData]);
};


  // Getting Analytics Chart and Table Data From API ________
  const [chartDataStreams, setChartDataStreams] = useState();
  const [chartDataRevenue, setChartDataRevenue] = useState();
  const [years, setYears] = useState(Math.max(...yearsList));
  const [dataNotFound, setDataNotFound] = useState(false);
  useEffect(() => {
    setDataNotFound(false);
    if (data?.UPC) {
      // console.log("yes go");
      axios
        .get(
          `https://dream-records-2025-m2m9a.ondigitalocean.app/common/api/v1/analytics-and-balance/upc-analytics?UPC=${data?.UPC}&years=${years}`
        )
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.data);
            if (isEmptyArray(res?.data?.data)) setDataNotFound(true);
            dspAndTerittoriGet(res?.data?.data);
            const rawData = res?.data?.data;
            const streamsData = rawData
              ?.map((item) => ({
                month: item.reportsDate,
                value: item.totalStreams,
              }))
              .sort((a, b) => new Date(a.month) - new Date(b.month));

            const revenewData = rawData
              ?.map((item) => ({
                month: item.reportsDate,
                value: item.totalRevenue,
              }))
              .sort((a, b) => new Date(a.month) - new Date(b.month));

            setChartDataStreams(streamsData);
            setChartDataRevenue(revenewData);
          }
        });
    }
  }, [data?.UPC, years]);

  // Change Status and Reject Function____________________________________
  // _____________________________________________________________________
  // Move to QC Approval Releae Function_______________________________________
  const { userData } = useSelector((state) => state.userData);
  const moveToQC = (id) => {
    const payload = {
      status: "QC Approval",
      qcApprovalAdminInfo: {
        adminEmail: userData?.email,
        adminUserName: userData?.userName,
        adminId: userData?._id,
        updatedAt: new Date().toISOString(),
      },
    };
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-status/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          setReFetchData(reFetchData + 1);
        }
      });
  };

  // Move to Review Releae Function_______________________________________
  const moveToReview = (id) => {
    const payload = {
      status: "Review",
      reviewAdminInfo: {
        adminEmail: userData?.email,
        adminUserName: userData?.userName,
        adminId: userData?._id,
        updatedAt: new Date().toISOString(),
      },
    };
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-status/${id}`,
        payload
      )
      .then((res) => {
        if (res.status == 200) {
          setReFetchData(reFetchData + 1);
        }
      });
  };

  const closeRef = useRef(null);

  const modalCss = {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "1100px",
    overflowY: "auto",
    maxHeight: "90vh",
    scrollbarWidth: "thin",
    zIndex: "3",
    width: "80%",
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      upc: data?.UPC || "",
      isrc: data?.tracks?.map((track) => track.ISRC) || [],
    },
  });

  // Move to Live form submit handler
  const onMoveToLiveSubmit = (formData) => {
    const payload = {
      status: "Live",
      liveAdminInfo: {
        adminEmail: userData?.email,
        adminUserName: userData?.userName,
        adminId: userData?._id,
        updatedAt: new Date().toISOString(),
      },
      UPC: formData.upc,
      ISRC: formData.isrc,
    };

    // Send to backend
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-status/${id}`,
        payload
      )
      .then((res) => {
        if (res.status === 200) {
          setReFetchData(reFetchData + 1);
        }
      });

    reset();
    closeRef.current?.click();
  };

  if (loading) return <LoadingScreen />;

  return (
    <div>
      <div
        className="main-content createRelease-content-div createRelease-overview-div"
        style={{ marginBottom: "20px" }}
      >
        {(data?.rejectionReasons && (data.status === 'Error' || data.status === 'Blocked' || data.status === 'Takedown' || data?.status === "QC Approval")) &&
          data?.rejectionReasons?.map((d, index) => (
            <div key={index} className="notice">
              <FiAlertTriangle />
              <p
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: d }}
              ></p>
            </div>
          ))}
        {(data?.actionReqHistory && (data.status === 'Error' || data.status === 'Blocked' || data.status === 'Takedown' || data?.status === "QC Approval")) &&
          data?.actionReqHistory?.map((d, index) => (
            <div key={index} className="notice">
              <FiAlertTriangle />
              <p
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: d }}
              ></p>
            </div>
          ))}
        <div className="d-flex release-overview-img-div">
          <div>
            <img src={cdnLink(data?.key)} alt="" className="release-overview-img" />
          </div>
          <div className="d-flex" style={{ width: "100%" }}>
            <div>
              <span
                className={`status card-type-txt ${data?.status?.toLowerCase()}`}
                style={
                  data?.status == "Takedown"
                    ? { background: "#FEEBEC", color: "#E5484D" }
                    : data?.status == "Error"
                    ? { background: "#FFEBD8", color: "#E5484D" }
                    : data?.status == "Blocked"
                    ? { background: "#FFEBD8", color: "#E5484D" }
                    : data?.status == "QC Approval"
                    ? { background: "#FFEBD8", color: "#FFA552" }
                    : data?.status == "Live"
                    ? { background: "#E6F6EB", color: "#2B9A66" }
                    : data?.status == "Review"
                    ? { background: "#D5EFFF", color: "#0090FF" }
                    : data?.status == "Action Required"
                    ? { background: "#E8E8E8", color: "#8D8D8D" }
                    : { background: "#E6F6EB", color: "#2B9A66" }
                }
              >
                {data?.status}
              </span>
              {
                data?.reviewAdminInfo &&
                <span style={{color: '#838383', marginLeft: '10px', fontSize: '16px'}}>Reviewed by: {data?.reviewAdminInfo?.adminUserName}</span> 
              }
              {
                data?.blockedAdminInfo &&
                <span style={{color: '#838383', marginLeft: '10px', fontSize: '16px'}}>Blocked by: {data?.blockedAdminInfo?.adminUserName}</span> 
              }
              {
                data?.errorAdminInfo &&
                <span style={{color: '#838383', marginLeft: '10px', fontSize: '16px'}}>Error by: {data?.errorAdminInfo?.adminUserName}</span> 
              }
              {
                data?.takedownAdminInfo &&
                <span style={{color: '#838383', marginLeft: '10px', fontSize: '16px'}}>Takedown by: {data?.takedownAdminInfo?.adminUserName}</span> 
              }
              <br />
              <h1>{data?.releaseTitle}</h1>
              <h2>
                {
                [...new Set(
                  data?.tracks?.flatMap(track =>
                    track?.artist?.map(a => a.artistName)
                  )
                )].join(', ')
              }
              {
                [...new Set(
                  data?.tracks?.flatMap(track =>
                    track?.primaryArtist?.map(a => a.artistName)
                  )
                )].join(', ')
              }
              </h2>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="dropdown-trigger singleArtist-dropdown-btn"
                  style={{ marginRight: 0 }}
                >
                  <img src={threeDotImg} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content
                align="left"
                side="bottom"
                className="dropdown-content qcApproval-dropdown-content"
              >
                <DropdownMenu.Item className="dropdown-item">
                  <div>
                    <a
                      href={cdnLink(data?.key)}
                      download={`${cdnLink(data?.key)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <LuImageDown /> Download Artwork
                    </a>
                  </div>
                </DropdownMenu.Item>
                <hr style={{ margin: 0 }} />
                {(data?.status === "Review" ||
                  data?.status === "Blocked" ||
                  data?.status === "Error" ||
                  data?.status === "Takedown") && (
                  <DropdownMenu.Item
                    onClick={() => moveToQC(data?._id)}
                    className="dropdown-item"
                  >
                    <div>
                      <FiArrowLeft style={{ color: "black" }} />
                      <span>Move to QC Approval</span>
                    </div>
                  </DropdownMenu.Item>
                )}
                {(data?.status === "QC Approval" ||
                  data?.status === "Live") && (
                  <DropdownMenu.Item
                    onClick={() => moveToReview(data?._id)}
                    className="dropdown-item"
                  >
                    <div>
                      {data?.status === "QC Approval" ? (
                        <FiArrowRight style={{ color: "black" }} />
                      ) : (
                        <FiArrowLeft style={{ color: "black" }} />
                      )}
                      <span>Move to Review</span>
                    </div>
                  </DropdownMenu.Item>
                )}
                {(data?.status === "Review") && (
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
                        {data?.status === "Review" ? (
                          <FiArrowRight style={{ color: "black" }} />
                        ) : (
                          <FiArrowLeft style={{ color: "black" }} />
                        )}
                        <span style={{ color: "black" }}>Move to Live</span>
                      </Dialog.Trigger>
                      <Modal title="Move to Live">
                        <div className="singleRelease-reject-modal">
                          <form onSubmit={handleSubmit(onMoveToLiveSubmit)}>
                            <div className="singleRelease-reject-modal">
                              <label>
                                UPC:
                                <input
                                  {...register("upc", {
                                    required: "UPC is required",
                                  })}
                                  defaultValue={data?.UPC}
                                  style={{ width: "100%", marginBottom: 8 }}
                                />
                                {errors.upc && (
                                  <span style={{ color: "red" }}>
                                    {errors.upc.message}
                                  </span>
                                )}
                              </label>
                              {data?.tracks?.map((track, idx) => (
                                <label
                                  key={track._id || idx}
                                  style={{ display: "block", marginTop: 12 }}
                                >
                                  ISRC for Track {idx + 1} (
                                  {track.tittle || "Untitled"}):
                                  <input
                                    {...register(`isrc.${idx}`, {
                                      required: "ISRC is required",
                                    })}
                                    defaultValue={track.ISRC}
                                    style={{ width: "100%", marginBottom: 4 }}
                                  />
                                  {errors.isrc && errors.isrc[idx] && (
                                    <span style={{ color: "red" }}>
                                      {errors.isrc[idx].message}
                                    </span>
                                  )}
                                </label>
                              ))}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "20px",
                              }}
                            >
                              <Dialog.Close asChild>
                                <button
                                  type="button"
                                  style={{
                                    padding: "10px 20px",
                                    borderRadius: "6px",
                                    border: "1px solid red",
                                  }}
                                  onClick={() => reset()}
                                >
                                  Cancel
                                </button>
                              </Dialog.Close>
                              <button type="submit" className="theme-btn">
                                Move to Live
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* Hidden Dialog.Close for programmatic close */}
                        <Dialog.Close asChild>
                          <button ref={closeRef} style={{ display: "none" }} />
                        </Dialog.Close>
                      </Modal>
                    </Dialog.Root>
                  </DropdownMenu.Item>
                )}
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
                      {/* Reject Release Componets start_______________________ */}
                      {/* _____________________________________________________ */}

                      <ReleaseStatusSuspendForm
                        id={data?._id}
                        closeRef={closeRef}
                        releaseData={data}
                      />

                      {/* Reject Release Componets End_______________________ */}
                      {/* _____________________________________________________ */}

                      {/* Hidden Dialog.Close for programmatic close */}
                      <Dialog.Close asChild>
                        <button ref={closeRef} style={{ display: "none" }} />
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
          <Dialog.Root>
            <Dialog.Trigger
              style={{
                background: "none",
                border: "none",
                padding: 0,
              }}
              className="dropdown-item"
            >
              <span className="singleRelease-editAlbum-btn">
                <GoPencil /> Edit Album
              </span>
            </Dialog.Trigger>
            <Dialog.Portal style={{ padding: "100px" }}>
              <Dialog.Overlay className="modal-overlay" />
              <Dialog.Content style={modalCss}>
                {releaseAlbumInfo && (
                  <AlbumInfoEditComponent
                    closeRef={closeRef}
                    releaseAlbumInfo={releaseAlbumInfo}
                  />
                )}
                {/* Hidden Dialog.Close for programmatic close */}
                <Dialog.Close asChild>
                  <button ref={closeRef} style={{ display: "none" }} />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <div className="release-album-info-row">
          <div className="d-flex">
            <p>Release Tittle::</p>
            <p>{data?.releaseTitle}</p>
          </div>
          <div className="d-flex">
            <p>Version/Subtittle:</p>
            <p>{data?.subTitle}</p>
          </div>
          {/* <div className="d-flex">
            <p>Primary Artist:</p>
            <p>
              {data?.artist?.map((artist) => artist.artistName).join(", ")}{" "}
              {data?.primaryArtist
                ?.map((artist) => artist.artistName)
                .join(", ")}
            </p>
          </div> */}
          <div className="d-flex">
            <p>Format:</p>
            <p>{data?.format}</p>
          </div>
          {/* <div className="d-flex">
            <p>Featuring:</p>
            <p>
              {data?.featuring?.map((artist) => artist.artistName).join(", ")}{" "}
              {data?.featureing?.map((artist) => artist.artistName).join(", ")}
            </p>
          </div> */}
          <div className="d-flex">
            <p>℗ line:</p>
            <p>{data?.pLine}</p>
          </div>
          <div className="d-flex">
            <p>Genre:</p>
            <p>{data?.genre}</p>
          </div>
          <div className="d-flex">
            <p>© line:</p>
            <p>{data?.cLine}</p>
          </div>
          <div className="d-flex">
            <p>Sub Genre:</p>
            <p>{data?.subGenre}</p>
          </div>
          <div className="d-flex">
            <p>Production Year:</p>
            <p>{data?.productionYear}</p>
          </div>
          <div className="d-flex">
            <p>Label Name:</p>
            <p>
              {data?.labels?.map((label) => label.labelName).join(", ")}{" "}
              {data?.label?.map((label) => label.labelName).join(", ")}
            </p>
          </div>
          <div className="d-flex">
            <p>UPC/EAN</p>
            <p>{data?.UPC}</p>
          </div>
          <div className="d-flex">
            <p>Release Date:</p>
            <p>
              {data?.releaseDate
                ? localDate(data.releaseDate)
                : data?.releaseOption}
            </p>
          </div>
          {/* <div className="d-flex">
            <p>Producer Catalog Number:</p>
            <p>1111111111</p>
          </div> */}
        </div>
        <hr />
        <h3 className="release-album-title">Tracks</h3>
        <br />
        {tracksInfo &&
          tracksInfo?.map((track, index) => (
            <div key={index}>
              <TrackViewCollapsSection track={track} index={index} />
            </div>
          ))}
      </div>
      <div className="release-analytics">
        <Collapsible.Root
          defaultOpen={true}
          onOpenChange={setAnalyticsCollapse}
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
                <h2>{data?.totalStreams ? data?.totalStreams : 0}</h2>
              </div>
              <div className="analytics-card">
                <h6>Total Revenue</h6>
                <h2>&#8377; {data?.totalRevenue ? data?.totalRevenue?.toFixed(2) : 0}</h2>
              </div>
            </div>
            <Tabs.Root
              className="tabs-root singleRelease-tabs"
              defaultValue="Streams"
            >
              <Tabs.List className="tabs-list">
                <div className="singleRelease-tabsList">
                  <Tabs.Trigger className="tabs-trigger" value="Streams">
                    Streams
                  </Tabs.Trigger>
                  <Tabs.Trigger className="tabs-trigger" value="Revenue">
                    Revenue
                  </Tabs.Trigger>
                  <div className="d-flex" style={{ width: "100%" }}>
                    <div style={{ width: "100%" }}>
                      {" "}
                      <label htmlFor="">Period</label>
                      <Select.Root
                        defaultValue={Math.max(...yearsList)}
                        onValueChange={(value) => setYears(value.toString())}
                      >
                        <Select.Trigger className={`dropdown-trigger`}>
                          <Select.Value />
                          <Select.Icon className="select-icon">
                            <ChevronDown />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content
                            className="dropdown-content"
                            style={{ padding: 0, overflowY: "auto" }}
                          >
                            <Select.Viewport>
                              {yearsList?.map((option, index) => (
                                <Select.Item
                                  key={index}
                                  value={option}
                                  className="select-item"
                                >
                                  <Select.ItemText>{option}</Select.ItemText>
                                  <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              ))}
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                    <div style={{ width: "100%" }}>
                      <label htmlFor="">By</label>
                      <Select.Root
                        defaultValue="DSP"
                        onValueChange={(value) => {
                          if (value === "DSP") {
                            setTableData(dspTableData);
                            setTableColumn(dspColumn);
                          }
                          if (value === "Territory") {
                            setTableData(territoryTableData);
                            setTableColumn(territoryColumn);
                          }
                          if (value === "Total") {
                            setTableData(totalSummary);
                            setTableColumn(totalRevineuStreamColumn);
                          }
                        }}
                      >
                        <Select.Trigger className={`dropdown-trigger`}>
                          <Select.Value placeholder="Filter by DSP/Territory" />
                          <Select.Icon className="select-icon">
                            <ChevronDown />
                          </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                          <Select.Content
                            className="dropdown-content"
                            style={{ padding: 0, overflowY: "auto" }}
                          >
                            <Select.Viewport>
                              <Select.Item value="DSP" className="select-item">
                                <Select.ItemText>DSP</Select.ItemText>
                                <Select.ItemIndicator className="select-item-indicator">
                                  <Check size={18} />
                                </Select.ItemIndicator>
                              </Select.Item>
                              <Select.Item
                                value="Territory"
                                className="select-item"
                              >
                                <Select.ItemText>Territory</Select.ItemText>
                                <Select.ItemIndicator className="select-item-indicator">
                                  <Check size={18} />
                                </Select.ItemIndicator>
                              </Select.Item>
                              <Select.Item
                                value="Total"
                                className="select-item"
                              >
                                <Select.ItemText>Total</Select.ItemText>
                                <Select.ItemIndicator className="select-item-indicator">
                                  <Check size={18} />
                                </Select.ItemIndicator>
                              </Select.Item>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                    </div>
                  </div>
                </div>
              </Tabs.List>

              <Tabs.Content className="tabs-content" value="Streams">
                {dataNotFound === false && (
                  <>
                    <Chart chartData={chartDataStreams} />
                    <SingleReleasePageTable
                      columns={tableColumn}
                      data={tableData}
                    />
                  </>
                )}
                {dataNotFound === true && <NotFoundPage />}
              </Tabs.Content>
              <Tabs.Content className="tabs-content" value="Revenue">
                {dataNotFound === false && (
                  <>
                    <Chart chartData={chartDataRevenue} />
                    <SingleReleasePageTable
                      columns={tableColumn}
                      data={tableData}
                    />
                  </>
                )}
                {dataNotFound === true && <NotFoundPage />}
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

{
  /* <div className="singleRelease-reject-modal">
                        <p className="modal-description">
                          Please fix the issue indicated below and then don’t
                          forget to re-submit your release for distribution.
                        </p>
                        <label className="singleRelease-modal-label" htmlFor="">
                          Reject Type
                        </label>
                        <Select.Root
                          onValueChange={(value) => {
                            setRejectType(value);
                            setErrorRejectType("");
                          }}
                        >
                          <Select.Trigger
                            className={`dropdown-trigger analytics-modal-dropdown`}
                          >
                            <Select.Value placeholder={"Select Reject Type"} />
                            <Select.Icon className="select-icon">
                              <ChevronDown />
                            </Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content
                              className="dropdown-content"
                              style={{
                                padding: 0,
                                overflowY: "auto",
                                zIndex: "123",
                              }}
                            >
                              <Select.Viewport>
                                <Select.Item
                                  value="Error"
                                  className="select-item"
                                >
                                  <Select.ItemText>Error</Select.ItemText>
                                  <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                                <Select.Item
                                  value="Takedown"
                                  className="select-item"
                                >
                                  <Select.ItemText>Takedown</Select.ItemText>
                                  <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                                <Select.Item
                                  value="Blocked"
                                  className="select-item"
                                >
                                  <Select.ItemText>Blocked</Select.ItemText>
                                  <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                        {errorRejectType && (
                          <p style={{ color: "red" }}>{errorRejectType}</p>
                        )}

                        <label className="singleRelease-modal-label" htmlFor="">
                          Describe issue here *
                        </label>
                        <textarea
                          placeholder="Write your issue here"
                          style={{ width: "100%" }}
                          value={rejectInputText}
                          onChange={(e) => {
                            setRejectInputText(e.target.value);
                            setErrorRejectInputText("");
                          }}
                          onKeyDown={(e) => e.stopPropagation()}
                        ></textarea>
                        {errorRejectInputText && (
                          <p style={{ color: "red" }}>{errorRejectInputText}</p>
                        )}
                      </div>
                      <button
                        onClick={() => rejectRelease(data)}
                        className="close-button"
                      >
                        Reject
                      </button> */
}
