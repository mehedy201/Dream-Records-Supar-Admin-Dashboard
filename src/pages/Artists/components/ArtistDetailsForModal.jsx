import artistDemoImg from "../../../assets/artists/artist4.png";
import localDate from "../../../hooks/localDate";
import localTime from "../../../hooks/localTime";
import instagramImg from '../../../assets/social/instagram.png'
import spotifyImg from '../../../assets/social/spotify-icon.png'
import facebookImg from '../../../assets/social/facebook.png'
import youtubeImg from '../../../assets/social/youtube-icon.png'
import appleImg from '../../../assets/social/apple-music.png'
import { cdnLink } from "../../../hooks/cdnLink";
import notFoundImg from "../../../assets/Empty.png";


const ArtistDetailsForModal = ({data}) => {

    return (
        <div>
            <div>
                <img
                    style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    }}
                    // className="singleArtist-image"
                    src={`${data?.key ? cdnLink(data.key) : artistDemoImg}`}
                    alt={data?.artistName}
                />
            </div>
            <div>
            <h4 style={{margin: '5px 0'}}>{data?.artistName}</h4>
            {data?.date ? (
                <p style={{fontWeight: 'lighter', fontSize: '12px', margin: '2px 0'}}>Created on {localDate(data?.date)} || {localTime(data?.date)}</p>
            ) : (
                <p style={{fontWeight: 'lighter', fontSize: '12px', margin: '2px 0'}}>Created on Date Not Found</p>
            )}
            </div>
            <div className="">
            <h4>Artist Profiles</h4>
            <div className="d-flex single-pg-social">
                {data?.appleId && (
                <a
                    className="social-div"
                    target="_blank"
                    href={`https://music.apple.com/profile/${data?.appleId}`}
                >
                    <img style={{height: '16px', width: 'auto'}} src={appleImg} alt={appleImg} />
                </a>
                )}
                {data?.spotifyId && (
                <a
                    className="social-div"
                    target="_blank"
                    href={`https://open.spotify.com/user/${data?.spotifyId}`}
                >
                    <img style={{height: '16px', width: 'auto'}} src={spotifyImg} alt={spotifyImg} />
                </a>
                )}
                {data?.instagramId && (
                <a
                    className="social-div"
                    target="_blank"
                    href={`https://www.instagram.com/${data?.instagramId}`}
                >
                    <img style={{height: '16px', width: 'auto'}} src={instagramImg} alt={instagramImg} />
                </a>
                )}
                {data?.facebook && (
                <a
                    className="social-div"
                    target="_blank"
                    href={data.facebook}
                >
                    <img style={{height: '16px', width: 'auto'}} src={facebookImg} alt={facebookImg} />
                </a>
                )}
                {data?.youtube && (
                <a
                    className="social-div"
                    target="_blank"
                    href={data.youtube}
                >
                    <img style={{height: '16px', width: 'auto'}} src={youtubeImg} alt={youtubeImg} />
                </a>
                )}

                {
                    !data?.appleId && !data?.spotifyId && !data?.instagramId && !data?.facebook && !data?.youtube &&
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                        <img
                        style={{ width: "auto", height: "50px", marginTop: "10px", marginBottom: "10px" }}
                        src={notFoundImg}
                        alt=""
                      />
                    </div>
                }
            </div>
            </div>
        </div>
    );
};

export default ArtistDetailsForModal;