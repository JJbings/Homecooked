import {
	updateStart,
	updateSuccess,
	updateError,
	signInStart,
	signInSuccess,
	signInError,
	setToken,
	clearError,
} from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import tracker from "../api/tracker";

export const signUpUser = async (userInfo, dispatch) => {
	console.log("SIGNING UP USER");

	dispatch(updateStart());
	try {
		const response = await tracker.post("/signup", {
			email: userInfo.email,
			password: userInfo.password,
			username: userInfo.userName,
		});

		dispatch(updateSuccess(response.data));
	} catch (error) {
		dispatch(updateError(error.message));
	}
};
export const signInUser = async (userInfo, dispatch) => {
	console.log("SIGNING IN USER");

	console.log(userInfo);
	dispatch(signInStart());
	try {
		const response = await tracker.post("/signin", {
			email: userInfo.email,
			password: userInfo.password,
		});

		const token = response?.data?.token;
		try {
			await AsyncStorage.setItem("token", token);
		} catch (e) {
			console.log("could not save token");
		}
		console.log("token", token);
		// const user = await tracker.get("/user", {
		// 	headers: {
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// });
		dispatch(signInSuccess(response.data));
		dispatch(setToken(token));
		dispatch(clearError());
	} catch (error) {
		dispatch(signInError(error?.message));
	}
};
