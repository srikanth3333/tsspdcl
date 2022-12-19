import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getMeterReadings = createAsyncThunk('bil/getMeterReadings', 
	async (payload, {getState}) => {
        let code = getBoardName()
        return await axios.get(`https://mr.bharatsmr.com/${code}/MeterReading?search=${payload.uidNo}&filter=&isJson=true&boardCode=${code}&page=${payload.page}`)
        .then(res => {
            console.log('resp...')
            console.log(res)
            return{data:res.data.meterData}
        })
        .catch(err => {
            console.log(JSON.stringify(err))
            return{data:[]}
        })
	}
)

export const meterReadingsSlice = createSlice({
	name: 'getMeterReadings',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getMeterReadings.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getMeterReadings.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getMeterReadings.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default meterReadingsSlice.reducer;