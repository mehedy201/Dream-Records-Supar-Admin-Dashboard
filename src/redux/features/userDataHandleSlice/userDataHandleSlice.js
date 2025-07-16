import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userNameIdRoll: null,
  isLoading: false,
  error: null,
};

export const userDataHandleSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload; 
    },
    setUserNameIdRoll: (state, action) => {
      state.userNameIdRoll = action.payload; // Just store the ID portion
    },
    clearUserData: (state) => {
      state.userData = null; 
    },
  },
});

export const {setUserData, setUserNameIdRoll, clearUserData} = userDataHandleSlice.actions;
export default userDataHandleSlice.reducer;
