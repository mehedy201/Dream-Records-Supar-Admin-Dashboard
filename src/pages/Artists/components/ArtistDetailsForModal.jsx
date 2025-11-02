import artistDemoImg from "../../../assets/artists/artist4.png";
import localDate from "../../../hooks/localDate";
import instagramImg from '../../../assets/social/instagram.png'
import spotifyImg from '../../../assets/social/spotify-icon.png'
import facebookImg from '../../../assets/social/facebook.png'
import youtubeImg from '../../../assets/social/youtube-icon.png'
import appleImg from '../../../assets/social/apple-music.png'
import { cdnLink } from "../../../hooks/cdnLink";
import notFoundImg from "../../../assets/Empty.png";
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";


const ArtistDetailsForModal = ({data}) => {

    // Common social link formatter
    function formatSocialUrl(platform, value) {
        if (!value) return "";

        let input = value.trim();

        // Step 1: remove double URL (like https://www.instagram.com/https://...)
        const doubleUrlIndex = input.indexOf("https://", 8);
        if (doubleUrlIndex !== -1) {
            input = input.slice(doubleUrlIndex);
        }

        // Step 2: clean extra trailing slashes
        input = input.replace(/\/+$/, "");

        // Step 3: build final URLs based on platform
        switch (platform.toLowerCase()) {
            case "apple":
            return input.startsWith("http")
                ? input
                : `https://music.apple.com/profile/${input}`;

            case "spotify":
            return input.startsWith("http")
                ? input
                : `https://open.spotify.com/artist/${input}`; // or 'user/' if needed

            case "instagram":
            return input.startsWith("http")
                ? input
                : `https://www.instagram.com/${input}`;

            case "facebook":
            return input.startsWith("http")
                ? input
                : `https://www.facebook.com/${input}`;

            case "youtube":
            return input.startsWith("http")
                ? input
                : `https://www.youtube.com/${input}`;

            default:
            return input;
        }
    }

    const copyLink = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
            toast.error("Failed to copy link. Please try again.");
        }
    };

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
                <img
                    style={{
                    width: "78px",
                    height: "78px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "center",
                    }}
                    // className="singleArtist-image"
                    src={`${data?.key ? cdnLink(data.key) : artistDemoImg}`}
                    alt={data?.artistName}
                />
                <div>
                    <h4 style={{margin: '5px 0', fontSize: '28px', fontFamily: 'inter', fontWeight: '500', color: '#202020'}}>{data?.artistName}</h4>
                    {data?.date ? (
                        <p style={{fontWeight: '400', fontFamily: 'inter', color: '#838383', fontSize: '16px', margin: '2px 0'}}>Created on {localDate(data?.date)}</p>
                    ) : (
                        <p style={{fontWeight: '400', fontFamily: 'inter', color: '#838383', fontSize: '16px', margin: '2px 0'}}>Created on Date Not Found</p>
                    )}
                </div>
            </div>
            <div>
                <h4 style={{ fontSize: '20px', fontFamily: 'inter', fontWeight: '500', color: '#838383'}}>Artist Profiles</h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px'}}>
                    {data?.appleId && (
                    <div className="d-flex">
                        <img style={{height: '16px', width: '36px'}} src={appleImg} alt={appleImg} />
                        <input value={formatSocialUrl("apple", data.appleId)} type="text" disabled/>
                        <CopyIcon style={{cursor: 'pointer'}} onClick={() => copyLink(formatSocialUrl("apple", data.appleId))} size={16} />
                    </div>
                    )}
                    {data?.spotifyId && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
                        <img style={{height: '36px', width: '36px'}} src={spotifyImg} alt={spotifyImg} />
                        <input value={formatSocialUrl("spotify", data.spotifyId)} type="text" disabled/>
                        <CopyIcon style={{cursor: 'pointer'}} onClick={() => copyLink(formatSocialUrl("spotify", data.spotifyId))} size={16} />
                    </div>
                    )}
                    {data?.instagramId && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
                        <img style={{height: '36px', width: '36px'}} src={instagramImg} alt={instagramImg} />
                        <input value={formatSocialUrl("instagram", data.instagramId)} type="text" disabled/>
                        <CopyIcon style={{cursor: 'pointer'}} onClick={() => copyLink(formatSocialUrl("instagram", data.instagramId))} size={16} />
                    </div>
                    )}
                    {data?.facebook && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
                        <img style={{height: '36px', width: '36px'}} src={facebookImg} alt={facebookImg} />
                        <input value={formatSocialUrl("facebook", data.facebook)} type="text" disabled/>
                        <CopyIcon style={{cursor: 'pointer'}} onClick={() => copyLink(formatSocialUrl("facebook", data.facebook))} size={16} />
                    </div>
                    )}
                    {data?.youtube && (
                    <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
                        <img style={{height: '29px', width: '36px'}} src={youtubeImg} alt={youtubeImg} />
                        <input value={formatSocialUrl("youtube", data.youtube)} type="text" disabled/>
                        <CopyIcon style={{cursor: 'pointer'}} onClick={() => copyLink(formatSocialUrl("youtube", data.youtube))} size={16} />
                    </div>
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