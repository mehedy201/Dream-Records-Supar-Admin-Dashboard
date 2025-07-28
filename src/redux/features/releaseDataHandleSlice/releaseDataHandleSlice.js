import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
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
    setData: (state, action) => {
      state.data = action.payload; 
    },
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

export const {setReleaseAlbumInfo, setSingleTrackInfo, setTracksInfo, setTrackFormat, setReleaseDate, setData} = releaseDataHandleSlice.actions;
export default releaseDataHandleSlice.reducer;
