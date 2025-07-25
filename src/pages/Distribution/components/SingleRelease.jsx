import * as Collapsible from "@radix-ui/react-collapsible";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Dialog, Tabs } from "radix-ui";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SelectDropdown from "../../../components/SelectDropdown";
import Chart from "./Chart";
import Modal from "../../../components/Modal";
import { FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { LuImageDown } from "react-icons/lu";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import threeDotImg from '../../../assets/icons/vertical-threeDots.png'
import localDate from "../../../hooks/localDate";
import TrackViewCollapsSection from "../../../components/TrackViewCollapsSection";
import { useSelector } from "react-redux";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import SingleReleasePageTable from "../../../components/SingleReleasePageTable";
import isEmptyArray from "../../../hooks/isEmptyArrayCheck";
import NotFoundPage from "../../../components/NotFoundPage";

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


  const {id} = useParams();
  const { yearsList } = useSelector(state => state.yearsAndStatus); 


  const [analyticsCollapse, setAnalyticsCollapse] = useState(true);

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState();
  const [trackData, setTrackData] = useState();
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/api/v1/release/single/${id}`)
    .then(res => {
      setData(res.data.data)
      setTrackData(res?.data?.data?.tracks)
      if(res.data.data.audioUrl){
        const audioUrl = res.data.data.audioUrl;
        const tittle = res.data.data.releaseTitle;
        const artist = res.data.data.artist;
        const labels = res.data.data.labels;
        const featuring = res.data.data.featuring;
        const genre = res.data.data.genre;
        setTrackData([{audioUrl, tittle, artist, labels, genre, featuring}])
      }
      setLoading(false)
    })
  },[id])


  // Analytics Table Componet Data Process_________________
  const [tableColumn, setTableColumn] = useState(dspColumn);
  const [tableData, setTableData] = useState();
  const [dspTableData, setDspTableData] = useState()
  const [territoryTableData, setTerritoryTableData] = useState()
  const [totalSummary, setTotalSummary] = useState();
  const dspAndTerittoriGet = (data) => {
    // DSP Aggregation
    const dspMap = {};
    data?.forEach(entry => {
      entry.byDSP.forEach(dsp => {
        if (!dspMap[dsp.dsp]) {
          dspMap[dsp.dsp] = { revenue: 0, streams: 0 };
        }
        dspMap[dsp.dsp].revenue += dsp.revenue;
        dspMap[dsp.dsp].streams += dsp.streams;
      });
    });

    const byDsp = Object.entries(dspMap).map(([dsp, { revenue, streams }]) => ({
      dsp,
      revenue: Number(revenue.toFixed(2)),
      streams
    }));

    // =============== Territory Aggregation ==============
    const territoryMap = {};
    data?.forEach(entry => {
      entry.byTerritory.forEach(t => {
        if (!territoryMap[t.territory]) {
          territoryMap[t.territory] = { revenue: 0, streams: 0 };
        }
        territoryMap[t.territory].revenue += t.revenue;
        territoryMap[t.territory].streams += t.streams;
      });
    });

    const byTerritory = Object.entries(territoryMap).map(([territory, { revenue, streams }]) => ({
      territory,
      revenue: Number(revenue.toFixed(2)),
      streams
    }));

    // ================= Total Summary =================
    const totalSummaryData = data?.reduce(
      (acc, entry) => {
        acc.streams += entry.summary?.streams || 0;
        acc.revenue += entry.summary?.revenue || 0;
        return acc;
      },
      { total: 'Total', streams: 0, revenue: 0 }
    );
    totalSummaryData.revenue = Number(totalSummaryData.revenue.toFixed(2));

    setTableData(byDsp)
    setDspTableData(byDsp);
    setTerritoryTableData(byTerritory);
    setTotalSummary([totalSummaryData])
  }

  // Getting Analytics Chart and Table Data From API ________
  const [chartDataStreams, setChartDataStreams] = useState();
  const [chartDataRevenue, setChartDataRevenue] = useState();
  const [totalStreams, setTotalStreams] = useState()
  const [totalRevenue, setTotalRevenue] = useState();
  const [years, setYears] = useState(Math.max(...yearsList));
  const [dataNotFound, setDataNotFound] = useState(false)
  useEffect(() => {
    setDataNotFound(false)
    if(data?.UPC){
      axios.get(`http://localhost:5000/common/api/v1/analytics-and-balance/upc-analytics?UPC=${data?.UPC}&years=${years}`)
      .then(res => {
        if(res.status === 200){
          if(isEmptyArray(res?.data?.data))setDataNotFound(true)
          setTotalStreams(res?.data?.totalRevenue)
          setTotalRevenue(res?.data?.totalStreams)
          dspAndTerittoriGet(res?.data?.data)

          const rawData = res?.data?.data
          const streamsData = rawData?.map(item => ({
            month: item.date,
            value: item.summary.streams,
          })).sort((a, b) => new Date(a.month) - new Date(b.month))
    
          const revenewData = rawData?.map(item => ({
            month: item.date,
            value: item.summary.revenue,
          })).sort((a, b) => new Date(a.month) - new Date(b.month))
  
          setChartDataStreams(streamsData)
          setChartDataRevenue(revenewData)
        }
      })
    }
  },[data?.UPC, years])


  if(loading)return <LoadingScreen/>

  return (
    <div>
      <div
        className="main-content createRelease-content-div createRelease-overview-div"
        style={{ marginBottom: "20px" }}
      >

          <>
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
        <div className="d-flex release-overview-img-div">
          <div>
            <img
              src={data?.imgUrl}
              alt=""
              className="release-overview-img"
            />
          </div>
          <div className="d-flex" style={{ width: "100%" }}>
            <div>
              <span
                className={`status card-type-txt ${data?.status.toLowerCase()}`}
                style={
                    data?.status == "Takedown"
                    ? { background: "#FEEBEC", color: "#E5484D" }
                    : data?.status == "Pending" || data?.status == "QC Approval"
                    ? { background: "#FFEBD8", color: "#FFA552" }
                    : data?.status == "Live" || data?.status == 'Approved' 
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
              <br />
              <h1>{data?.releaseTitle}</h1>
              <h2>{data?.artist?.map(artist => artist.artistName).join(', ')}</h2>
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
                    <LuImageDown /> Download Artwork
                  </div>
                </DropdownMenu.Item>
                <hr style={{ margin: 0 }} />
                <DropdownMenu.Item className="dropdown-item">
                  <div>
                    {
                      data?.status === 'QC Approval' || data?.status === 'Pending' &&
                      <><FiArrowRight /> <span>Move to Review</span></>
                    }
                    {
                      data?.status === 'Review' &&
                      <><FiArrowRight /> <span>Move to Live</span></>
                    }
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
          <div className="d-flex">
            <p>Release Tittle::</p>
            <p>{data?.releaseTitle}</p>
          </div>
          <div className="d-flex">
            <p>Version/Subtittle:</p>
            <p>{data?.subTitle}</p>
          </div>
          <div className="d-flex">
            <p>Primary Artist:</p>
            <p>{data?.artist?.map(artist => artist.artistName).join(', ')}</p>
          </div>
          <div className="d-flex">
            <p>Format:</p>
            <p>{data?.format}</p>
          </div>
          <div className="d-flex">
            <p>Featuring:</p>
            <p>{data?.featuring?.map(artist => artist.artistName).join(', ')} {data?.featureing?.map(artist => artist.artistName).join(', ')}</p>
          </div>
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
            <p>{data?.labels?.map(label => label.labelName).join(', ')} {data?.label?.map(label => label.labelName).join(', ')}</p>
          </div>
          <div className="d-flex">
            <p>UPC/EAN</p>
            <p>{data?.UPC}</p>
          </div>
          <div className="d-flex">
            <p>Release Date:</p>
            <p>{data?.releaseDate ? localDate(data.releaseDate) : data?.releaseOption}</p>
          </div>
          <div className="d-flex">
            <p>Producer Catalog Number:</p>
            <p>1111111111</p>
          </div>
        </div>
        <hr />
        <h3 className="release-album-title">Tracks</h3>
        <br />
        {
          trackData &&
          trackData?.map((track, index) => 
            <div key={index}>
              <TrackViewCollapsSection track={track} index=''/>
            </div>
          )
        }
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
                <h2>{totalStreams ? totalStreams : 0}</h2>
              </div>
              <div className="analytics-card">
                <h6>Total Revenue</h6>
                <h2>€ {totalRevenue ? totalRevenue : 0}</h2>
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

                      <Select.Root defaultValue={Math.max(...yearsList)} onValueChange={(value) => setYears(value.toString())}>
                        <Select.Trigger className={`dropdown-trigger`}>
                          <Select.Value/>
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
                                <Select.Item key={index} value={option} className="select-item">
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
                      <Select.Root defaultValue="DSP" onValueChange={(value) => {
                          if(value === 'DSP'){setTableData(dspTableData); setTableColumn(dspColumn)}
                          if(value === 'Territory'){setTableData(territoryTableData); setTableColumn(territoryColumn)}
                          if(value === 'Total'){setTableData(totalSummary); setTableColumn(totalRevineuStreamColumn)}
                      }}>
                        <Select.Trigger className={`dropdown-trigger`}>
                          <Select.Value placeholder='Filter by DSP/Territory'/>
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
                                <Select.Item value='DSP' className="select-item">
                                  <Select.ItemText>DSP</Select.ItemText>
                                  <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                                <Select.Item value='Territory' className="select-item">
                                  <Select.ItemText>Territory</Select.ItemText>
                                  <Select.ItemIndicator className="select-item-indicator">
                                    <Check size={18} />
                                  </Select.ItemIndicator>
                                </Select.Item>
                                <Select.Item value='Total' className="select-item">
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
                {
                  dataNotFound === false &&
                  <>
                    <Chart chartData={chartDataStreams} />
                    <SingleReleasePageTable columns={tableColumn} data={tableData}/>
                  </>
                }
                {
                  dataNotFound === true && <NotFoundPage/>
                }
              </Tabs.Content>
              <Tabs.Content className="tabs-content" value="Revenue">
                {
                  dataNotFound === false && 
                  <>
                    <Chart chartData={chartDataRevenue} />
                    <SingleReleasePageTable columns={tableColumn} data={tableData}/>
                  </>
                }
                {
                  dataNotFound === true && <NotFoundPage/>
                }
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
