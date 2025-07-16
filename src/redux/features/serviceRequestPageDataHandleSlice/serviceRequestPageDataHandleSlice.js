import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceRequestData: '',
  isLoading: false,
  error: null,
};

export const serviceRequestPageDataHandleSlice = createSlice({
  name: "serviceRequestData",
  initialState,
  reducers: {
    setServiceRequestData: (state, action) => {
      state.serviceRequestData = action.payload; 
    }
  },
});

export const {setServiceRequestData} = serviceRequestPageDataHandleSlice.actions;
export default serviceRequestPageDataHandleSlice.reducer;
