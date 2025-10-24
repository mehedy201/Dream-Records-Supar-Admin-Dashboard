import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import demoArtistImg from '../assets/artists/artist4.png'
import { cdnLink } from "../hooks/cdnLink";
const ArtistCard = ({ artistsItems }) => {
  return (
    <div className="artists-container" style={{ display: "flex" }}>
      {artistsItems?.map((item, index) => (
        <Link
          to={`/artists/${item._id}/1/10`}
          state={{ artist: item }}
          key={index}
          className="artists-card"
          style={{ cursor: "pointer" }}
        >
          <img src={item?.key ? cdnLink(item?.key) : demoArtistImg} alt={item.name} />
          <p>{item?.artistName}</p>
        </Link>
      ))}
    </div>
  );
};

ArtistCard.propTypes = {
  artistsItems: PropTypes.arrayOf(
    PropTypes.shape({
      artistName: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArtistCard;
