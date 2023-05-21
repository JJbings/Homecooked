import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "userState",
	initialState: {
		user: {
			email: "",
			username: "",
			firstname: "",
			lastname: "",
			address: {
				street: "",
				city: "",
				postalcode: "",
				country: "",
			},

			order: [],
		},
		token: "",
		hasBiometrics: true,
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
			console.log("signin success");
			state.pending = false;
			state.token = action.payload.token;
		},
		signInError: (state, action) => {
			state.pending = false;
			state.error = action.payload;
		},
		clearError: (state) => {
			state.error = "";
		},
		setToken: (state, action) => {
			state.token = action.payload;
			console.log("token set to state");
		},
		setUser: (state, action) => {
			state.user.email = action.payload.email;
			state.user.username = action.payload.username;
			state.user.firstname = action.payload.firstname;
			state.user.lastname = action.payload.lastname;
			state.user.address = action.payload.address;
		},
		logout: (state) => {
			state.user = {};
			state.token = "";
			console.log("removed token from state", state.token);
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
	setUser,
} = userSlice.actions;
export default userSlice.reducer;
