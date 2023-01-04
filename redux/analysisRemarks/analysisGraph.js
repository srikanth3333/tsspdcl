import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getAnalysisRemark = createAsyncThunk('remark/getAnalysisRemark', 
	async (payload, {getState}) => {
        let code = getBoardName()
        return await axios.get(`https://mr.bharatsmr.com/dashboard/userAnalysisRemarks?startDate=${payload.startDate}&endDate=${payload.endDate}&boardCode=${code}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            
            let graphData = [];
            for (const [key, value] of Object.entries(res.data?.[0])) {
                
                if (key == 'IP' ) {
                    graphData.push({"analysisRemark": "Incorrect Parameter", "val": value})
                } 
                if (key == 'IR' ) {
                
                    graphData.push({"analysisRemark": "Incorrect Reading", "val": value})
                } if (key == 'II' ) {
                
                    graphData.push({"analysisRemark": "Invalid Image", "val": value})
                } 
                // if (key == 'MM' ) {
                
                //     graphData.push({"analysisRemark": "Meter Mismatch", "val": value})
                // } 
                if (key == 'PU' ) {
                
                    graphData.push({"analysisRemark": "Parameter is unclear", "val": value})
                } if (key == 'SP' ) {
                
                    graphData.push({"analysisRemark": "Spoof", "val": value})
                } if (key == 'UI' ) {
                
                    graphData.push({"analysisRemark": "Unclear Image", "val": value})
                }
                if (key == 'OK' ) {
                
                    graphData.push({"analysisRemark": "OK", "val": value})
                }
                
            }
            
            return{data:graphData}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const analysisGraph = createSlice({
	name: 'getAnalysisRemark',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getAnalysisRemark.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getAnalysisRemark.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getAnalysisRemark.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default analysisGraph.reducer;