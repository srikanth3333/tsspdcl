import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getAnalysisException= createAsyncThunk('remark/getAnalysisException', 
	async (payload, {getState}) => {
        let code = getBoardName()
        return await axios.get(`https://mr.bharatsmr.com/dashboard/userAnalysisRemarks/topUsers?exception=${payload.exception}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log('resp...')
            console.log(res)
            return{data:res.data}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const analysisException = createSlice({
	name: 'getAnalysisException',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getAnalysisException.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getAnalysisException.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getAnalysisException.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default analysisException.reducer;