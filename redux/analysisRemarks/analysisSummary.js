import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getAnalysisSummary = createAsyncThunk('remark/getAnalysisSummary', 
	async (payload, {getState}) => {
        let code = getBoardName()
        return await axios.get(`https://mr.bharatsmr.com/dashboard/readingsummary?mobileNo=${payload.mobileNo}&boardCode=${code}&page=${payload.page}
                                &startDate=${payload.startDate}&endDate=${payload.endDate}
                                &exception=${payload.exception}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log('resp...')
            console.log(res)
            return{data:res.data.mSummaryData}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const analysisSummary = createSlice({
	name: 'getAnalysisSummary',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getAnalysisSummary.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getAnalysisSummary.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getAnalysisSummary.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default analysisSummary.reducer;