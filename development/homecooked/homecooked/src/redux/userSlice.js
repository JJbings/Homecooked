import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "userState",
	initialState: {
		user: {
			email: "",
			password: "",
			token: "",
		},
		pending: false,
		error: "",
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		updateStart: (state) => {
			state.pending = true;
		},
		updateSuccess: (state, action) => {
			state.pending = false;
			state.user = action.payload;
		},
		updateError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		signInStart: (state) => {
			state.pending = true;
		},
		signInSuccess: (state, action) => {
			state.pending = false;
			state.user.token = action.payload.token;
			console.log(state);
		},
		signInError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		clearError: (state) => {
			state.error = "";
		},
		setToken: (state, action) => {
			state.user.token = action.payload;
		},
		logout: (state) => {
			state.user = {
				email: "",
				password: "",
				token: "",
			};
		},
	},
});

export const {
	login,
	updateStart,
	updateSuccess,
	updateError,
	signInStart,
	signInSuccess,
	signInError,
	clearError,
	setToken,
	logout,
} = userSlice.actions;
export default userSlice.reducer;
