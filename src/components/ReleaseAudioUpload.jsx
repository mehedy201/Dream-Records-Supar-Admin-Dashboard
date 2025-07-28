import { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import { CircleX } from "lucide-react";
import uploadFileIcon from '../assets/icons/upload-img.png'
import axios from "axios";
import AudioPlayerForEditRelease from "./AudioPlayerForEditRelease";

const ReleaseAudioUpload = ({
    className,
    audioData,
    setAudioData
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false)

  const releaseAudioUpload = (event) => {
        if(!event){
            return;
        }
        setErrorMessage('')
        setUploadLoading(true)
        const file = event.target.files[0];
        if(file.type !== 'audio/wav' && file.type !== 'audio/x-wav'){
            setErrorMessage('Please Select WAV file')
            setUploadLoading(false)
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        if(audioData?.audioKey){
            axios.delete(`http://localhost:5000/api/v1/release/delete-file?key=${audioData.audioKey}`)
            .then( res => {
            if(res.status == 200){
                setAudioData()
                console.log(res)
            }
            })
            .catch(er => console.log(er));
        }
    
        axios.post('http://localhost:5000/api/v1/release/upload-release-audio', formData)
            .then(res => {
                if(res.status == 200){
                    event.target.value = ''
                    setUploadLoading(false);
                    setAudioData(res.data.data);
                    console.log(res.data.data)
                }
            })
            .catch(er => console.log(er))
    }
    // Delete Audio AWS____________________________________________________________
    const handleDeleteAudio = (e) => {
        axios.delete(`http://localhost:5000/api/v1/release/delete-file?key=${e}`)
        .then( res => {
          if(res.status == 200){
            setAudioData('')
            console.log(res)
          }
        })
        .catch(er => console.log(er));
    }

  return (
    <>
    <div className="upload-container">
      <div style={{width: '100%', height: '173.5px'}} className={`upload-box ${className || ""}`}>
          <label style={{height: '173.5px', width: '100%', margin: 'auto', position: 'relative'}} className="upload-label">
            <div style={{position: 'absolute', top: '50%', left: '50%', transform:'translate(-50%, -50%)'}}>
                <img
                    src={uploadFileIcon}
                    alt="upload-img"
                    className="upload-icon"
                />
              <p>
                Drop your audio here or &nbsp;
                <span className="browse-file">Browse File</span>
              </p>
              <p style={{ color: "#BBBBBB" }}>Max. File size: 50MB</p>
            </div>
            {
              uploadLoading &&
              <div style={{height: '173.5px', width: '100%', borderRadius: '10px', position: 'absolute', top: '50%', left: '50%', transform:'translate(-50%, -50%)', backgroundColor: 'black', opacity: '0.5'}}></div>
            }
            <input
              style={{height: '173.5px', width: '100%', opacity: '0'}}
              type="file"
              onChange={releaseAudioUpload}
              className="file-input"
            />
          </label>
      </div>

    </div>
    {errorMessage && <p className="error-text">{errorMessage}</p>}
    {
        audioData && 
            <div style={{marginTop: '10px'}}>
                <p style={{fontSize: '12px', marginBottom: '0'}}>{audioData.audioName}</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <AudioPlayerForEditRelease audioSrc={audioData.audioUrl} />
                    <CircleX style={{color: '#EA3958', cursor: 'pointer'}} onClick={() => handleDeleteAudio(audioData.key)}/>
                </div>
            </div>
    }
    </>
  );
};

// ✅ Add PropTypes validation
ReleaseAudioUpload.propTypes = {
  className: PropTypes.string,
};

export default ReleaseAudioUpload;
