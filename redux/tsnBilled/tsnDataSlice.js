import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getTsnBilledData = createAsyncThunk('data/tsnBilledSliceData', 
	async (payload, {getState}) => {
        let code = getBoardName()
        let output = payload.eroList.split(',')
        let final = output.join("\",\"") 
        let secList = payload.sectionList.split(',')
        let secOutput = secList.join("\",\"") 
        let prsList = payload.prsStatus.split(',')
        let prsOutput = prsList.join("\",\"") 
        let prvList = payload.prvStatus.split(',')
        let prvOutput = prvList.join("\",\"") 
        return await axios.get(`https://mr.bharatsmr.com/dashboard/tsnpdclbilled/data?eroList=${payload.eroList.length > 0 ? `["${final}"]` : ''}&sectionList=${payload.sectionList.length > 0 ? `["${secOutput}"]` : ''}&prsStatusList=${payload.prsStatus.length > 0 ? `["${prsOutput}"]` : ''}&prvStatusList=${payload.prvStatus.length > 0 ? `["${prvOutput}"]` : ''}&mobileNo=${payload.mobileNo}&limitRecords=5000`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log('respp....')
            console.log(res)
            return{data:res.data}
        })
        .catch(err => {
            console.log(JSON.stringify(err))
            return{data:[]}
        })
	}
)

export const tsnBilledDataSlice = createSlice({
	name: 'tsnBilledDataSlice',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getTsnBilledData.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getTsnBilledData.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getTsnBilledData.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default tsnBilledDataSlice.reducer;