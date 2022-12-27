import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {getBoardName} from "../../utils/getBoard";

export const getInputData= createAsyncThunk('input/inputData', 
	async (payload, {getState}) => {
        let code = getBoardName()
        let output = payload.structureCode.split(',')
        let final = output.join("\",\"") 
        let arOutput = payload.areaCode.split(',')
        let arFinal = arOutput.join("\",\"") 

        return await axios.get(`https://mr.bharatsmr.com/${code}/fetch/inputdata?eroCode=${payload.eroCode}&structureCode=${payload.structureCode.length > 0 ? `["${final}"]` : ''}&areaCode=${payload.areaCode.length > 0 ? `["${arFinal}"]` : ''}&page=${payload.page}&limitRecords=2000`, {
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
            console.log(JSON.stringify(err))
            return{data:[]}
        })
	}
)

export const inputDataSlice = createSlice({
	name: 'getBillStatus',
	initialState: {
        loading: true,
        error: false,
        data: [],
    },
	extraReducers: {
		[getInputData.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getInputData.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
		},
		[getInputData.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
        
	}
	
});

export default inputDataSlice.reducer;