import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createUserFirstStep: {},
  createUserSecondStep: {},
  createUserThirdStep: {},
  isLoading: false,
  error: null,
};

export const createUserDataHandleSlice = createSlice({
  name: "reFetchSlice",
  initialState,
  reducers: {
    setCreateUserFirstStep: (state, action) => {
      state.createUserFirstStep = action.payload; 
    },
    setCreateUserSecondStep: (state, action) => {
      state.createUserSecondStep = action.payload; 
    },
    setCreateUserThirdStep: (state, action) => {
      state.createUserThirdStep = action.payload; 
    },
  },
});

export const {setCreateUserFirstStep, setCreateUserSecondStep, setCreateUserThirdStep} = createUserDataHandleSlice.actions;
export default createUserDataHandleSlice.reducer;
