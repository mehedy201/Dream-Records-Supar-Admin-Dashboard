// import { TextArea } from "@radix-ui/themes";
import axios from "axios";
import ImageUpload from "../../../components/ImageUpload";
// import Social from "../../../components/Social";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import facbookIcon from "../../../assets/social/facebook.png";
import instaIcon from "../../../assets/social/instagram.png";
import youtubeIcon from "../../../assets/social/youtube-icon.png";

function EditLable() {
  
  const { id } = useParams();
  const [preLabelData, setPreLabelData] = useState();
  const [imgLink, setImgLink] = useState();
  const [uploadedImage, setUploadedImage] = useState();
  let imgUrl;
  let key;
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/single-labels/${id}`
      )
      .then((res) => {
        if (res.status == 200) {
          setPreLabelData(res.data.data[0]);
          setImgLink(res?.data?.data[0]?.imgUrl);
          imgUrl = res?.data?.data[0]?.imgUrl;
          key = res?.data?.data[0]?.key;
          setUploadedImage({ imgUrl, key });
          console.log(res.data.data[0]);
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
      .put(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/update-labels/${id}`,
        formData
      )
      .then((res) => {
        if (res.status == 200) {
          setUploadedImage('');
          navigate(`/labels/${id}/1/10/All`);
        }
      })
      .catch((er) => console.log(er));
  };


  return (
    <div className="main-content">
      <div className="artist-editImg-div">
        {" "}
        <ImageUpload
          link={`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/labels/upload-labels-img`}
          setImgLink={setImgLink}
          imgLink={imgLink}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          title="Label Image"
          description="This will be displayed on label profile"
          placeholderImg="upload-img.png"
          placeholderTxt="Drop your image here"
        />
      </div>
      {preLabelData && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="editLable-info">
            <h4>Basic Information</h4>
            <label>Label name</label>
            <input
              defaultValue={preLabelData?.labelName}
              {...register("labelName", { required: true })}
              type="text"
            />
            {errors.labelName && <span>Label Name Required</span>}
          </div>
          <br />
          <div className="singleLable-social-div" style={{ marginLeft: 0 }}>
            <h4>Label Profiles</h4>
            <div className="add-atrist">
              <div style={{ margin: "auto" }}>
                <img src={facbookIcon} alt="facebook" />
              </div>
              <input
                type="text"
                placeholder="eg. facebook.com/username"
                className="social-input"
                defaultValue={preLabelData?.facebook}
                {...register("facebook")}
              />
            </div>
            <div className="add-atrist">
              <div style={{ margin: "auto" }}>
                <img src={instaIcon} alt="facebook" />
              </div>
              <input
                type="text"
                placeholder="eg. username"
                className="social-input"
                defaultValue={preLabelData?.instagram}
                {...register("instagram")}
              />
            </div>
            <div className="add-atrist">
              <div style={{ margin: "auto" }}>
                <img src={youtubeIcon} alt="facebook" />
              </div>
              <input
                type="text"
                placeholder="eg. youtube.com/username"
                className="social-input"
                defaultValue={preLabelData?.youtube}
                {...register("youtube")}
              />
            </div>
          </div>
          <br />
          <button type="submit" className="imgUpload-save-btn">
            Save
          </button>
        </form>
      )}
    </div>
  );
}
EditLable.propTypes = {
  labelSocialItems: PropTypes.array.isRequired,
};
export default EditLable;
