import { Flex } from "@radix-ui/themes";
import PieChartComponent from "../../../components/PieChartComponent";
import { DistributionOverviewContent } from "../../../data";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReleaseCard from "../../../components/ReleaseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import formatNumber from "../../../hooks/formatNumber";

function DistributionOverview({ releaseItems }) {
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


  const [releaseSummary, setReleaseSummary] = useState();
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/api/v1/summary`)
    .then(res => {
      if(res.status === 200){
        setReleaseSummary(res.data.data)
      }
    })
  },[])
  return (
    <div>
      <div className="distribution-card-grid">
        {releaseSummary?.releaseByStatus?.map((item, index) => (
          <div key={index} className="home-card">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <div
                className="card-circle"
                style={
                  item.name === "QC Approval"
                    ? { background: "#FFA552" }
                    : item.name === "In Review"
                    ? { background: "#2B9A66" }
                    : item.name === "To Live"
                    ? { background: "#EA3958" }
                    : { background: "#838383" }
                }
              ></div>
              <p
                style={
                  item.name === "QC Approval"
                    ? { color: "#FFA552" }
                    : item.name === "In Review"
                    ? { color: "#2B9A66" }
                    : item.name === "To Live"
                    ? { color: "#EA3958" }
                    : { color: "#838383" }
                }
              >
                {item.name}
              </p>
            </div>
            <h1>{formatNumber(item.count)}</h1>
          </div>
        ))}
      </div>
      <PieChartComponent/>
      <Flex as="span" className="artists-flex">
        <p>Latest Releases</p>
        <Link href="#">See All</Link>
      </Flex>
      <ReleaseCard releaseItems={releaseItems.slice(0, releaseVisibleCount)} />
      <br />
      <br />
    </div>
  );
}
DistributionOverview.propTypes = {
  releaseItems: PropTypes.array.isRequired,
};
export default DistributionOverview;
