import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const addUser = createAsyncThunk('user/addUser', 
	async (payload, {dispatch}) => {
		const data = 
        {
            "mobileNo" : payload.mobileNo,
            "chatMobileNo": payload.chatNo,
            "name": payload.name,
            "subDiv" : payload.subDiv,
            "role" : payload.role,
            "agencyName" : payload.agencyName,
            "boardName" : payload.boardName,
        }
		axios.post(`https://mr.bharatsmr.com/dashboard/addUser?mobileNo=${mobileNo}`, data)
		.then(res => {
			if(res.data.message == "true") {
                return {success: true}
            }else {
                return {success: false}
            }
		})
		
	}
)

export const getUser = createAsyncThunk('user/getUser', 
	async (payload, {dispatch}) => {
		return await axios.get(`https://mr.bharatsmr.com/dashboard/usersList?mobileNo=${payload.mobileNo}`)
		.then(res => {
			let [user] = res.data
			if(!user) {
				alert("Not a registered User")
				return {data:null}
			}
			dispatch(sendOtp({mobileNo: payload.mobileNo}))
			return {data:user}
		})
		
	}
)


export const sendOtp = createAsyncThunk('user/sendOtp', 
	async (payload) => {
		return await axios.get(`https://mr.bharatsmr.com/sendOtp?mobileNo=${payload.mobileNo}`)
		.then(res => {
			
		})
		
	}
)

export const logout = createAsyncThunk('user/logout', 
	async () => {
		return {logStatus: false}
	}
)


export const tokenLogin = createAsyncThunk('user/new', 
	async (payload,{dispatch}) => {
		let mobileNo = localStorage.getItem("mobileNo")
		return await axios.get(`https://mr.bharatsmr.com/dashboard/usersList?mobileNo=${mobileNo}`)
		.then(res => {
			console.log(res)
			let [user] = res.data
			if(!user) {
				return {logStatus: false};
			}
			return {logData:user,logStatus:true,boardCode:user.boardName,agencyAll:user.agency,agency:user.agencyName,role:user.role,mainRole:user.role,boardData: user && user.boardData ? user.boardData : null}
		})	
	}
)


export const updateData = createAsyncThunk('user/updateData', 
	async (payload) => {
		return {boardCode: payload.boardCode,agency: payload.agency,role: payload.role}
	}
)

export const getDivisionNames = createAsyncThunk('data/divisionNames', 
	async () => {
		return await axios.get(`https://bestat.s3.ap-south-1.amazonaws.com/web/portal/divisionNames.json`)
		.then(res => {
			return {divisionNames:res.data}
		})
	}
)

export const getSubDivisionNames = createAsyncThunk('data/subDivisionNames', 
	async () => {
		return await axios.get(`https://bestat.s3.ap-south-1.amazonaws.com/web/portal/subDivNames.json`)
		.then(res => {
			return {subDivisionNames:res.data}
		})
	}
)

export const getSectionNames = createAsyncThunk('data/sectioNames', 
	async () => {
		return await axios.get(`https://bestat.s3.ap-south-1.amazonaws.com/web/portal/sectionNames.json`)
		.then(res => {
			return {sectionNames:res.data}
		})
	}
)



export const verifyOtp = createAsyncThunk('user/verifyOtp', 
	async (payload,{getState}) => {
		let {users} = getState();
		return await axios.get(`https://mr.bharatsmr.com/verifyOtp?mobileNo=${payload.mobileNo}&otp=${payload.otp}`)
		.then(res => {
			if(res.data.message == "Success") {
				let token = localStorage.setItem("token", res.data.token)
				let mobileNo = localStorage.setItem("mobileNo", users.dataUser.mobileNo)
				return {logStatus:true,token:token,mobileNo:mobileNo,otpView:false,loggedIn:true,boardCode:users.dataUser.boardName,
						agency:users.dataUser.agencyName,role:users.dataUser.role,mainRole:users.dataUser.role,boardData: users.dataUser && users.dataUser.boardData ? users.dataUser.boardData : null}
			}else {
				alert("Wrong OTP")
				return {logStatus:false,token:token,mobileNo:mobileNo,otpView:true}
			}
		})
		
	}
)

export const userSlice = createSlice({
	name: 'users',
	initialState: {
		loading: true,
		error:'',
		dataUser: [],
		loggedIn:false,
		token:'',
		otpView: false,
		token: null,
		mobileNo: '',
		logData: '',
		boardCode:'',
		agency:'',
		role:null,
		mainRole:null,
		boardData:null,
		divisionNames:[],
		subDivisionNames:[],
		sectionNames:[],
		agencyAll:'',
		filterObject:null,
	},
	reducers: {
		addFilters: (state,action) => {
			state.filterObject = action.payload.data
		},
	},
	extraReducers: {
		[getUser.pending]: (state) => {
			state.loading = true
		},
		[getUser.fulfilled]: (state, action) => {
			state.loading = false
			state.dataUser = action.payload.data
		},
		[sendOtp.fulfilled]: (state, action) => {
			state.otpView = true
		},
		[tokenLogin.pending]: (state, action) => {
			state.loading = true
		},
		[tokenLogin.fulfilled]: (state, action) => {
			state.loading = false
			state.loggedIn = action.payload.logStatus
			state.logData = action.payload.logData
			state.boardCode = action.payload.boardCode
			state.agency = action.payload.agency
			state.agencyAll = action.payload.agencyAll
			state.role = action.payload.role 
			state.mainRole = action.payload.mainRole
			state.boardData = action.payload.boardData
 		},
		[verifyOtp.fulfilled]: (state, action) => {
			state.otpView = action.payload.otpView
			state.token = action.payload.token
			state.loggedIn = action.payload.logStatus
			state.mobileNo = action.payload.mobileNo
			state.boardCode = action.payload.boardCode
			state.agency = action.payload.agency
			state.role = action.payload.role
			state.mainRole = action.payload.mainRole
			state.boardData = action.payload.boardData
		},
		[getDivisionNames.fulfilled]: (state, action) => {
			state.divisionNames = action.payload.divisionNames
		},
		[getSubDivisionNames.fulfilled]: (state, action) => {
			state.subDivisionNames = action.payload.subDivisionNames
		},
		[getSectionNames.fulfilled]: (state, action) => {
			state.sectionNames = action.payload.sectionNames
		},
		[logout.fulfilled]: (state, action) => {
			state.loggedIn = action.payload.logStatus
		},
		[updateData.fulfilled]: (state, action) => {
			state.boardCode = action.payload.boardCode;
			state.agency = action.payload.agency;
			state.role = action.payload.role;
		},
		[getUser.rejected]: (state) => {
			state.loading = false
			state.error = 'Error'
		},
	}
	
});


export const { addFilters } = userSlice.actions;

export default userSlice.reducer;