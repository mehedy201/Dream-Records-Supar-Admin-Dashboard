import {createSlice} from "@reduxjs/toolkit";

const currentYear = new Date().getFullYear();
const years = [];

for (let year = currentYear; year >= 2020; year--) {
  years.push(year);
}

const initialState = {
    yearsList: years,
    releaseStatusList: ["All", "QC Approval", "Review", "Live", "Takedown", 'Error', 'Blocked'],
    labelStatusList: ["All", "Pending", "Review", "Approved", "Rejected"],
    isLoading: false,
    error: null,
}

export const yearsListSlice = createSlice({
    name: "years&status",
    initialState,
    reducers: {}
})

export default yearsListSlice.reducer