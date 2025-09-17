import { configureStore } from "@reduxjs/toolkit";

import userDataHandleReducer from "./features/userDataHandleSlice/userDataHandleSlice";
import yearsAndStatusList from './features/yearList&statusListSlice/yearList&statusListSlice';
import releaseDataHandleReducer from './features/releaseDataHandleSlice/releaseDataHandleSlice';
import reFetchDataHandleSlice from "./features/reFetchDataHandleSlice/reFetchDataHandleSlice";
import serviceRequestPageDataHandleSlice from "./features/serviceRequestPageDataHandleSlice/serviceRequestPageDataHandleSlice";
import createUserDataHandleSlice from "./features/createUserDataHandleSlice/createUserDataHandleSlice";

const store = configureStore({
    reducer: {
        userData: userDataHandleReducer,
        yearsAndStatus: yearsAndStatusList,
        releaseData: releaseDataHandleReducer,
        reFetchSlice: reFetchDataHandleSlice,
        serviceRequestPageSlice: serviceRequestPageDataHandleSlice,
        createUserDataSlice: createUserDataHandleSlice,
    }
})

export default store;