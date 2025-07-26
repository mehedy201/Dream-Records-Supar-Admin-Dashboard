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
import axios from "axios";
function GeneralSettings() {
  const [settingsHomeNoticeCollapse, setSettingsHomeNoticeCollapse] =
    useState(true);
  const [
    settingsWithdrawalNoticeCollapse,
    setSettingsWithdrawalNoticeCollapse,
  ] = useState(true);
  // const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [subGenres, setSubGenres] = useState([]);
  const [newSubGenre, setNewSubGenre] = useState("");
  // const [language, setLanguage] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  // const [releaseRejectionsList, setReleaseRejectionsList] = useState([]);
  const [newReleaseRejectionsList, setNewReleaseRejectionsList] = useState("");
  // const [labelRejectionsList, setLabelRejectionsList] = useState([]);
  const [newLabelRejectionsList, setNewLabelRejectionsList] = useState("");
  // const [serviceRejectionsList, setServiceRejectionsList] = useState([]);
  const [newServiceRejectionsList, setNewServiceRejectionsList] = useState("");
  useEffect(() => {
    setGenres([...genreTable]);
    setSubGenres([...subGenreTable]);
    setLanguage([...languageTable]);
    setReleaseRejectionsList([...releaseRejectionsTable]);
    setLabelRejectionsList([...labelRejectionsTable]);
    setServiceRejectionsList([...serviceRejectionsTable]);
  }, []);



  
  
  const [releaseRejectionsList, setReleaseRejectionsList] = useState([]);
  const [labelRejectionsList, setLabelRejectionsList] = useState([]);
  const [serviceRejectionsList, setServiceRejectionsList] = useState([]);
  
  
  
  const [totalReleaseRejectionsList, setTotalReleaseRejectionsList] = useState();
  const [totalLabelRejectionsList, setTotalLabelRejectionsList] = useState();
  const [totalServiceRejectionsList, setTotalServiceRejectionsList] = useState();

  
  
  const [reFetchReleaseRejectList, setReFetchReleaseRejectList] = useState(1);
  const [reFetchLabelRejectList, setReFetchRejectList] = useState(1);
  const [reFetchServiceRejectList, setReFetchServiceRejectList] = useState(1);


  // Genre Fetch_______________________________________________________
  // __________________________________________________________________
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState();
  const [totalGenres, setTotalGenres] = useState();
  const [reFetchGenre, setReFetchGenre] = useState(1);
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/api/v1/genre`)
    .then(res => {
      setGenres(res.data.data)
      setGenreFilter(res.data.data)
      setTotalGenres(res.data.dataCount)    
    })
  },[reFetchGenre])

  // Language Fetch_____________________________________________________
  // ___________________________________________________________________
  const [language, setLanguage] = useState([]);
  const [languageFilter, setLanguageFilter] = useState()
  const [totalLanguage, setTotalLanguage] = useState();
  const [reFetchLanguage, setReFetchLanguage] = useState(1);
  useEffect( () => {
    axios.get('http://localhost:5000/admin/api/v1/language')
    .then(res => {
      setLanguage(res.data.data);
      setLanguageFilter(res.data.data);
      setTotalLanguage(res.data.dataCount);
    })
  }, [reFetchLanguage])





  return (
    <div>
      {" "}
      <GeneralSettingsList
        title="Genre"
        items={genres}
        forFilter={genreFilter}
        setItems={setGenres}
        total={totalGenres}
        createLink={`http://localhost:5000/admin/api/v1/genre/add-genre`}
        deleteLink={`http://localhost:5000/admin/api/v1/genre`}
        reFetch={reFetchGenre}
        setReFetch={setReFetchGenre}
      />
      <GeneralSettingsList
        title="Language"
        setItems={setLanguage}
        items={language}
        forFilter={languageFilter}
        total={totalLanguage}
        createLink={`http://localhost:5000/admin/api/v1/language/add-language`}
        deleteLink={`http://localhost:5000/admin/api/v1/language`}
        reFetch={reFetchLanguage}
        setReFetch={setReFetchLanguage}
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
