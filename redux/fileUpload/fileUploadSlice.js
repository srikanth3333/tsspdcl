import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadFile = createAsyncThunk('upload/uploadFile', 
	async (payload, {getState}) => {
        return await axios.get(`https://mr.bharatsmr.com/TSSPDCL/inputfiles/info?page=${payload.page}&eroCode=${payload.eroCode}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log('res')
            console.log(res)
            return{data:res.data}
        })
        .catch(err => {
            return{data:[]}
        })
	}
)

export const fileUploadSlice = createSlice({
	name: 'uploadFile',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[uploadFile.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[uploadFile.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[uploadFile.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default fileUploadSlice.reducer;