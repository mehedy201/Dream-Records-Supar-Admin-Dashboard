import { Flex } from "@radix-ui/themes";
import PropTypes from "prop-types";
import "./Global.css";
import localDate from "../hooks/localDate";
import { useNavigate } from "react-router-dom";
const ReleaseCard = ({ releaseItems }) => {
  const navigate = useNavigate();

  return (
    <div className="release-container">
      {releaseItems?.map((item) => (
        <div
          onClick={() => navigate('/')}
          key={item._id}
          className="release-card"
        >
          <img src={item?.imgUrl} alt="" />
          <div style={{ paddingTop: "12px" }}>
            <Flex style={{ display: "flex" }}>
              <div
                className="card-type-txt"
                style={
                  item?.status == "Takedown"
                    ? { background: "#FEEBEC", color: "#E5484D" }
                    : item.status == "Pending"
                    ? { background: "#FFEBD8", color: "#FFA552" }
                    : item.status == "Review"
                    ? { background: "#D5EFFF", color: "#0090FF" }
                    : item.status == "Error"
                    ? { background: "#E8E8E8", color: "#8D8D8D" }
                    : { background: "#E6F6EB", color: "#2B9A66" }
                }
              >
                {item.status}
              </div>
              <div className="card-date-txt">{item?.date ? localDate(item?.date) : 'Date'}</div>
            </Flex>
            <small>{item.releaseTitle}</small>
            <br />
            <small>{item?.artist?.map(artist => artist.artistName).join(', ')}</small>
          </div>
        </div>
      ))}
    </div>
  );
};
ReleaseCard.propTypes = {
  releaseItems: PropTypes.arrayOf(
    PropTypes.shape({
      releaseTitle: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      artist: PropTypes.arrayOf(
        PropTypes.shape({
          artistName: PropTypes.string
        })
      )
    })
  ).isRequired,
};
export default ReleaseCard;
