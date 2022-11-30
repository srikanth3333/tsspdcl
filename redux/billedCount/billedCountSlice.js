import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBilledCount = createAsyncThunk('billed/getConsumerArrears', 
	async (payload, {getState}) => {
        return await axios.get(`https://mr.bharatsmr.com/TSSPDCL/billedcount?eroCode=${payload.eroCode}&billDate=${payload.billDate}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log('res');
            console.log(res);
            return{data:res.data}
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
		},
		[getBilledCount.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default billedCountSlice.reducer;