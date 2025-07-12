import { useEffect, useState } from "react";
import GeneralSettingsList from "./GeneralSettingsList";
import {
  labelRejectionsTable,
  languageTable,
  releaseRejectionsTable,
  serviceRejectionsTable,
  subGenreTable,
  genreTable,
} from "../../../data";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Collapsible } from "radix-ui";
import GeneralSettingsCheckBox from "./GeneralSettingsCheckBox";
function GeneralSettings() {
  const [settingsHomeNoticeCollapse, setSettingsHomeNoticeCollapse] =
    useState(true);
  const [
    settingsWithdrawalNoticeCollapse,
    setSettingsWithdrawalNoticeCollapse,
  ] = useState(true);
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [subGenres, setSubGenres] = useState([]);
  const [newSubGenre, setNewSubGenre] = useState("");
  const [language, setLanguage] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [releaseRejectionsList, setReleaseRejectionsList] = useState([]);
  const [newReleaseRejectionsList, setNewReleaseRejectionsList] = useState("");
  const [labelRejectionsList, setLabelRejectionsList] = useState([]);
  const [newLabelRejectionsList, setNewLabelRejectionsList] = useState("");
  const [serviceRejectionsList, setServiceRejectionsList] = useState([]);
  const [newServiceRejectionsList, setNewServiceRejectionsList] = useState("");
  useEffect(() => {
    setGenres([...genreTable]);
    setSubGenres([...subGenreTable]);
    setLanguage([...languageTable]);
    setReleaseRejectionsList([...releaseRejectionsTable]);
    setLabelRejectionsList([...labelRejectionsTable]);
    setServiceRejectionsList([...serviceRejectionsTable]);
  }, []);

  return (
    <div>
      {" "}
      <GeneralSettingsList
        title="Genre"
        items={genres}
        setItems={(newList) => {
          genreTable.length = 0;
          genreTable.push(...newList);
          setGenres([...newList]);
        }}
        newItem={newGenre}
        setNewItem={setNewGenre}
      />
      <GeneralSettingsList
        title="Sub-Genre"
        items={subGenres}
        setItems={(newList) => {
          subGenreTable.length = 0;
          subGenreTable.push(...newList);
          setSubGenres([...newList]);
        }}
        newItem={newSubGenre}
        setNewItem={setNewSubGenre}
      />
      <GeneralSettingsList
        title="Language"
        items={language}
        setItems={(newList) => {
          languageTable.length = 0;
          languageTable.push(...newList);
          setLanguage([...newList]);
        }}
        newItem={newLanguage}
        setNewItem={setNewLanguage}
      />
      <GeneralSettingsList
        title="Release Rejections List"
        items={releaseRejectionsList}
        setItems={(newList) => {
          releaseRejectionsTable.length = 0;
          releaseRejectionsTable.push(...newList);
          setReleaseRejectionsList([...newList]);
        }}
        newItem={newReleaseRejectionsList}
        setNewItem={setNewReleaseRejectionsList}
        className="releaseRejectList-header"
      />
      <GeneralSettingsList
        title="Label Rejections List"
        items={labelRejectionsList}
        setItems={(newList) => {
          labelRejectionsTable.length = 0;
          labelRejectionsTable.push(...newList);
          setLabelRejectionsList([...newList]);
        }}
        newItem={newLabelRejectionsList}
        setNewItem={setNewLabelRejectionsList}
      />
      <GeneralSettingsList
        title="Service Rejections List"
        items={serviceRejectionsList}
        setItems={(newList) => {
          serviceRejectionsTable.length = 0;
          serviceRejectionsTable.push(...newList);
          setServiceRejectionsList([...newList]);
        }}
        newItem={newServiceRejectionsList}
        setNewItem={setNewServiceRejectionsList}
      />
      <GeneralSettingsCheckBox />
      <Collapsible.Root
        open={settingsHomeNoticeCollapse}
        onOpenChange={() =>
          setSettingsHomeNoticeCollapse(!settingsHomeNoticeCollapse)
        }
        className="generalSettingsList-container"
      >
        <div style={{ marginBottom: "20px" }}>
          <div className="d-flex">
            <h3>Homepage’s Notice</h3>
            <Collapsible.Trigger asChild>
              <div style={{ marginLeft: "auto" }}>
                {settingsHomeNoticeCollapse ? (
                  <IoIosArrowUp className="collapse-arrowIcon" />
                ) : (
                  <IoIosArrowDown className="collapse-arrowIcon" />
                )}
              </div>
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <textarea
            placeholder="Write notice here"
            style={{ width: "100%" }}
            className="settings-textarea"
          ></textarea>
          <p className="messageBox-time">Max 80 words</p>
          <button className="theme-btn save-btn">Save</button>
        </Collapsible.Content>
      </Collapsible.Root>
      <Collapsible.Root
        open={settingsWithdrawalNoticeCollapse}
        onOpenChange={() =>
          setSettingsWithdrawalNoticeCollapse(!settingsWithdrawalNoticeCollapse)
        }
        className="generalSettingsList-container"
      >
        <div style={{ marginBottom: "20px" }}>
          <div className="d-flex">
            <h3>Withdrawal Notice</h3>
            <Collapsible.Trigger asChild>
              <div style={{ marginLeft: "auto" }}>
                {settingsWithdrawalNoticeCollapse ? (
                  <IoIosArrowUp className="collapse-arrowIcon" />
                ) : (
                  <IoIosArrowDown className="collapse-arrowIcon" />
                )}
              </div>
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <textarea
            placeholder="Write notice here"
            style={{ width: "100%" }}
            className="settings-textarea"
          ></textarea>
          <p className="messageBox-time">Max 80 words</p>
          <button className="theme-btn save-btn">Save</button>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

export default GeneralSettings;
