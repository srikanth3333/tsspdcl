import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getAnalysisRemark = createAsyncThunk('remark/getAnalysisRemark', 
	async (payload, {getState}) => {
        let code = getBoardName()
        return await axios.get(`https://mr.bharatsmr.com/dashboard/userAnalysisRemarks`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            let graphData = [];
            for (const [key, value] of Object.entries(res.data?.[0])) {
                graphData.push({"analysisRemark": key, "val": value})
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