import * as RadioGroup from "@radix-ui/react-radio-group";
import { PlusIcon, X, XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReleaseAudioUpload from "../../../components/ReleaseAudioUpload";
import SearchDropdown from "../../../components/SearchDropdown";
import SelectDropdownForCreateRelease from "../../../components/SelectDropdownForCreateRelease";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TrackInfoEditComponent = ({ track, index, closeRef }) => {
  const { id } = useParams();

  console.log('track', track);
  const { trackFormat, tracksInfo } = useSelector((state) => state.releaseData);
  const { reFetchArtist } = useSelector((state) => state.reFetchSlice);

  const { userNameIdRoll } = useSelector((state) => state.userData);
  const { yearsList } = useSelector((state) => state.yearsAndStatus);

  // Genre and Language Data Get Form API ____________________________
  const [allGenre, setAllGenre] = useState();
  const [language, setLanguage] = useState();
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/genre`
      )
      .then((res) => {
        const data = res.data.data;
        const genreArray = data.map((item) => item.genre);
        setAllGenre(genreArray);
      });
    axios
      .get(
        "https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/settings/language"
      )
      .then((res) => {
        const data = res.data.data;
        const l = data.map((item) => item.language);
        setLanguage(l);
      });
  }, []);

  // Artist Data Get Form API ____________________________
  const [artist, setArtist] = useState();
  useEffect(() => {
    axios
      .get(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/artist/for-release/${
          userNameIdRoll ? userNameIdRoll[1] : ""
        }`
      )
      .then((res) => {
        setArtist(res.data.data);
      });
  }, [userNameIdRoll, reFetchArtist]);

  const preAudioKey = track?.audioKey || '';
  const preAudioUrl = track?.audioUrl || '';
  const preAudioName = track?.audioName || '';
  const fullPreAudioData = {
    audioKey: preAudioKey,
    audioName: preAudioName,
    audioUrl: preAudioUrl,
  };
  const [audioData, setAudioData] = useState(fullPreAudioData);
  const [audioErr, setAudioErr] = useState();

  // Composer ____________________________________
  const defaultComposers =
  (track?.composer ? track?.composer?.map((c) => ({ value: c }))
    : [{ value: "" }]);

  // Lyricist ____________________________________
  const defaultLyricist =
  (track?.lyricist ? track?.lyricist.map((l) => ({ value: l }))
    : [{ value: "" }]);

  const [isISRC, setIsISRC] = useState(track.isISRC);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {...track,
    composer: defaultComposers,
    lyricist: defaultLyricist,
    }
  });

  const {
    fields: lyricistFields,
    append: appendLyricist,
    remove: removeLyricist,
  } = useFieldArray({
    control,
    name: "lyricist",
  });

  const {
      fields: composerFields,
      append: appendComposer,
      remove: removeComposer,
    } = useFieldArray({
      control,
      name: "composer",
    });

  const onSubmit = async (data) => {
    setAudioErr("");
    const updatedTracks = [...tracksInfo]; // This is tracks array of object
    updatedTracks[index] = data;

    data.composer = data.composer.map((c) => c.value.trim()).filter(Boolean);
    data.lyricist = data.lyricist.map((l) => l.value.trim()).filter(Boolean);

    axios
      .patch(
        `https://dream-records-2025-m2m9a.ondigitalocean.app/admin/api/v1/release/update-release-tracks-info/${id}`,
        { tracks: updatedTracks }
      )
      .then((res) => {
        if (res.status == 200) {
          closeRef.current?.click(); // close modal
          toast.success("Tracks Updated!");
          window.location.reload();
        }
      });
  };

  return (
    <div className="editTrack-content-div">
      <>
        {trackFormat === "Album" && (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <X
              onClick={closeForm}
              style={{
                color: "red",
                cursor: "pointer",
                paddingRight: "8px",
                paddingBottom: "5px",
              }}
            />
          </div>
        )}
        <ReleaseAudioUpload audioData={audioData} setAudioData={setAudioData} />
        {audioErr && <p style={{ color: "red" }}>{audioErr}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Tittle *</label>
          <input type="text" {...register("tittle", { required: true })} />
          {errors.tittle && (
            <span style={{ color: "#ea3958", marginTop: "5px" }}>
              {" "}
              Tittle Required
            </span>
          )}

          <label>Version/Subtittle</label>
          <input type="text" {...register("versionSubtittle")} />
          <div className="form-grid release-form-grid">
            <div>
              <label htmlFor="">Primary Artist *</label>

              <SearchDropdown
                items={artist}
                searchTxt="Search and select primary artist"
                itemName="Artist"
                register={{ ...register("artist", { required: true }) }}
                onSelect={(items) =>
                  setValue("artist", items, { shouldValidate: true })
                }
                value={watch("artist")}
              />
              {errors.primaryArtist && (
                <span style={{ color: "#ea3958" }}>Please Select Artist</span>
              )}
            </div>
            <div>
              <label htmlFor="">Featuring</label>

              <SearchDropdown
                items={artist}
                searchTxt="Search and select featuring"
                itemName="Artist"
                onSelect={(items) =>
                  setValue("featuring", items, { shouldValidate: true })
                }
                value={watch("featuring")}
              />
            </div>
            <div>
              <label htmlFor="">Lyricist *</label>

              {/* <SearchDropdown
                items={artist}
                searchTxt="Search and select lyricist"
                itemName="Artist"
                register={{ ...register("lyricist", { required: true }) }}
                onSelect={(items) =>
                  setValue("lyricist", items, { shouldValidate: true })
                }
                value={watch("lyricist")}
              />
              {errors.lyricist && (
                <span style={{ color: "#ea3958" }}>Please Select Lyricist</span>
              )} */}

              {lyricistFields.map((field, index) => (
                <div
                  key={field.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="text"
                      {...register(`lyricist.${index}.value`, {
                        required: "Lyricist required",
                        validate: (v) => v.trim() !== "" || "Lyricist required",
                      })}
                      placeholder="Lyricist name"
                      style={{ flex: 1 }}
                      autoComplete="off"
                    />
                    {lyricistFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLyricist(index)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        aria-label="Remove lyricist"
                      >
                        <XIcon />
                      </button>
                    )}
                  </div>
                  {errors.lyricist?.[index]?.value && (
                    <span style={{ color: "red" }}>
                      {errors.lyricist[index].value.message}
                    </span>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendLyricist({ value: "" })}
                style={{
                  border: "1px solid #ea3958",
                  display: "flex",
                  gap: "5px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  alignItems: "center",
                  cursor: "pointer",
                  background: "none",
                  marginBottom: 8,
                }}
              >
                <PlusIcon /> Add New Lyricist
              </button>
            </div>
            <div>
              <label htmlFor="">Composer *</label>

              {/* <SearchDropdown
                items={artist}
                searchTxt="Search and select composer"
                itemName="Artist"
                register={{ ...register("composer", { required: true }) }}
                onSelect={(items) =>
                  setValue("composer", items, { shouldValidate: true })
                }
                value={watch("composer")}
              />
              {errors.composer && (
                <span style={{ color: "#ea3958" }}>Please Select Composer</span>
              )} */}

              {composerFields.map((field, index) => (
                <div
                  key={field.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    marginBottom: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="text"
                      {...register(`composer.${index}.value`, {
                        required: "Composer required",
                        validate: (v) => v.trim() !== "" || "Composer required",
                      })}
                      placeholder="Composer name"
                      style={{ flex: 1 }}
                      autoComplete="off"
                    />
                    {composerFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeComposer(index)}
                        style={{
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                        aria-label="Remove composer"
                      >
                        <XIcon />
                      </button>
                    )}
                  </div>
                  {errors.composer?.[index]?.value && (
                    <span style={{ color: "red" }}>
                      {errors.composer[index].value.message}
                    </span>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendComposer({ value: "" })}
                style={{
                  border: "1px solid #ea3958",
                  display: "flex",
                  gap: "5px",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  alignItems: "center",
                  cursor: "pointer",
                  background: "none",
                  marginBottom: 8,
                }}
              >
                <PlusIcon /> Add New Composer
              </button>
            </div>
            <div>
              <label>Arranger</label>
              <input type="text" {...register("arranger")} />
            </div>
            <div>
              <label>Producer</label>
              <input type="text" {...register("producer")} />
            </div>
          </div>
          <label>Publisher</label>
          <input type="text" {...register("publisher")} />
          <div className="form-grid release-form-grid">
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
                      setIsISRC(value);
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
              {errors.isISRC && (
                <span style={{ color: "#ea3958" }}>This field Required</span>
              )}
            </div>
            {isISRC === "Yes" && (
              <div>
                <label>ISRC *</label>
                <input type="text" {...register("ISRC", { required: true })} />
                {errors.ISRC && (
                  <span style={{ color: "#ea3958" }}>ISRC Required</span>
                )}
              </div>
            )}
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
                        <RadioGroup.Item
                          className="radio-item"
                          value="Cleaned"
                        />
                        &nbsp; Cleaned
                      </span>
                    </label>
                  </RadioGroup.Root>
                )}
              />
              {errors.parentalAdvisory && (
                <span style={{ color: "#ea3958" }}>
                  Parental advisory Required
                </span>
              )}
            </div>
          </div>
          <label htmlFor="">Lyrics Language *</label>
          <SelectDropdownForCreateRelease
            options={language}
            placeholder="Select language..."
            className="createRelease-dropdown"
            register={{ ...register("language", { required: true }) }}
            dataName="language"
            setValue={setValue}
            defaultValue={watch("language")}
          />
          {errors.language && (
            <span style={{ color: "#ea3958" }}>Language Required</span>
          )}
          <label htmlFor="">Lyrics</label>
          <textarea {...register("lyrics")}></textarea>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingTop: "50px",
            }}
          >
            <button
              style={{ width: "200px" }}
              type="submit"
              className="theme-btn"
            >
              Submit
            </button>
          </div>
        </form>
      </>
    </div>
  );
};

export default TrackInfoEditComponent;
