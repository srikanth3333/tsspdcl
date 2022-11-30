import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAgencyCounts = createAsyncThunk('agency/getAgencyCounts', 
	async (payload, {getState}) => {
		let {users,division} = getState();
		return await axios.get(`https://mr.bharatsmr.com/dashboard/agency?startDate=${payload.startDate}&endDate=${payload.endDate}`)
        .then(res => {
			
            try{
                if(users?.mainRole == 'SAD' || true) {
					let totalWD = 0;
					let totalWOD = 0;
					let totalconsumerCount = 0;
					let totalOK = 0;
					let totalMD = 0;
					let totalLK = 0;
					let totalMridCount = 0;
					res.data.map((item) => {
						totalWD += parseInt(item.WD)
						totalWOD += parseInt(item.WOD)
						totalconsumerCount += parseInt(item.consumerCount)
						totalOK += parseInt(item.OK)
						totalMD += parseInt(item.MD)
						totalLK += parseInt(item.LK)
						totalMridCount += parseInt(item.mridCount)
					})
                    return {data:res.data,countsData:{
							totalWD,totalWOD,totalconsumerCount,
							totalOK,totalMD,totalLK,totalMridCount
					}}
                }else {
                    let filteredData = users.logData?.agencyArray
                    let finalData = res.data.filter((item) => filteredData.includes(item.id))
					let totalWD = 0;
					let totalWOD = 0;
					let totalconsumerCount = 0;
					let totalOK = 0;
					let totalMD = 0;
					let totalLK = 0;
					let totalMridCount = 0;
					finalData.map((item) => {
						totalWD += parseInt(item.WD)
						totalWOD += parseInt(item.WOD)
						totalconsumerCount += parseInt(item.consumerCount)
						totalOK += parseInt(item.OK)
						totalMD += parseInt(item.MD)
						totalLK += parseInt(item.LK)
						totalMridCount += parseInt(item.MridCount)
					})
                    return {data:finalData,countsData:{
							totalWD,totalWOD,totalconsumerCount,
							totalOK,totalMD,totalLK,totalMridCount
					}}
                }
                
            }catch(e){ 
                return {data:[],count:0,total:0}
            }
        })
	}
)

export const agencySlice = createSlice({
	name: 'agency',
	initialState: {
		data: [],
		loading: true,
		error:false,
		countsData:null,
	},
	extraReducers: {
		[getAgencyCounts.pending]: (state) => {
			state.loading = true
            state.error = false
		},
		[getAgencyCounts.fulfilled]: (state, action) => {
			state.loading = false
            state.error = false
            state.data = action.payload.data
            state.countsData = action.payload.countsData
		},
		[getAgencyCounts.rejected]: (state) => {
            state.loading = false
            state.error = "Unable to fetch data please try again later"
		},
	}
	
});

export default agencySlice.reducer;