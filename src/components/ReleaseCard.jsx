import { Flex } from "@radix-ui/themes";
import PropTypes from "prop-types";
import "./Global.css";
// import { Link } from "react-router-dom";
const ReleaseCard = ({ releaseItems }) => {
  return (
    <div className="release-container">
      {releaseItems.map((item, index) => (
        <div
          // to="/single-release"
          // state={{ release: item }}
          key={index}
          className="release-card"
        >
          <img src={`src/assets/${item.img}`} alt="" />
          <div style={{ paddingTop: "12px" }}>
            <Flex style={{ display: "flex" }}>
              <div
                className="card-type-txt"
                style={
                  item.type == "Takedown"
                    ? { background: "#FEEBEC", color: "#E5484D" }
                    : item.type == "Pending"
                    ? { background: "#FFEBD8", color: "#FFA552" }
                    : item.type == "Review"
                    ? { background: "#D5EFFF", color: "#0090FF" }
                    : item.type == "Error"
                    ? { background: "#E8E8E8", color: "#8D8D8D" }
                    : { background: "#E6F6EB", color: "#2B9A66" }
                }
              >
                {item.type}
              </div>
              <div className="card-date-txt">{item.date}</div>
            </Flex>
            <small>{item.name}</small>
            <br />
            <small>{item.artist}</small>
          </div>
        </div>
      ))}
    </div>
  );
};
ReleaseCard.propTypes = {
  releaseItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      // artist: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ReleaseCard;
