import { Tabs } from "radix-ui";
import { Collapsible } from "radix-ui";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { X } from "lucide-react";
// import { setTracksInfo } from "../../../redux/features/releaseDataHandleSlice/releaseDataHandleSlice";
// import axios from "axios";
import AudioPlayerForTracViewTab from "./AudioPlayer/AudioPlayerForTracViewTab";
// import artistDemoImg from "../assets/artists/artist4.png";
// import { cdnLink } from "../hooks/cdnLink";
import { Dialog } from "radix-ui";
import Modal from "./Modal";
import ArtistDetailsForModal from "../pages/Artists/components/ArtistDetailsForModal";

const TrackViewCollapsSection = ({ track, index }) => {
  const [albumOverviewSong, setAlbumOverviewSong] = useState(false);
  // const trackTittle = track.tittle;
  // const trackAudioUrl = track.audioUrl;
  // const dataForAudioPlayer = { tittle: trackTittle, audioUrl: trackAudioUrl };

  // const deleteTrack = (indexNumber) => {
  //   const updatedTracks = tracksInfo.filter((item, index) => index !== indexNumber);
  //   dispatch(setTracksInfo(updatedTracks))
  //   axios.delete(`https://dream-records-2025-m2m9a.ondigitalocean.app/api/v1/release/delete-file?key=${track.audioKey}`)
  //   .then( res => {
  //   if(res.status == 200){
  //       alert('Deleted')
  //   }
  //   })
  //   .catch(er => console.log(er));
  // }

  return (
    <div>
      <Collapsible.Root
        open={albumOverviewSong}
        onOpenChange={setAlbumOverviewSong}
        style={{ background: "#F9F9F9", borderRadius: "4px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <AudioPlayerForTracViewTab track={track} index={index} />
          </div>
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {/* {
                  index && 
                  <X size={18} onClick={() => deleteTrack(index)} style={{color: 'red', cursor: 'pointer'}}/>
                } */}
            <Collapsible.Trigger asChild>
              {albumOverviewSong ? (
                <MdKeyboardArrowUp className="release-album-arrowIcon" />
              ) : (
                <MdKeyboardArrowDown className="release-album-arrowIcon" />
              )}
            </Collapsible.Trigger>
          </div>
        </div>

        <Collapsible.Content>
          <div className="album-details">
            <Tabs.Root className="tabs-root" defaultValue="TrackDetails">
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

              <Tabs.Content className="tabs-content" value="TrackDetails">
                <div className="singleRelease-track-details">
                  <div className="d-flex">
                    <p>Tittle :</p>
                    <p>{track?.tittle}</p>
                  </div>
                  <div className="d-flex">
                    <p>Version/Subtittle:</p>
                    <p>{track?.versionSubtittle}</p>
                  </div>
                  <div className="d-flex">
                    <p>Parental Advisory:</p>
                    <p>{track?.parentalAdvisory}</p>
                  </div>
                  <div className="d-flex">
                    <p>Lyrics Language:</p>
                    <p>{track?.language}</p>
                  </div>
                  <div className="d-flex">
                    <p>Publisher:</p>
                    <p>{track?.publisher}</p>
                  </div>
                  <div className="d-flex">
                    <p>Lyrics:</p>
                    {
                      track?.Lyrics ?
                      <>
                      <Dialog.Root>
                        <Dialog.Trigger className="serviceRequest-view-trigger">
                          <p>{track?.Lyrics ? `${track?.Lyrics.slice(0, 20)}...`: ''}</p>
                        </Dialog.Trigger>
                        <Modal title='Lyrics'>
                          <p>{track?.Lyrics}</p>
                        </Modal>
                      </Dialog.Root>
                      </> : ''
                    }
                  </div>
                  <div className="d-flex">
                    <p>ISRC Code:</p>
                    <p>{track?.ISRC}</p>
                  </div>
                </div>
              </Tabs.Content>
              <Tabs.Content className="tabs-content" value="Credits">
                <div className="form-grid releaseCredit-formGrid">
                  <div className="d-flex releaseCredit-items">
                    <p className="releaseCredit-items-title">Primary Artist</p>
                    <div>
                      {track?.artist?.map((data, index) => (
                        <div>
                          <Dialog.Root key={index}>
                            <Dialog.Trigger className="serviceRequest-view-trigger">
                              <div key={index} className="d-flex">
                                {/* <img
                                  src={data?.key ? cdnLink(data?.key) : artistDemoImg}
                                  alt=""
                                /> */}
                                <p>{data?.artistName}</p>
                              </div>
                            </Dialog.Trigger>
                            <Modal title=''>
                              <ArtistDetailsForModal data={data}/>
                            </Modal>
                          </Dialog.Root>
                        </div>
                      ))}
                      {track?.primaryArtist?.map((data, index) => (
                        <div>
                          <Dialog.Root key={index}>
                            <Dialog.Trigger className="serviceRequest-view-trigger">
                              <div key={index} className="d-flex">
                                {/* <img
                                  src={data?.key ? cdnLink(data?.key) : artistDemoImg}
                                  alt=""
                                /> */}
                                <p>{data?.artistName}</p>
                              </div>
                            </Dialog.Trigger>
                            <Modal title='Primary Artist'>
                              <ArtistDetailsForModal data={data}/>
                            </Modal>
                          </Dialog.Root>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="d-flex releaseCredit-items"
                  >
                    <p className="releaseCredit-items-title">Lyricist</p>
                    <div>
                      {Array.isArray(track?.lyricist) &&
                        track.lyricist.length > 0 &&
                        (typeof track.lyricist[0] === "object"
                          ? track.lyricist.map((data, index) => (
                            <div>
                              <Dialog.Root key={index}>
                                <Dialog.Trigger className="serviceRequest-view-trigger">
                                  <div key={index} className="d-flex">
                                    {/* <img
                                      src={data?.key ? cdnLink(data?.key) : artistDemoImg}
                                      alt=""
                                    /> */}
                                    <p>{data?.artistName}</p>
                                  </div>
                                </Dialog.Trigger>
                                <Modal title='Lyricist'>
                                  <ArtistDetailsForModal data={data}/>
                                </Modal>
                              </Dialog.Root>
                            </div>
                            ))
                          : track.lyricist.join(", ")
                        )}
                      {track?.authors &&
                        track.authors.map((author, index) => (
                          <span key={index} style={{ paddingRight: "5px" }}>
                            {author}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="d-flex releaseCredit-items">
                    <p className="releaseCredit-items-title">Featuring</p>
                    <div>
                      {track?.featuring?.map((data, index) => (
                        <div>
                          <Dialog.Root key={index}>
                            <Dialog.Trigger className="serviceRequest-view-trigger">
                              <div key={index} className="d-flex">
                                <p>{data?.artistName}</p>
                              </div>
                            </Dialog.Trigger>
                            <Modal title='Featuring'>
                              <ArtistDetailsForModal data={data}/>
                            </Modal>
                          </Dialog.Root>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="d-flex releaseCredit-items"
                  >
                    <p className="releaseCredit-items-title">Composer</p>
                    <div>

                      {Array.isArray(track?.composer) &&
                        track.composer.length > 0 &&
                        (typeof track.composer[0] === "object"
                          ? track.composer.map((data, index) => (
                            <div>
                              <Dialog.Root key={index}>
                                <Dialog.Trigger className="serviceRequest-view-trigger">
                                  <div key={index} className="d-flex">
                                    {/* <img
                                      src={data?.key ? cdnLink(data?.key) : artistDemoImg}
                                      alt=""
                                    /> */}
                                    <p>{data?.artistName}</p>
                                  </div>
                                </Dialog.Trigger>
                                <Modal title='Composer'>
                                  <ArtistDetailsForModal data={data}/>
                                </Modal>
                              </Dialog.Root>
                            </div>
                            ))
                          : track.composer.join(", "))}
                    </div>
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="d-flex releaseCredit-items"
                  >
                    <p className="releaseCredit-items-title">Producer</p>
                    <p>{track?.producer}</p>
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="d-flex releaseCredit-items"
                  >
                    <p className="releaseCredit-items-title">Arranger</p>
                    <p>{track?.arranger}</p>
                  </div>
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};

export default TrackViewCollapsSection;
