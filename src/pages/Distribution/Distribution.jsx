import "./Distribution.css";
// import { Theme, SegmentedControl, Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import QcApproval from "./components/QcApproval";
import InReviewPage from "./components/InReviewPage";
// import BarcodePage from "./components/BarcodePage";
import ToLivePage from "./components/ToLivePage";
import InIssuePage from "./components/InIssuePage";
import DistributionOverview from "./components/DistributionOverview";
import PropTypes from "prop-types";
function Distribution({ releaseItems }) {
  const [value, setValue] = useState("QCApproval");
  const [thumbStyle, setThumbStyle] = useState({ left: 0 });

  const QCApproval = useRef(null);
  const InReview = useRef(null);
  const Barcode = useRef(null);
  const ToLive = useRef(null);
  const InIssue = useRef(null);

  useEffect(() => {
    let currentBtn = null;
    if (value === "QCApproval") currentBtn = QCApproval.current;
    if (value === "InReview") currentBtn = InReview.current;
    if (value === "Barcode") currentBtn = Barcode.current;
    if (value === "ToLive") currentBtn = ToLive.current;
    if (value === "InIssue") currentBtn = InIssue.current;

    if (currentBtn) {
      const { offsetLeft, offsetWidth } = currentBtn;
      setThumbStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [value]);

  return (
    <div className="main-content">
      <h2 style={{ fontWeight: "500", fontSize: "24px" }}>Distribution</h2>
      <Tabs.Root
        className="tabs-root"
        defaultValue="TrackDetails"
        style={{ marginTop: 0 }}
      >
        <Tabs.List className="tabs-list">
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="TrackDetails"
          >
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger distribution-tabs-trigger"
            value="Credits"
          >
            Queue
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="tabs-content" value="TrackDetails">
          <div className="release-track-details">
            <DistributionOverview releaseItems={releaseItems} />
          </div>
        </Tabs.Content>
        <Tabs.Content className="tabs-content" value="Credits">
          <div className="segmented-root">
            <div className="segmented-inner">
              <div
                className="segmented-thumb"
                style={{
                  left: `${thumbStyle.left}px`,
                  width: `${
                    value === "InIssue"
                      ? thumbStyle.width - 8
                      : thumbStyle.width
                  }px`,
                }}
              />
              <button
                ref={QCApproval}
                className={`segmented-item ${
                  value === "QCApproval" ? "active" : ""
                }`}
                onClick={() => setValue("QCApproval")}
              >
                QC Approval(10)
              </button>
              <button
                ref={InReview}
                className={`segmented-item ${
                  value === "InReview" ? "active" : ""
                }`}
                onClick={() => setValue("InReview")}
              >
                In Review
              </button>

              <button
                ref={ToLive}
                className={`segmented-item ${
                  value === "ToLive" ? "active" : ""
                }`}
                onClick={() => setValue("ToLive")}
              >
                To Live(10)
              </button>
              <button
                ref={InIssue}
                className={`segmented-item ${
                  value === "InIssue" ? "active" : ""
                }`}
                onClick={() => setValue("InIssue")}
              >
                In Issue(10)
              </button>
            </div>

            <div className="segmented-content">
              {value === "QCApproval" && <QcApproval setValue={setValue} />}
              {value === "InReview" && <InReviewPage setValue={setValue} />}
              {/* {value === "Barcode" && <BarcodePage setValue={setValue} />} */}
              {value === "ToLive" && <ToLivePage setValue={setValue} />}
              {value === "InIssue" && <InIssuePage />}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
Distribution.propTypes = {
  releaseItems: PropTypes.array.isRequired,
};
export default Distribution;
