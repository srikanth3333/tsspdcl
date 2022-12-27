import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getTsnBilled = createAsyncThunk('tsn/tsnBilledSlice', 
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
        return await axios.get(`https://mr.bharatsmr.com/dashboard/tsnpdclbilled?eroList=${payload.eroList.length > 0 ? `["${final}"]` : ''}&sectionList=${payload.sectionList.length > 0 ? `["${secOutput}"]` : ''}&prsStatusList=${payload.prsStatus.length > 0 ? `["${prsOutput}"]` : ''}&prvStatusList=${payload.prvStatus.length > 0 ? `["${prvOutput}"]` : ''}&mobileNo=${payload.mobileNo}&groupByKey=${payload.groupBy}`, {
            headers: {
                authkey:localStorage.getItem('mobileNo'),
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log('resp....')
            console.log(res)
            return{data:res.data}
        })
        .catch(err => {
            console.log(JSON.stringify(err))
            return{data:[]}
        })
	}
)

export const tsnBilledSlice = createSlice({
	name: 'tsnBilledSlice',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getTsnBilled.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getTsnBilled.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getTsnBilled.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default tsnBilledSlice.reducer;