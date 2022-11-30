import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBillStatus = createAsyncThunk('bil/getBillStat', 
	async (payload, {getState}) => {
        return await axios.get(`https://mr.bharatsmr.com/TSSPDCL/billstatus?uscNo=${payload.uscNo}&serviceNo=${payload.serviceNo}&meterNo=${payload.meterNo}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res)
            return{data:res.data}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const billStatusSlice = createSlice({
	name: 'getBillStatus',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getBillStatus.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getBillStatus.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getBillStatus.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default billStatusSlice.reducer;