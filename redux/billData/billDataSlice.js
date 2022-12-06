import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getBillData = createAsyncThunk('bill/data', 
	async (payload, {getState}) => {
        let code = getBoardName()   
        return await axios.get(`https://mr.bharatsmr.com/${code}/bill/data?uscNo=${payload.uscNo}&serviceNo=${payload.serviceNo}`, {
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

export const billDataSlice = createSlice({
	name: 'getBillData',
	initialState: {
        loading: true,
        error: false,
        data: null,
    },
	extraReducers: {
		[getBillData.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getBillData.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getBillData.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default billDataSlice.reducer;