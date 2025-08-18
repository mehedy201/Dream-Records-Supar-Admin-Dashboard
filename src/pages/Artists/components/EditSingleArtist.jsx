import ImageUpload from "../../../components/ImageUpload";
import { useEffect, useState } from "react";
import facbookIcon from "../../../assets/social/facebook.png";
import appleIcon from "../../../assets/social/apple-music.png";
import instaIcon from "../../../assets/social/instagram.png";
import spotifyIcon from "../../../assets/social/spotify-icon.png";
import youtubeIcon from "../../../assets/social/youtube-icon.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSingleArtist() {
  const { id } = useParams();
  const [preArtistData, setPreArtistData] = useState();
  const [imgLink, setImgLink] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  let imgUrl;
  let key;
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/single-artist/${id}`
      )
      .then((res) => {
        if (res.status == 200) {
          setPreArtistData(res.data.data[0]);
          setImgLink(res?.data?.data[0]?.imgUrl);
          imgUrl = res?.data?.data[0]?.imgUrl;
          key = res?.data?.data[0]?.key;
          setUploadedImage({ imgUrl, key });
        }
      });
  }, [id]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = { ...data, ...uploadedImage };
    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/update-artist/${id}`,
        formData
      )
      .then((res) => {
        if (res.status == 200) {
          setUploadedImage();
          navigate("/artist/1/10");
          // console.log(res);
          axios.patch(`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/update-release-artist`, formData)
            .then(res => {
                if(res.status == 200){
                    setUploadedImage()
                    navigate('/artist/1/10')
                }
            })
        }
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="main-content">
      <div className="artist-editImg-div">
        {" "}
        <ImageUpload
          link={`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/upload-artist-img`}
          setImgLink={setImgLink}
          imgLink={imgLink}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          title="Artist’s Image"
          description="This will be displayed on Artist’s profile"
          placeholderTxt="Drop your image here"
        />
      </div>
      {preArtistData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="editArtist-info" style={{ marginRight: 0 }}>
            <h4>Basic Information</h4>
            <label htmlFor="" style={{ marginBottom: "5px", display: "block" }}>
              Official name
            </label>
            <input
              defaultValue={preArtistData?.artistName}
              {...register("artistName", { required: true })}
              type="text"
              style={{ width: "100%" }}
              disabled
            />
            {errors.artistName && <span>Artist Name Required</span>}
          </div>
          <br />
          <div className="singleArtist-social-div" style={{ marginRight: 0 }}>
            <h4>Artist Profiles</h4>
            <div className="add-atrist">
              <div>
                <img src={spotifyIcon} alt={""} />
              </div>
              <input
                type="text"
                placeholder="eg. 6kXwOyEW4VffTqJut6h7J6"
                className="social-input"
                defaultValue={preArtistData?.spotifyId}
                {...register("spotifyId")}
              />
            </div>
            <div className="add-atrist">
              <div>
                <img src={appleIcon} alt={""} />
              </div>
              <input
                type="text"
                placeholder="eg. 123456789"
                className="social-input"
                defaultValue={preArtistData?.appleId}
                {...register("appleId")}
              />
            </div>
            <div className="add-atrist">
              <div>
                <img src={facbookIcon} alt={""} />
              </div>
              <input
                type="text"
                placeholder="eg. facebook.com/username"
                className="social-input"
                defaultValue={preArtistData?.facebook}
                {...register("facebook")}
              />
            </div>
            <div className="add-atrist">
              <div>
                <img src={instaIcon} alt={""} />
              </div>
              <input
                type="text"
                placeholder="eg. username"
                className="social-input"
                defaultValue={preArtistData?.instagramId}
                {...register("instagramId")}
              />
            </div>
            <div className="add-atrist">
              <div>
                <img src={youtubeIcon} alt={""} />
              </div>
              <input
                type="text"
                placeholder="eg. youtube.com/username"
                className="social-input"
                defaultValue={preArtistData?.youtube}
                {...register("youtube")}
              />
            </div>
          </div>

          <button type="submit" className="imgUpload-save-btn">
            Save
          </button>
        </form>
      )}
    </div>
  );
}

export default EditSingleArtist;
