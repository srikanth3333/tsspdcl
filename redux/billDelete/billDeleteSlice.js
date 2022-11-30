import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const billDelete = createAsyncThunk('bill/billDelete', 
	async (payload, {getState}) => {
        return await axios.get(`https://mr.bharatsmr.com/TSSPDCL/delete/bill?uscNo=${payload.uscNo}&serviceNo=${payload.serviceNo}&meterNo=${payload.meterNo}`, {
            headers: {
                authkey:'9391962924',
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
	name: 'billDelete',
	initialState: {
        loading: true,
        error: false,
        data: '',
    },
	extraReducers: {
		[billDelete.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[billDelete.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[billDelete.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default billStatusSlice.reducer;