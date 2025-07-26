import { useEffect, useState } from "react";
import GeneralSettingsList from "./GeneralSettingsList";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Collapsible } from "radix-ui";
import GeneralSettingsCheckBox from "./GeneralSettingsCheckBox";
import axios from "axios";
import textToHTML from "../../../hooks/textToHTML";
import toast from "react-hot-toast";
import { X } from "lucide-react";
function GeneralSettings() {
  const [settingsHomeNoticeCollapse, setSettingsHomeNoticeCollapse] = useState(true);
  const [settingsWithdrawalNoticeCollapse, setSettingsWithdrawalNoticeCollapse] = useState(true);


  // Genre Fetch_______________________________________________________
  // __________________________________________________________________
  const [genres, setGenres] = useState([]);
  const [genreFilter, setGenreFilter] = useState();
  const [totalGenres, setTotalGenres] = useState();
  const [reFetchGenre, setReFetchGenre] = useState(1);
  useEffect(() => {
    axios.get(`http://localhost:5000/admin/api/v1/settings/genre`)
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
    axios.get('http://localhost:5000/admin/api/v1/settings/language')
    .then(res => {
      setLanguage(res.data.data);
      setLanguageFilter(res.data.data);
      setTotalLanguage(res.data.dataCount);
    })
  }, [reFetchLanguage])

  // Release Rejections List Fetch______________________________________
  // ___________________________________________________________________
  const [releaseRejectionsList, setReleaseRejectionsList] = useState([]);
  const [releaseRejectionsListFilter, setReleaseRejectionsListFilter] = useState([]);
  const [totalReleaseRejectionsList, setTotalReleaseRejectionsList] = useState();
  const [reFetchReleaseRejectList, setReFetchReleaseRejectList] = useState(1);
  useEffect( () => {
    axios.get('http://localhost:5000/admin/api/v1/settings/release-rejections-list')
    .then(res => {
      setReleaseRejectionsList(res.data.data);
      setReleaseRejectionsListFilter(res.data.data);
      setTotalReleaseRejectionsList(res.data.dataCount);
    })
  }, [reFetchReleaseRejectList])


  // Label Rejections List Fetch______________________________________
  // ___________________________________________________________________
  const [labelRejectionsList, setLabelRejectionsList] = useState([]);
  const [labelRejectionsListFilter, setLabelRejectionsListFilter] = useState([]);
  const [totalLabelRejectionsList, setTotalLabelRejectionsList] = useState();
  const [reFetchLabelRejectList, setReFetchLabelRejectList] = useState(1);
  useEffect( () => {
    axios.get('http://localhost:5000/admin/api/v1/settings/label-rejections-list')
    .then(res => {
      setLabelRejectionsList(res.data.data);
      setLabelRejectionsListFilter(res.data.data);
      setTotalLabelRejectionsList(res.data.dataCount);
    })
  }, [reFetchLabelRejectList])

  // Service Rejections List Fetch______________________________________
  // ___________________________________________________________________
  const [serviceRejectionsList, setServiceRejectionsList] = useState([]);
  const [serviceRejectionsListFilter, setServiceRejectionsListFilter] = useState([]);
  const [totalServiceRejectionsList, setTotalServiceRejectionsList] = useState();
  const [reFetchServiceRejectList, setReFetchServiceRejectList] = useState(1);
  useEffect( () => {
    axios.get('http://localhost:5000/admin/api/v1/settings/service-rejections-list')
    .then(res => {
      setServiceRejectionsList(res.data.data);
      setServiceRejectionsListFilter(res.data.data);
      setTotalServiceRejectionsList(res.data.dataCount);
    })
  }, [reFetchServiceRejectList])



  // Home page Notice Releated Function_______________________________
  // _________________________________________________________________
  const [homePageNotices, setHomePageNotices] = useState();
  const [reFetchHomePageNotice, setReFetchHomePageNotice] = useState(1)
  useEffect(() => {
    axios.get('http://localhost:5000/admin/api/v1/settings/home-page-notice')
    .then(res => {
      setHomePageNotices(res.data.data);
    })
  },[reFetchHomePageNotice])

  const [homePageInputNoticeText, setHomePageInputNoticeText] = useState('');
  const [homePageInputErr, setHomePageInputErr] = useState();
  const addHomePageNotice = () => {
    setHomePageInputErr('')
    if(!homePageInputNoticeText){
      setHomePageInputErr('Please write notice message')
      return;
    }

    const finalizeText = textToHTML(homePageInputNoticeText)
    const payload = {notice: finalizeText, date: new Date().toISOString()};
    axios.post(`http://localhost:5000/admin/api/v1/settings/home-page-notice/add-home-page-notice`, payload)
    .then(res => {
      if(res.status == 200){
        toast.success(res.data.message)
        setReFetchHomePageNotice(reFetchHomePageNotice + 1)
        setHomePageInputNoticeText('')
      }
    })
  }
  const deleteHomePageNotice = (id) => {
    axios.delete(`http://localhost:5000/admin/api/v1/settings/home-page-notice/${id}`)
    .then(res => {
        if(res.status == 200){
            setReFetchHomePageNotice(reFetchHomePageNotice + 1)
            toast.success(res.data.message)
        }
    })
    .catch(er => console.log(er))
  }

  // Withdraw page Notice Releated Function_______________________________
  // _____________________________________________________________________
  const [withdrawPageNotices, setWithdrawPageNotices] = useState();
  const [reFetchWithdrawPageNotice, setReFetchWithdrawPageNotice] = useState(1)
  useEffect(() => {
    axios.get('http://localhost:5000/admin/api/v1/settings/withdraw-page-notice')
    .then(res => {
      setWithdrawPageNotices(res.data.data);
    })
  },[reFetchWithdrawPageNotice])

  const [withdrawPageInputNoticeText, setWithdrawPageInputNoticeText] = useState('');
  const [withdrawPageInputErr, setWithdrawPageInputErr] = useState();
  const addWithdrawPageNotice = () => {
    setWithdrawPageInputErr('')
    if(!withdrawPageInputNoticeText){
      setWithdrawPageInputErr('Please write notice message')
      return;
    }

    const finalizeText = textToHTML(withdrawPageInputNoticeText)
    const payload = {notice: finalizeText, date: new Date().toISOString()};
    axios.post(`http://localhost:5000/admin/api/v1/settings/withdraw-page-notice/add-withdraw-page-notice`, payload)
    .then(res => {
      if(res.status == 200){
        toast.success(res.data.message)
        setReFetchWithdrawPageNotice(reFetchHomePageNotice + 1)
        setWithdrawPageInputNoticeText('')
      }
    })
  }
  const deleteWithdrawPageNotice = (id) => {
    axios.delete(`http://localhost:5000/admin/api/v1/settings/withdraw-page-notice/${id}`)
    .then(res => {
        if(res.status == 200){
            setReFetchWithdrawPageNotice(reFetchWithdrawPageNotice + 1)
            toast.success(res.data.message)
        }
    })
    .catch(er => console.log(er))
  }




  


  return (
    <div>
      {" "}
      <GeneralSettingsList
        title="Genre"
        inputName="genre"
        items={genres}
        setItems={setGenres}
        forFilter={genreFilter}
        total={totalGenres}
        createLink={`http://localhost:5000/admin/api/v1/settings/genre/add-genre`}
        deleteLink={`http://localhost:5000/admin/api/v1/settings/genre`}
        reFetch={reFetchGenre}
        setReFetch={setReFetchGenre}
      />
      <GeneralSettingsList
        title="Language"
        inputName="language"
        items={language}
        setItems={setLanguage}
        forFilter={languageFilter}
        total={totalLanguage}
        createLink={`http://localhost:5000/admin/api/v1/settings/language/add-language`}
        deleteLink={`http://localhost:5000/admin/api/v1/settings/language`}
        reFetch={reFetchLanguage}
        setReFetch={setReFetchLanguage}
      />
      <GeneralSettingsList
        title="Release Rejections List"
        inputName="option"
        items={releaseRejectionsList}
        setItems={setReleaseRejectionsList}
        forFilter={releaseRejectionsListFilter}
        total={totalReleaseRejectionsList}
        createLink={`http://localhost:5000/admin/api/v1/settings/release-rejections-list/add-release-rejections-option`}
        deleteLink={`http://localhost:5000/admin/api/v1/settings/release-rejections-list`}
        reFetch={reFetchReleaseRejectList}
        setReFetch={setReFetchReleaseRejectList}
      />
      <GeneralSettingsList
        title="Label Rejections List"
        inputName="option"
        items={labelRejectionsList}
        setItems={setLabelRejectionsList}
        forFilter={labelRejectionsListFilter}
        total={totalLabelRejectionsList}
        createLink={`http://localhost:5000/admin/api/v1/settings/label-rejections-list/add-label-rejections-option`}
        deleteLink={`http://localhost:5000/admin/api/v1/settings/label-rejections-list`}
        reFetch={reFetchLabelRejectList}
        setReFetch={setReFetchLabelRejectList}
      />
      <GeneralSettingsList
        title="Service Rejections List"
        inputName="option"
        items={serviceRejectionsList}
        setItems={setServiceRejectionsList}
        forFilter={serviceRejectionsListFilter}
        total={totalServiceRejectionsList}
        createLink={`http://localhost:5000/admin/api/v1/settings/service-rejections-list/add-service-rejections-option`}
        deleteLink={`http://localhost:5000/admin/api/v1/settings/service-rejections-list`}
        reFetch={reFetchServiceRejectList}
        setReFetch={setReFetchServiceRejectList}
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

{/* setHomePageInputNoticeText, addHomePageNotice, deleteHomePageNotice */}


        <Collapsible.Content>
          <textarea
            placeholder="Write notice here"
            style={{ width: "100%" }}
            className="settings-textarea"
            value={homePageInputNoticeText}
            onChange={(e) => {
              setHomePageInputNoticeText(e.target.value)
              setHomePageInputErr('')
            }}
          ></textarea>
          {
            homePageInputErr && <p style={{color: 'red'}}>{homePageInputErr}</p>
          }
          <p className="messageBox-time">Max 80 words</p>
          <button onClick={addHomePageNotice} className="theme-btn save-btn">Save</button>
          <br />
          <br />
          {
            homePageNotices && 
            homePageNotices.map(notice => 
              <div style={{padding: '10px', borderRadius: '10px', border: '0.5px solid #8e8e8eff', margin: '6px'}}>
                <div style={{display: 'flex', justifyContent:'space-between',}}>
                  <div dangerouslySetInnerHTML={{ __html: notice?.notice }} />
                  <X onClick={() => deleteHomePageNotice(notice._id)} style={{color: '#ea3958'}}/>
                </div>
              </div>
            )
          }
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
            value={withdrawPageInputNoticeText}
            onChange={(e) => {
              setWithdrawPageInputNoticeText(e.target.value)
              setWithdrawPageInputErr('')
            }}
          ></textarea>
          {
            withdrawPageInputErr && <p style={{color: 'red'}}>{withdrawPageInputErr}</p>
          }
          <p className="messageBox-time">Max 80 words</p>
          <button onClick={addWithdrawPageNotice} className="theme-btn save-btn">Save</button>
          <br />
          <br />
          {
            withdrawPageNotices && 
            withdrawPageNotices.map(notice => 
              <div style={{padding: '10px', borderRadius: '10px', border: '0.5px solid #8e8e8eff', margin: '6px'}}>
                <div style={{display: 'flex', justifyContent:'space-between',}}>
                  <div dangerouslySetInnerHTML={{ __html: notice?.notice }} />
                  <X onClick={() => deleteWithdrawPageNotice(notice._id)} style={{color: '#ea3958'}}/>
                </div>
              </div>
            )
          }
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}

export default GeneralSettings;
