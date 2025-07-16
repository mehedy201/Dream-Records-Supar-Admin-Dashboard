import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reFetchArtist: 1,
  reFetchLabel: 1,
  reFetchServiceRequest: 1,
  isLoading: false,
  error: null,
};

export const reFetchDataHandleSlice = createSlice({
  name: "reFetchSlice",
  initialState,
  reducers: {
    setReFetchArtist: (state, action) => {
      state.reFetchArtist = action.payload; 
    },
    setReFetchLabel: (state, action) => {
      state.reFetchLabel = action.payload; 
    },
    setReFetchServiceRequest: (state, action) => {
      state.reFetchServiceRequest = action.payload; 
    },
  },
});

export const {setReFetchArtist, setReFetchLabel, setReFetchServiceRequest} = reFetchDataHandleSlice.actions;
export default reFetchDataHandleSlice.reducer;
