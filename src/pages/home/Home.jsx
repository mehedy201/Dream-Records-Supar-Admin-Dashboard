import { InfoCircledIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import "./Home.css";
import ReleaseCard from "../../components/ReleaseCard";
import { Flex } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import PieChartComponent from "../../components/PieChartComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingScreen from "../../components/LoadingScreen";
import formatNumber from "../../hooks/formatNumber";
import NotFoundPage from "../../components/NotFoundPage";

function Home() {
  const [releaseVisibleCount, setReleaseVisibleCount] = useState(
    getReleaseInitialCount()
  );
  function getReleaseInitialCount() {
    const width = window.innerWidth;
    if (width <= 540) {
      return 2;
    } else if (width <= 740) {
      return 3;
    } else if (width <= 830) {
      return 4;
    } else if (width <= 991) {
      return 3;
    } else if (width <= 1216) {
      return 4;
    } else {
      return 5;
    }
  }
  useEffect(() => {
    const handleResize = () => {
      setReleaseVisibleCount(getReleaseInitialCount());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [adminSummary, setAdminSummary] = useState();
  const [overView, setOverView] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/admin/api/v1/summary`)
    .then(res => {
      if(res.status === 200){
        setAdminSummary(res.data.data)
        const statusBasedReleaseCount = res.data.data.releaseByStatus
        const labelsWithdrawalServiceRequestPendingCount = res.data.data.labelsWithdrawalServiceRequestPendingCount
        const totalOverView = [...statusBasedReleaseCount, ...labelsWithdrawalServiceRequestPendingCount]
        console.log(totalOverView)
        setOverView(totalOverView)
        setLoading(false)
      }
    })
  },[])

  if(loading)return <LoadingScreen/>


  return (
    <div className="main-content">
      <div className="notice">
        <InfoCircledIcon />
        <p>
          We are upgrading our platform to enhance your experience. You may
          notice new user interfaces appearing periodically. Thank you for your
          patience as we make these improvements.
        </p>
      </div>
      {/* <section className="hero">
        <div>
          <h1>Hi, Subhamay</h1>
          <p>Welcome to Dream Records</p>
        </div>
      </section> */}
      <div className="home-card-grid">
        {
          overView &&
          overView?.map((item, index) => (
          <div key={index} className="home-card">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <div>
                <div
                  className="card-circle"
                  style={
                    item.name === "QC Approval"
                      ? { background: "#FFA552" }
                      : item.name === "In Review"
                      ? { color: "#2B9A66" }
                      : item.name === "To Live"
                      ? { color: "#EA3958" }
                      : item.name === "New Users"
                      ? { background: "#0090FF" }
                      : item.name === "Labels"
                      ? { background: "#775DD0" }
                      : item.name === "Withdrawal Request"
                      ? { background: "#2B9A66" }
                      : item.name === "Service Request"
                      ? { background: "#EA3958" }
                      : { background: "#838383" }
                  }
                ></div>
              </div>
              <p
                style={
                  item.name === "QC Approval"
                    ? { color: "#FFA552" }
                    : item.name === "In Review"
                    ? { color: "#2B9A66" }
                    : item.name === "To Live"
                    ? { color: "#EA3958" }
                    : item.name === "New Users"
                    ? { color: "#0090FF" }
                    : item.name === "Labels"
                    ? { color: "#775DD0" }
                    : item.name === "Withdrawal Request"
                    ? { color: "#2B9A66" }
                    : item.name === "Service Request"
                    ? { color: "#EA3958" }
                    : { color: "#838383" }
                }
              >
                {item.name}
              </p>
            </div>
            <h1>{item.count}</h1>
          </div>
        ))
        }
      </div>

      {
        adminSummary &&
        <PieChartComponent releaseSummary={adminSummary}/>
      }
      <Flex as="span" className="artists-flex">
        <p>Latest Releases</p>
        <Link href="#">See All</Link>
      </Flex>
      {
        !adminSummary && 
        <NotFoundPage/> 
      }
      <ReleaseCard releaseItems={adminSummary?.latestReleases} />
      <br />
      <br />
    </div>
  );
}
Home.propTypes = {
  homeCardContent: PropTypes.array.isRequired,
  releaseItems: PropTypes.array.isRequired,
};
export default Home;
