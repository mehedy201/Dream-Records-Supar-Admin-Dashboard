import { useState } from "react";
import ImageUpload from "../../../components/ImageUpload";
import * as RadioGroup from "@radix-ui/react-radio-group";
import PropTypes from "prop-types";
import SearchDropdown from "../../../components/SearchDropdown";
import Dropdown from "../../../components/Dropdown";
import { Collapsible, Dialog, Tabs } from "radix-ui";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Slider } from "radix-ui";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { RiDownloadLine } from "react-icons/ri";
import Modal from "../../../components/Modal";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const steps = [
  "Album Information",
  "Tracks Information",
  "Release Date",
  "Overview",
];

function CreateRelease({
  artistsItems,
  LablesItems,
  releaseAlbumInfo,
  releaseTrackDetails,
  albumTrackList,
}) {
  const [step, setStep] = useState(0);
  const [addAlbumSong, setAddAlbumSong] = useState(false);
  const [albumOverviewSong, setAlbumOverviewSong] = useState(false);
  const [genreDropdown, setGenreDropdown] = useState(false);
  const [subGenreDropdown, setSubGenreDropdown] = useState(false);
  const [productionYearDropdown, setProductionYearDropdown] = useState(false);
  const [albumSongList, setAlbumSongList] = useState({});
  const [tracktFormat, setTrackFormat] = useState("Singles");
  const [addAlbumInstrument, setAddAlbumInstrument] = useState("No");
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const toggleAlbum = (index) => {
    setAlbumSongList((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle open/close for the specific album
    }));
  };
  return (
    <div
      className="main-content"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      {step === 4 ? (
        <div className="release-track-create-successful">
          <img src="src/assets/icons/circle-tick.png" alt="" />
          <h5>Track Created Successfully</h5>
          <p>
            Your track has been successfully created. You can now review the
            details, make edits, or proceed with distribution.
          </p>
          <br />
          <div className="d-flex">
            <button className="release-backDash-btn">Back to Dashboard</button>
            <button className="theme-btn" style={{ width: "100%" }}>
              View Track
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`d-flex release-step ${
                step == index ? "step-active" : ""
              } ${step > index ? "release-step-before" : ""}${
                index === steps.length - 1 ? "release-last-step" : ""
              }`}
            >
              <div className="release-step-number"> {index + 1}</div>
              <p>{item}</p>
              {index !== steps.length - 1 && (
                <div className="release-step-line"></div>
              )}
            </div>
          ))}
        </div>
      )}

      {step === 0 && (
        <>
          <h3 className="create-release-heading">Fill Album Information</h3>
          <div className="createRelease-content-div">
            {" "}
            <ImageUpload
              title="Album Artwork *"
              description="This will be displayed on Release profile"
              placeholderImg="upload-img.png"
              placeholderTxt="Drop your image here"
            />
            <br />
            <label>Release Tittle *</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter release tittle here"
            />
            <label>Version/subtittle</label>
            <input type="text" name="firstName" placeholder="Enter version" />
            <div className="form-grid">
              <div>
                <label htmlFor="">
                  Is this a compilation of various artists? *
                </label>
                <RadioGroup.Root className="radio-group" defaultValue="no">
                  <label className="radio-label">
                    <span>
                      <RadioGroup.Item className="radio-item" value="no" />
                      &nbsp; No
                    </span>
                  </label>
                  <label className="radio-label">
                    <span>
                      <RadioGroup.Item className="radio-item" value="yes" />
                      &nbsp; Yes
                    </span>
                  </label>
                </RadioGroup.Root>
              </div>
              <div>
                <label htmlFor="">Select Artist *</label>

                <SearchDropdown
                  items={artistsItems}
                  itemKey="name"
                  imagePath="artists/"
                  imageKey="img"
                  searchTxt="Search and select artist"
                  itemName="Artist"
                />
              </div>
            </div>
            <label htmlFor="">Featuring</label>
            <SearchDropdown
              items={artistsItems}
              itemKey="name"
              imagePath="artists/"
              imageKey="img"
              itemName="Artist"
              searchTxt="Search and select Genre"
            />
            <div className="form-grid">
              <div>
                <label htmlFor="">Genre *</label>
                <Dropdown
                  label="Select genre..."
                  options={["Option 1", "Option 2", "Option 3"]}
                  onSelect={setGenreDropdown}
                  select={genreDropdown}
                  itemName="Label"
                  className="createRelease-dropdown"
                />
              </div>
              <div>
                <label htmlFor="">Sub-Genre *</label>
                <Dropdown
                  label="Select sub-genre..."
                  options={["Option 1", "Option 2", "Option 3"]}
                  onSelect={setSubGenreDropdown}
                  select={subGenreDropdown}
                  itemName="Label"
                  className="createRelease-dropdown"
                />
              </div>
            </div>
            <label htmlFor="">Label Name *</label>
            <SearchDropdown
              items={LablesItems}
              itemKey="name"
              imagePath="lables/"
              imageKey="img"
              itemName="Label"
              searchTxt="Search and select label"
            />
            <div className="form-grid">
              <div>
                <label htmlFor="">Production Year *</label>
                <Dropdown
                  label="Select a year..."
                  options={["Option 1", "Option 2", "Option 3"]}
                  onSelect={setGenreDropdown}
                  select={genreDropdown}
                  className="createRelease-dropdown"
                />
              </div>
              <div>
                <label htmlFor="">Physical/Original release date *</label>
                <input
                  type="date"
                  placeholder="mm/dd/yyyy"
                  style={{ width: "auto" }}
                />
              </div>
            </div>
            <div className="form-grid">
              <div>
                <label htmlFor="">℗ line *</label>

                <input type="text" placeholder="Enter ℗ line" />
              </div>
              <div>
                <label htmlFor="">© line *</label>
                <input type="text" placeholder="Enter © line" />
              </div>
            </div>
            <div className="form-grid">
              <div>
                <label htmlFor="">Do you already have a UPC/EAN? *</label>

                <RadioGroup.Root className="radio-group" defaultValue="yes">
                  <label className="radio-label">
                    <span>
                      <RadioGroup.Item className="radio-item" value="no" />
                      &nbsp; No
                    </span>
                  </label>
                  <label className="radio-label">
                    <span>
                      <RadioGroup.Item className="radio-item" value="yes" />
                      &nbsp; Yes
                    </span>
                  </label>
                </RadioGroup.Root>
              </div>
              <div>
                <label htmlFor="">UPC/EAN *</label>
                <input type="text" placeholder="UPC/EAN" />
              </div>
            </div>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <h3 className="create-release-heading">Fill Tracks Meta Data</h3>
          <div className="createRelease-content-div">
            <label htmlFor="">Format</label>
            <RadioGroup.Root
              className="radio-group"
              value={tracktFormat}
              onValueChange={setTrackFormat}
            >
              <label className="radio-label">
                <span>
                  <RadioGroup.Item className="radio-item" value="Singles" />
                  &nbsp; Singles
                </span>
              </label>
              <label className="radio-label">
                <span>
                  <RadioGroup.Item className="radio-item" value="Album" />
                  &nbsp; Album
                </span>
              </label>
            </RadioGroup.Root>
            {tracktFormat === "Singles" ? (
              <>
                {" "}
                <ImageUpload
                  placeholderImg="upload-img.png"
                  placeholderTxt="Drop your image here"
                  className="release-img-upload"
                />
                <label htmlFor="">Instrumental *</label>
                <RadioGroup.Root className="radio-group" defaultValue="No">
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
                <label htmlFor="">Tittle *</label>
                <input type="text" placeholder="Enter release tittle here" />
                <label htmlFor="">Version/Subtittle</label>
                <input type="text" placeholder="Enter version" />
                <div className="form-grid">
                  <div>
                    <label htmlFor="">Primary Artist *</label>

                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select primary artist"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Featuring</label>
                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select featuring"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Lyricist *</label>
                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select lyricist"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Composer *</label>
                    <SearchDropdown
                      items={artistsItems}
                      itemKey="name"
                      imagePath="artists/"
                      imageKey="img"
                      searchTxt="Search and select composer"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Arranger</label>
                    <input type="text" placeholder="Enter arranger full name" />
                  </div>
                  <div>
                    <label htmlFor="">Producer</label>
                    <input type="text" placeholder="Enter producer full name" />
                  </div>
                </div>
                <label htmlFor="">Publisher</label>
                <input type="text" placeholder="Enter publisher" />
                <div className="form-grid">
                  <div>
                    <label htmlFor="">Genre *</label>
                    <Dropdown
                      label="Select genre..."
                      options={["Option 1", "Option 2", "Option 3"]}
                      onSelect={setGenreDropdown}
                      select={genreDropdown}
                      className="createRelease-dropdown"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Sub-Genre *</label>
                    <Dropdown
                      label="Select sub-genre..."
                      options={["Option 1", "Option 2", "Option 3"]}
                      onSelect={setSubGenreDropdown}
                      select={subGenreDropdown}
                      className="createRelease-dropdown"
                    />
                  </div>
                  <div>
                    <label htmlFor="">℗ line *</label>
                    <input type="text" placeholder="Enter ℗ line" />
                  </div>
                  <div>
                    <label htmlFor="">Production Year *</label>
                    <Dropdown
                      label="Select a year..."
                      options={["Option 1", "Option 2", "Option 3"]}
                      onSelect={setProductionYearDropdown}
                      select={productionYearDropdown}
                      className="createRelease-dropdown"
                    />
                  </div>
                  <div>
                    <label htmlFor="">Do you already have a ISRC? *</label>
                    <RadioGroup.Root className="radio-group" defaultValue="No">
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
                  </div>
                  <div>
                    <label htmlFor="">ISRC *</label>
                    <input type="text" placeholder="Enter ISRC" />
                  </div>
                  <div>
                    <label htmlFor="">Parental advisory *</label>
                    <RadioGroup.Root className="radio-group" defaultValue="No">
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
                  </div>
                  <div>
                    <label htmlFor="">Preview start</label>
                    <input type="text" placeholder="120.000" />
                  </div>
                </div>
                <label htmlFor="">Lyrics Language *</label>
                <Dropdown
                  label="Select a year..."
                  options={["Option 1", "Option 2", "Option 3"]}
                  onSelect={setProductionYearDropdown}
                  select={productionYearDropdown}
                  className="createRelease-dropdown"
                />
                <label htmlFor="">Lyrics</label>
                <textarea placeholder="Add lyrics here"></textarea>
              </>
            ) : (
              <>
                {(albumTrackList || []).map((album, index) => (
                  <Collapsible.Root
                    key={index}
                    open={albumSongList[index] || false} // Use object state
                    onOpenChange={() => toggleAlbum(index)}
                  >
                    <Collapsible.Trigger asChild>
                      <div className="release-album-list">
                        <IoPlayCircleOutline className="release-album-playIcon" />
                        <div>
                          <p>{album.title}</p>
                          <small>{album.artist}</small>
                        </div>
                        <div className="d-flex release-album-RangeDiv">
                          <p>{album.duration}</p>
                          <Slider.Root
                            className="rangeSliderRoot"
                            defaultValue={[50]}
                            max={100}
                            step={1}
                          >
                            <Slider.Track className="SliderTrack">
                              <Slider.Range className="SliderRange" />
                            </Slider.Track>
                            <Slider.Thumb
                              className="SliderThumb"
                              aria-label="Volume"
                            />
                          </Slider.Root>
                          {albumSongList[index] ? (
                            <IoIosArrowUp className="release-album-arrowIcon" />
                          ) : (
                            <IoIosArrowDown className="release-album-arrowIcon" />
                          )}
                        </div>
                      </div>
                    </Collapsible.Trigger>

                    <Collapsible.Content>
                      <span>line</span>
                    </Collapsible.Content>
                  </Collapsible.Root>
                ))}
                <div className={addAlbumSong && "add-album-div"}>
                  {addAlbumSong && (
                    <>
                      <h4>Fill Track Meta Data</h4>
                      <ImageUpload
                        placeholderImg="upload-img.png"
                        placeholderTxt="Drop your image here"
                        className="release-img-upload"
                      />
                      <label htmlFor="">Instrumental *</label>
                      <RadioGroup.Root
                        className="radio-group"
                        value={addAlbumInstrument}
                        onValueChange={setAddAlbumInstrument}
                      >
                        <label className="radio-label">
                          <span>
                            <RadioGroup.Item
                              className="radio-item"
                              value="No"
                            />
                            &nbsp; No
                          </span>
                        </label>
                        <label className="radio-label">
                          <span>
                            <RadioGroup.Item
                              className="radio-item"
                              value="Yes"
                            />
                            &nbsp; Yes
                          </span>
                        </label>
                      </RadioGroup.Root>
                      {addAlbumInstrument === "No" ? (
                        <>
                          <label>Tittle *</label>
                          <input
                            type="text"
                            placeholder="Enter release tittle here"
                          />
                          <label>Version/Subtittle</label>
                          <input type="text" placeholder="Enter version" />
                          <div className="form-grid">
                            <div>
                              <label htmlFor="">Primary Artist *</label>

                              <SearchDropdown
                                items={artistsItems}
                                itemKey="name"
                                imagePath="artists/"
                                imageKey="img"
                                searchTxt="Search and select primary artist"
                              />
                            </div>
                            <div>
                              <label htmlFor="">Featuring</label>

                              <SearchDropdown
                                items={artistsItems}
                                itemKey="name"
                                imagePath="artists/"
                                imageKey="img"
                                searchTxt="Search and select featuring"
                              />
                            </div>
                            <div>
                              <label htmlFor="">Lyricist *</label>

                              <SearchDropdown
                                items={artistsItems}
                                itemKey="name"
                                imagePath="artists/"
                                imageKey="img"
                                searchTxt="Search and select lyricist"
                              />
                            </div>
                            <div>
                              <label htmlFor="">Composer *</label>

                              <SearchDropdown
                                items={artistsItems}
                                itemKey="name"
                                imagePath="artists/"
                                imageKey="img"
                                searchTxt="Search and select composer"
                              />
                            </div>
                            <div>
                              <label>Arranger</label>
                              <input
                                type="text"
                                placeholder="Enter arranger full name"
                              />
                            </div>
                            <div>
                              <label>Producer</label>
                              <input
                                type="text"
                                placeholder="Enter producer full name"
                              />
                            </div>
                          </div>
                          <label>Publisher</label>
                          <input type="text" placeholder="Enter publisher" />
                          <div className="form-grid">
                            <div>
                              <label htmlFor="">Genre *</label>
                              <Dropdown
                                label="Select genre..."
                                options={["Option 1", "Option 2", "Option 3"]}
                                onSelect={setGenreDropdown}
                                select={genreDropdown}
                                className="createRelease-dropdown"
                              />
                            </div>
                            <div>
                              <label htmlFor="">Sub-Genre *</label>
                              <Dropdown
                                label="Select sub-genre..."
                                options={["Option 1", "Option 2", "Option 3"]}
                                onSelect={setSubGenreDropdown}
                                select={subGenreDropdown}
                                className="createRelease-dropdown"
                              />
                            </div>
                            <div>
                              <label>℗ line *</label>
                              <input type="text" placeholder="Enter ℗ line" />
                            </div>
                            <div>
                              <label htmlFor="">Production Year *</label>
                              <Dropdown
                                label="Select a year..."
                                options={["Option 1", "Option 2", "Option 3"]}
                                onSelect={setGenreDropdown}
                                select={genreDropdown}
                                className="createRelease-dropdown"
                              />
                            </div>
                            <div>
                              <label htmlFor="">
                                Do you already have a ISRC? *
                              </label>
                              <RadioGroup.Root
                                className="radio-group"
                                defaultValue="Yes"
                              >
                                <label className="radio-label">
                                  <span>
                                    <RadioGroup.Item
                                      className="radio-item"
                                      value="No"
                                    />
                                    &nbsp; No
                                  </span>
                                </label>
                                <label className="radio-label">
                                  <span>
                                    <RadioGroup.Item
                                      className="radio-item"
                                      value="Yes"
                                    />
                                    &nbsp; Yes
                                  </span>
                                </label>
                              </RadioGroup.Root>
                            </div>
                            <div>
                              <label>ISRC *</label>
                              <input type="text" placeholder="Enter ISRC" />
                            </div>
                            <div>
                              <label htmlFor="">Parental advisory *</label>
                              <RadioGroup.Root
                                className="radio-group"
                                defaultValue="Yes"
                              >
                                <label className="radio-label">
                                  <span>
                                    <RadioGroup.Item
                                      className="radio-item"
                                      value="No"
                                    />
                                    &nbsp; No
                                  </span>
                                </label>
                                <label className="radio-label">
                                  <span>
                                    <RadioGroup.Item
                                      className="radio-item"
                                      value="Yes"
                                    />
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
                            </div>
                            <div>
                              <label htmlFor="">Preview start </label>
                              <input type="number" placeholder="120.000" />
                            </div>
                          </div>
                          <label htmlFor="">Lyrics Language *</label>
                          <Dropdown
                            label="Select language..."
                            options={["Option 1", "Option 2", "Option 3"]}
                            onSelect={setProductionYearDropdown}
                            select={productionYearDropdown}
                            className="createRelease-dropdown"
                          />
                          <label htmlFor="">Lyrics</label>
                          <textarea placeholder="Add lyrics here"></textarea>
                          <br />
                          <br />
                        </>
                      ) : (
                        <>
                          <label>Tittle *</label>
                          <input
                            type="text"
                            placeholder="Enter release tittle here"
                          />
                          <label>Version/Subtittle</label>
                          <input type="text" placeholder="Enter version" />
                          <div className="form-grid">
                            <div>
                              <label htmlFor="">Primary Artist *</label>

                              <SearchDropdown
                                items={artistsItems}
                                itemKey="name"
                                imagePath="artists/"
                                imageKey="img"
                                searchTxt="Search and select primary artist"
                              />
                            </div>
                            <div>
                              <label htmlFor="">Featuring</label>

                              <SearchDropdown
                                items={artistsItems}
                                itemKey="name"
                                imagePath="artists/"
                                imageKey="img"
                                searchTxt="Search and select featuring"
                              />
                            </div>
                          </div>
                          <label htmlFor="">Composer *</label>

                          <SearchDropdown
                            items={artistsItems}
                            itemKey="name"
                            imagePath="artists/"
                            imageKey="img"
                            searchTxt="Search and select composer"
                          />
                          <div className="form-grid">
                            <div>
                              <label htmlFor="">Arranger </label>
                              <input
                                type="text"
                                placeholder="Enter arranger full name"
                              />
                            </div>
                            <div>
                              <label htmlFor="">Producer </label>
                              <input
                                type="text"
                                placeholder="Enter producer full name"
                              />
                            </div>
                          </div>
                          <label htmlFor="">Publisher </label>
                          <input type="text" placeholder="Enter publisher" />
                          <div className="form-grid">
                            <div>
                              <label htmlFor="">Genre *</label>
                              <Dropdown
                                label="Select genre..."
                                options={["Option 1", "Option 2", "Option 3"]}
                                onSelect={setGenreDropdown}
                                select={genreDropdown}
                                className="createRelease-dropdown"
                              />
                            </div>
                            <div>
                              <label htmlFor="">Sub-Genre *</label>
                              <Dropdown
                                label="Select sub-genre..."
                                options={["Option 1", "Option 2", "Option 3"]}
                                onSelect={setSubGenreDropdown}
                                select={subGenreDropdown}
                                className="createRelease-dropdown"
                              />
                            </div>
                            <div>
                              <label>℗ line *</label>
                              <input type="text" placeholder="Enter ℗ line" />
                            </div>
                            <div>
                              <label htmlFor="">Production Year *</label>
                              <Dropdown
                                label="Select a year..."
                                options={["Option 1", "Option 2", "Option 3"]}
                                onSelect={setGenreDropdown}
                                select={genreDropdown}
                                className="createRelease-dropdown"
                              />
                            </div>
                            <div>
                              <label htmlFor="">
                                Do you already have a ISRC? *
                              </label>
                              <RadioGroup.Root
                                className="radio-group"
                                defaultValue="Yes"
                              >
                                <label className="radio-label">
                                  <span>
                                    <RadioGroup.Item
                                      className="radio-item"
                                      value="No"
                                    />
                                    &nbsp; No
                                  </span>
                                </label>
                                <label className="radio-label">
                                  <span>
                                    <RadioGroup.Item
                                      className="radio-item"
                                      value="Yes"
                                    />
                                    &nbsp; Yes
                                  </span>
                                </label>
                              </RadioGroup.Root>
                            </div>
                            <div>
                              <label>ISRC *</label>
                              <input type="text" placeholder="Enter ISRC" />
                            </div>
                            <div>
                              <label htmlFor="">Parental advisory *</label>
                              <RadioGroup.Root
                                className="radio-group"
                                defaultValue="Yes"
                              >
                                <label className="radio-label">
                                  <span>
                                    <RadioGroup.Item
                                      className="radio-item"
                                      value="No"
                                    />
                                    &nbsp; No
                                  </span>
                                </label>
                                <label className="radio-label">
                                  <span>
                                    <RadioGroup.Item
                                      className="radio-item"
                                      value="Yes"
                                    />
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
                            </div>
                            <div>
                              <label htmlFor="">Preview start </label>
                              <input type="number" placeholder="120.000" />
                            </div>
                          </div>
                          <label htmlFor="">Lyrics Language *</label>
                          <Dropdown
                            label="Select language..."
                            options={["Option 1", "Option 2", "Option 3"]}
                            onSelect={setProductionYearDropdown}
                            select={productionYearDropdown}
                            className="createRelease-dropdown"
                          />
                          <label htmlFor="">Lyrics</label>
                          <textarea placeholder="Add lyrics here"></textarea>
                          <br />
                          <br />
                        </>
                      )}
                      {/* add album  track Instrumental yes no section end */}
                    </>
                  )}
                  <button
                    className="theme-btn"
                    style={{ width: "100%", margin: "0" }}
                    onClick={() => setAddAlbumSong(!addAlbumSong)}
                  >
                    Add Track +
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <h3 className="create-release-heading">Release start date</h3>
          <div className="createRelease-content-div">
            <br />
            <RadioGroup.Root
              className="radio-group"
              defaultValue="specificDate"
            >
              <div>
                <label className="radio-label">
                  <span style={{ justifyContent: "left" }}>
                    <RadioGroup.Item
                      className="radio-item"
                      value="AsSoonAsPossible"
                    />
                    &nbsp; As soon as possible
                  </span>
                </label>
                <p style={{ fontSize: "14px", color: "#838383" }}>
                  Usually a few hours, but can be a few days for some
                  stores/services.
                </p>
              </div>
              <div>
                <label className="radio-label">
                  <span>
                    <RadioGroup.Item
                      className="radio-item"
                      value="specificDate"
                    />
                    &nbsp; On a specific date
                  </span>
                </label>
                <br />
                <input
                  type="date"
                  placeholder="mm/dd/yyyy"
                  style={{ width: "auto", color: "#838383" }}
                />
              </div>
            </RadioGroup.Root>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <h3 className="create-release-heading">Release Overview</h3>
          <div className="createRelease-content-div createRelease-overview-div">
            <div className="d-flex release-overview-img-div">
              <img
                src="src/assets/release-create.png"
                className="release-overview-img"
                alt=""
              />
              <div style={{ margin: "auto" }}>
                <h1>Ami Dur Hote Tomarei Dekhechi</h1>
                <h2>Ayuska Bhowmik</h2>
              </div>
            </div>
            <hr />
            <h3 className="release-album-title">Album Info</h3>
            <div className="release-album-info-row">
              {releaseAlbumInfo.map((item, index) => (
                <div key={index} className="d-flex">
                  <p>{item.title}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
            <hr />
            <h3 className="release-album-title">Tracks</h3>
            <div>
              <Collapsible.Root
                open={albumOverviewSong}
                onOpenChange={setAlbumOverviewSong}
                style={{ background: "#F9F9F9", borderRadius: "4px" }}
              >
                <Collapsible.Trigger asChild>
                  <div className="release-album-list">
                    <IoPlayCircleOutline />
                    <div>
                      <p>Tere Bin</p>
                      <small>Ayuska Bhowmik</small>
                    </div>
                    <div className="d-flex release-album-RangeDiv">
                      <p>04:23</p>
                      <Slider.Root
                        className="rangeSliderRoot"
                        defaultValue={[50]}
                        max={100}
                        step={1}
                      >
                        <Slider.Track className="SliderTrack">
                          <Slider.Range className="SliderRange" />
                        </Slider.Track>
                        <Slider.Thumb
                          className="SliderThumb"
                          aria-label="Volume"
                        />
                      </Slider.Root>
                      <button className="release-track-download-btn">
                        <RiDownloadLine /> Download
                      </button>
                      {albumOverviewSong ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>
                  </div>
                </Collapsible.Trigger>

                <Collapsible.Content>
                  <div className="album-details">
                    <Tabs.Root
                      className="tabs-root"
                      defaultValue="TrackDetails"
                    >
                      <Tabs.List className="tabs-list">
                        <Tabs.Trigger
                          className="tabs-trigger release-track-tabs-trigger"
                          value="TrackDetails"
                        >
                          Track Details
                        </Tabs.Trigger>
                        <Tabs.Trigger
                          className="tabs-trigger release-track-tabs-trigger"
                          value="Credits"
                        >
                          Credits
                        </Tabs.Trigger>
                      </Tabs.List>

                      <Tabs.Content
                        className="tabs-content"
                        value="TrackDetails"
                      >
                        <div className="release-track-details">
                          {releaseTrackDetails.map((item, index) => (
                            <div key={index} className="d-flex">
                              <p>{item.title}</p>
                              <p>
                                {item.title === "Lyrics:"
                                  ? item.value.length > 35 && (
                                      <>
                                        {item.value.slice(0, 35) + "..."}
                                        <Dialog.Root>
                                          <Dialog.Trigger>
                                            Read More
                                          </Dialog.Trigger>
                                          <Modal title="Payment Rejection Details">
                                            <p className="modal-description">
                                              Tere Bin Main Yun Kaise JiyaKaise
                                            </p>
                                            <p className="modal-description">
                                              Jiya Tere BinTere Bin Main Yun
                                            </p>
                                            <p className="modal-description">
                                              Kaise JiyaKaise Jiya Tere BinLekar
                                            </p>
                                            <p className="modal-description">
                                              Yaad Teri Raaten Meri KatiLekar
                                            </p>
                                            <p className="modal-description">
                                              Yaad Teri Raaten Meri Katihjk
                                            </p>
                                          </Modal>
                                        </Dialog.Root>
                                      </>
                                    )
                                  : item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </Tabs.Content>
                      <Tabs.Content className="tabs-content" value="Credits">
                        <p>Access and update your documents.</p>
                      </Tabs.Content>
                    </Tabs.Root>
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
            </div>
          </div>
        </>
      )}

      <br />
      <br />
      {step === 4 || (
        <div className="createRelease-btns">
          {step > 0 && (
            <button
              className="theme-btn2"
              style={{
                display: "flex",
                alignItems: "center",
              }}
              onClick={handlePrev}
            >
              <ArrowLeft />
              &nbsp; Back
            </button>
          )}
          <button
            style={{
              margin: "auto",
              background: "none",
              border: "none",
            }}
          >
            cancel
          </button>
          {step < steps.length - 1 ? (
            <button className="theme-btn" onClick={handleNext}>
              Next &nbsp; <ArrowRight />
            </button>
          ) : (
            <button className="theme-btn" onClick={() => setStep(4)}>
              Submit &nbsp; <ArrowRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
CreateRelease.propTypes = {
  artistsItems: PropTypes.array.isRequired,
  LablesItems: PropTypes.array.isRequired,
  releaseAlbumInfo: PropTypes.array.isRequired,
  releaseTrackDetails: PropTypes.array.isRequired,
  albumTrackList: PropTypes.array.isRequired,
};
export default CreateRelease;
