import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ArtistCard = ({ artistsItems }) => {
  return (
    <div className="artists-container" style={{ display: "flex" }}>
      {artistsItems.map((item, index) => (
        <Link
          to="/single-artist"
          state={{ artist: item }}
          key={index}
          className="artists-card"
          style={{ cursor: "pointer" }}
        >
          <img src={`src/assets/artists/${item.img}`} alt={item.name} />
          <p>{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

ArtistCard.propTypes = {
  artistsItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArtistCard;
