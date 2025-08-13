import { useEffect, useState } from "react";
import ImageUpload from "../../../components/ImageUpload";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SelectDropdown from "../../../components/SelectDropdown";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../../../components/LoadingScreen";
import { CountrySelect, StateSelect } from "react-country-state-city";
import toast from "react-hot-toast";
function EditUser() {

  const { id } = useParams();

  // Country State Select____________________________________________________
  const [countryid, setCountryid] = useState(0);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [phone, setPhone] = useState();
  const [phoneErr, setPhoneErr] = useState("");
  const [uploadedImage, setUploadedImage] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(country)
    if(!phone){
      setPhoneErr('Phone Required')
      return;
    }
    if(!country){
      setCountryError('Country Required')
      return;
    }
    if(!state){
      setStateError('State Required')
      return;
    }
    const payload = {...data, ...uploadedImage, phone, country, state, photoURL: uploadedImage?.imgUrl ? uploadedImage?.imgUrl : uploadedImage?.photoURL}
    axios.patch(`http://localhost:5000/api/v1/users/${id}`, payload)
    .then(res => {
      if(res.data.status === 200){
        toast.success(res.data.message)
        console.log(res)
      }else{
        toast.error(res.data.message)
        console.log(res)
      }
    })
    // console.log(payload)
  };

  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [imgLink, setImgLink] = useState();
  
  let photoURL;
  let key;
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/users/${id}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          const userDataForForm = res?.data?.data
          setUserData(res.data.data);
          setCountry(res?.data?.data?.country)
          setState(res?.data?.data?.state)
          setCountryid(res?.data?.data?.country?.countryId)
          setPhone(res?.data?.data?.phone)
          setImgLink(res?.data?.data?.photoURL);
          photoURL = res?.data?.data?.photoURL;
          key = res?.data?.data?.key;
          setUploadedImage({ photoURL, key });
          delete userDataForForm?.country
          delete userDataForForm?.state
          delete userDataForForm?.firebaseUID
          delete userDataForForm?.userName
          delete userDataForForm?.label
          delete userDataForForm?.roll
          delete userDataForForm?.lastLogin
          delete userDataForForm?.openingDateISO
          delete userDataForForm?.password
          delete userDataForForm?.balanceBackup
          delete userDataForForm?.balance
          reset(userDataForForm)
          setLoading(false);
        }
      });
  }, [id]);


  

  if(loading) return <LoadingScreen/>

  return (
    <div className="main-content editUser-content">
      <div className="editUser-div">
        {" "}
        <ImageUpload
          link={`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/users/upload-profile-img`}
          setImgLink={setImgLink}
          imgLink={imgLink}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          title="User Image"
          description="This will be displayed on User profile"
          placeholderImg="upload-img.png"
          placeholderTxt="Drop your image here"
        />
        <br />
        <form onSubmit={handleSubmit(onSubmit)} className="editUser-form">
          <h5>Personal Information</h5>
          <div className="editUser-from-grid">
            <div>
              <label htmlFor="">First Name</label>
              <input
                {...register("first_name", { required: true })}
                placeholder="First Name"
              />
              {errors.first_name && <span style={{color: 'red'}}>First Name Required</span>}
            </div>

            <div>
              <label htmlFor="">Last Name</label>
              <input
                {...register("last_name", { required: true})}
                placeholder="Last Name"
              />
              {errors.last_name && <span style={{color: 'red'}}>Last Name Required</span>}
            </div>
            <div>
              <label htmlFor="">Phone Number</label>
              <PhoneInput
              value={phone}
              onChange={(phone) => {
                setPhone(phone);
                setPhoneErr("");
              }}
              inputClass="phone-input-field"
              buttonClass="phone-dropdown"
              className="signUp-phone-input"
            />
            {
              phoneErr && <p style={{color: 'red'}}>{phoneErr}</p>
            }
            </div>
          </div>
          <br />
          <h5>Address</h5>
          {/* include validation with required or other standard HTML validation rules */}
          <label htmlFor="">Address Line 1</label>
          <input
            {...register("addressLine1", { required: true })}
            placeholder="Enter address line 1"
          />
          {errors.addressLine1 && <span style={{color: 'red'}}>Address Line 1 Required</span>}
          <label htmlFor="">Address Line 2</label>
          <input
            {...register("addressLine2")}
            placeholder="Enter address line 2"
          />
          {errors.addressLine2 && <span style={{color: 'red'}}>Address Line 2 Required</span>}
          <div className="editUser-from-grid">
            <div>
              <label htmlFor="">Select Country</label>
              <CountrySelect
                onChange={(e) => {
                  setCountryid(e.id);
                  const name = e.name;
                  const emoji = e.emoji;
                  const v = { name, emoji, countryId: e.id };
                  setCountry(v);
                }}
                defaultValue={country}
                placeHolder="Select Country"
              />
              {countryError && (
                <p style={{color: 'red'}}>{countryError}</p>
              )}
            </div>
            <div>
              <label htmlFor="">Select State</label>
              <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setState(e);
                  }}
                  defaultValue={state}
                  placeHolder="Select State"
                />
                {stateError && (
                  <p style={{color: 'red'}}>{stateError}</p>
                )}
            </div>
            <div>
              <label htmlFor="">City</label>
              <input
                {...register("city", {required: true})}
                placeholder="Dinhata"
              />
              {errors.city && <span style={{color: 'red'}}>City Required</span>}
            </div>
            <div>
              <label htmlFor="">Postal Code</label>
              <input
                {...register("postalCode")}
                placeholder="736135"
              />
              {errors.postalCode && <span style={{color: 'red'}}>Postal Code Required</span>}
            </div>
          </div>
          {/* errors will return when field validation fails  */}

          <input type="submit" className="theme-btn" />
        </form>
      </div>
    </div>
  );
}

export default EditUser;
