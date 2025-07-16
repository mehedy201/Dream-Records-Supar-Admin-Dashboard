import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  releaseAlbumInfo: {},
  trackFormat: 'Singles',
  tracksInfo: [],
  releaseDate: {},
  isLoading: false,
  error: null,
};

export const releaseDataHandleSlice = createSlice({
  name: "releaseData",
  initialState,
  reducers: {
    setReleaseAlbumInfo: (state, action) => {
      state.releaseAlbumInfo = action.payload; 
    },
    setTrackFormat: (state, action) => {
      state.trackFormat = action.payload; 
    },
    setTracksInfo: (state, action) => {
      state.tracksInfo = action.payload; 
    },
    setReleaseDate: (state, action) => {
      state.releaseDate = action.payload; 
    },
  },
});

export const {setReleaseAlbumInfo, setSingleTrackInfo, setTracksInfo, setTrackFormat, setReleaseDate} = releaseDataHandleSlice.actions;
export default releaseDataHandleSlice.reducer;
