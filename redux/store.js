import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth/userSlice';
import agencyReducer from "./agencyCounts/agencySlice";
import billReducer from "./billedCount/billedCountSlice";
import billStatusReducer from "./billStatus/billStatusSlice";
import uploadReducer from "./fileUpload/fileUploadSlice";
import billDeleteReducer from "./billDelete/billDeleteSlice";
import billDataReducer from "./billData/billDataSlice";
import inputDataReducer from "./inputData/inputDataSlice";
import analysisGraphReducer from "./analysisRemarks/analysisGraph";
import analysisExceptionReducer from "./analysisRemarks/analysisException";
import analysisSummaryReducer from "./analysisRemarks/analysisSummary";


export default configureStore({
	reducer: {
		users: userReducer,
		agencyCounts:agencyReducer,
		billCount:billReducer,
		billStatus:billStatusReducer,
		uploadData:uploadReducer,
		billDelete:billDeleteReducer,
		billData:billDataReducer,
		inputData:inputDataReducer,
		analysisGraph:analysisGraphReducer,
		analysisException:analysisExceptionReducer,
		analysisSummary:analysisSummaryReducer
	},
});