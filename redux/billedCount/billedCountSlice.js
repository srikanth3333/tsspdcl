import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getBilledCount = createAsyncThunk('billed/getConsumerArrears', 
	async (payload, {getState}) => {
        let code = getBoardName()
        return await axios.get(`https://mr.bharatsmr.com/${code}/billedcount?eroCode=${payload.eroCode}&billDate=${payload.billDate}&mrMobileNo=${payload.mrMobileNo}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log('resp...')
            console.log(res)
            return{data:res.data.billCounts,meterReaderData:res.data.meterReaderData}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const billedCountSlice = createSlice({
	name: 'getBilledCount',
	initialState: {
        loading: true,
        error: false,
        data: [],
        meterReaderData:[],
    },
	extraReducers: {
		[getBilledCount.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getBilledCount.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.meterReaderData = action.payload.meterReaderData
		},
		[getBilledCount.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default billedCountSlice.reducer;