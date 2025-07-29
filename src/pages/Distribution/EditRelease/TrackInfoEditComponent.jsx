import * as RadioGroup from "@radix-ui/react-radio-group";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReleaseAudioUpload from "../../../components/ReleaseAudioUpload";
import SearchDropdown from "../../../components/SearchDropdown";
import SelectDropdownForCreateRelease from "../../../components/SelectDropdownForCreateRelease";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TrackInfoEditComponent = ({track, index, closeRef}) => {

    const {id} = useParams();

    const { trackFormat, tracksInfo} = useSelector(state => state.releaseData);
    const { reFetchArtist } = useSelector(state => state.reFetchSlice);

    const {userNameIdRoll} = useSelector((state) => state.userData);
    const { yearsList } = useSelector(state => state.yearsAndStatus);

    // Genre and Language Data Get Form API ____________________________
    const [allGenre, setAllGenre] = useState()
    const [language, setLanguage] = useState()
    useEffect(() => {
        axios.get(`http://localhost:5000/admin/api/v1/settings/genre`)
        .then(res => {
            const data = res.data.data;
            const genreArray = data.map(item => item.genre);
            setAllGenre(genreArray);
        })
        axios.get('http://localhost:5000/admin/api/v1/settings/language')
        .then(res => {
            const data = res.data.data
            const l = data.map(item => item.language);
            setLanguage(l);
        })
    }, [])

    // Artist Data Get Form API ____________________________
    const [artist, setArtist] = useState()
    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/artist/for-release/${userNameIdRoll ? userNameIdRoll[1]: ''}`)
        .then(res => {
            setArtist(res.data.data)
        })
    }, [userNameIdRoll, reFetchArtist])

    
    const preAudioKey = trackFormat === 'Singles' ? tracksInfo[0]?.audioKey : '';
    const preAudioUrl = trackFormat === 'Singles' ? tracksInfo[0]?.audioUrl : '';
    const preAudioName = trackFormat === 'Singles' ? tracksInfo[0]?.audioName : '';
    const fullPreAudioData = {audioKey: preAudioKey, audioName: preAudioName, audioUrl: preAudioUrl}
    const [audioData, setAudioData] = useState(trackFormat === 'Singles' && tracksInfo[0]?.audioUrl ? fullPreAudioData : '');
    const [audioErr, setAudioErr] = useState();

    const [isISRC, setIsISRC] = useState(track.isISRC);
    const {register, handleSubmit, setValue, watch, control, formState: {errors}} = useForm({
        defaultValues: track
    })

    const onSubmit = async (data) => {
        setAudioErr('')
        const updatedTracks = [...tracksInfo]; // This is tracks array of object 
        updatedTracks[index] = data;

         axios.patch(`http://localhost:5000/admin/api/v1/release/update-release-tracks-info/${id}`, {tracks: updatedTracks})
        .then(res => {
            if(res.status == 200){
                closeRef.current?.click(); // close modal   
                toast.success('Tracks Updated!')
                window.location.reload();
            }
        })
    }


  return (
    <div className="editTrack-content-div">
      <>
        {
            trackFormat === "Album" &&
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <X onClick={closeForm} style={{color: 'red', cursor: 'pointer', paddingRight: '8px', paddingBottom: '5px'}}/>
            </div>
        }
        <ReleaseAudioUpload
            audioData={audioData} 
            setAudioData={setAudioData}
        />
        {
            audioErr && <p style={{color: 'red'}}>{audioErr}</p>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Tittle *</label>
            <input type="text" {...register("tittle", { required: true})}/>
            {errors.tittle && <span style={{color: '#ea3958', marginTop: '5px'}}> Tittle Required</span>}

            <label>Version/Subtittle</label>
            <input type="text" {...register("versionSubtittle")}/>
            <div className="form-grid release-form-grid">
            <div>
                <label htmlFor="">Primary Artist *</label>

                <SearchDropdown
                    items={artist}
                    searchTxt="Search and select primary artist"
                    itemName="Artist"
                    register={{...register("primaryArtist", { required: true})}}
                    onSelect={(items) => setValue("primaryArtist", items, { shouldValidate: true })}
                    value={watch("primaryArtist")}
                />
                {errors.primaryArtist && <span style={{color: '#ea3958'}}>Please Select Artist</span>}
            </div>
            <div>
                <label htmlFor="">Featuring</label>

                <SearchDropdown
                    items={artist}
                    searchTxt="Search and select featuring"
                    itemName="Artist"
                    onSelect={(items) => setValue("featuring", items, { shouldValidate: true })}
                    value={watch("featuring")}
                />
            </div>
            <div>
                <label htmlFor="">Lyricist *</label>

                <SearchDropdown
                    items={artist}
                    searchTxt="Search and select lyricist"
                    itemName="Artist"
                    register={{...register("lyricist", { required: true})}}
                    onSelect={(items) => setValue("lyricist", items, { shouldValidate: true })}
                    value={watch("lyricist")}
                />
                {errors.lyricist && <span style={{color: '#ea3958'}}>Please Select Lyricist</span>}
            </div>
            <div>
                <label htmlFor="">Composer *</label>

                <SearchDropdown
                    items={artist}
                    searchTxt="Search and select composer"
                    itemName="Artist"
                    register={{...register("composer", { required: true})}}
                    onSelect={(items) => setValue("composer", items, { shouldValidate: true })}
                    value={watch("composer")}
                />
                {errors.composer && <span style={{color: '#ea3958'}}>Please Select Composer</span>}
            </div>
            <div>
                <label>Arranger</label>
                <input type="text" {...register("arranger")}/>
            </div>
            <div>
                <label>Producer</label>
                <input type="text" {...register("producer")}/>
            </div>
            </div>
            <label>Publisher</label>
            <input type="text" {...register("publisher")}/>
            <div className="form-grid release-form-grid">
            <div>
                <label htmlFor="">Genre *</label>
                <SelectDropdownForCreateRelease
                    options={allGenre}
                    placeholder="Select genre..."
                    className="createRelease-dropdown"
                    register={{...register("genre", { required: true})}}
                    dataName='genre'
                    setValue={setValue}
                    defaultValue={watch("genre")}
                />
                {errors.genre && <span style={{color: '#ea3958'}}>Genre Required</span>}
            </div>
            <div>
                <label htmlFor="">Sub-Genre *</label>
                <input type="text" {...register("subGenre", { required: true})}/>
                {errors.subGenre && <span style={{color: '#ea3958'}}>Sub Genre Required</span>}
            </div>
            <div>
                <label>℗ line *</label>
                <input type="text" {...register("pLine", { required: true})}/>
                {errors.pLine && <span style={{color: '#ea3958'}}>P line field Required</span>}
            </div>
            <div>
                <label htmlFor="">Production Year *</label>
                <SelectDropdownForCreateRelease
                    options={yearsList.map(String)}
                    placeholder="Select a year..."
                    className="createRelease-dropdown"
                    register={{...register("productionYear", { required: true})}}
                    dataName='productionYear'
                    setValue={setValue}
                    defaultValue={watch("productionYear")}
                />
                {errors.productionYear && <span style={{color: '#ea3958'}}>Production Year Required</span>}
            </div>
            <div>
                <label htmlFor="">Do you already have a ISRC? *</label>
                <Controller
                name="isISRC"
                control={control}
                rules={{ required: "This selection is required" }}
                render={({ field }) => (
                  <RadioGroup.Root
                    className="radio-group"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsISRC(value)
                    }}
                  >
                    <label className="radio-label">
                        <span>
                            <RadioGroup.Item className="radio-item" value="No" />
                            &nbsp; No
                        </span>
                    </label>
                    <label className="radio-label">
                        <span>
                            <RadioGroup.Item className="radio-item" value="Yes" />
                            &nbsp; Yes
                        </span>
                    </label>
                  </RadioGroup.Root>
                )}
              />
              {errors.isISRC && <span style={{color: '#ea3958'}}>This field Required</span>}
            </div>
            {
                isISRC === 'Yes' &&
                <div>
                    <label>ISRC *</label>
                    <input type="text" {...register("ISRC", { required: true})}/>
                    {errors.ISRC && <span style={{color: '#ea3958'}}>ISRC Required</span>}
                </div>
            }
            <div>
                <label htmlFor="">Parental advisory *</label>
                <Controller
                name="parentalAdvisory"
                control={control}
                rules={{ required: "This selection is required" }}
                render={({ field }) => (
                  <RadioGroup.Root
                    className="radio-group"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <label className="radio-label">
                        <span>
                            <RadioGroup.Item className="radio-item" value="No" />
                            &nbsp; No
                        </span>
                    </label>
                    <label className="radio-label">
                        <span>
                            <RadioGroup.Item className="radio-item" value="Yes" />
                            &nbsp; Yes
                        </span>
                    </label>
                    <label className="radio-label">
                        <span>
                        <RadioGroup.Item className="radio-item" value="Cleaned" />
                        &nbsp; Cleaned
                        </span>
                    </label>
                    </RadioGroup.Root>
                    )}
                />
              {errors.parentalAdvisory && <span style={{color: '#ea3958'}}>Parental advisory Required</span>}
                
            </div>
            <div>
                <label htmlFor="">Preview start </label>
                <input type="number" {...register("previewStart")}/>
            </div>
            </div>
            <label htmlFor="">Lyrics Language *</label>
            <SelectDropdownForCreateRelease
                options={language}
                placeholder="Select language..."
                className="createRelease-dropdown"
                register={{...register("language", { required: true})}}
                dataName='language'
                setValue={setValue}
                defaultValue={watch("language")}
            />
            {errors.language && <span style={{color: '#ea3958'}}>Language Required</span>}
            <label htmlFor="">Lyrics</label>
            <textarea {...register("lyrics")}></textarea>
            <br />
            <br />
            <div style={{display: 'flex', justifyContent: 'end', paddingTop: '50px'}}>
                <button style={{width: '200px'}} type="submit" className="theme-btn">Submit</button>
            </div>
        </form>
      </>
    </div>
  );
};

export default TrackInfoEditComponent;
