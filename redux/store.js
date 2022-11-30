import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth/userSlice';
import agencyReducer from "./agencyCounts/agencySlice";
import billReducer from "./billedCount/billedCountSlice";
import billStatusReducer from "./billStatus/billStatusSlice";
import uploadReducer from "./fileUpload/fileUploadSlice";
import billDeleteReducer from "./billDelete/billDeleteSlice";

export default configureStore({
	reducer: {
		users: userReducer,
		agencyCounts:agencyReducer,
		billCount:billReducer,
		billStatus:billStatusReducer,
		uploadData:uploadReducer,
		billDelete:billDeleteReducer,
	},
});