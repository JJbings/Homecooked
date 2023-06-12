import {
	updateStart,
	updateSuccess,
	updateError,
	signInStart,
	signInSuccess,
	signInError,
	setToken,
	clearError,
	setUser,
} from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import tracker from "../api/tracker";
import {
	fetchRestaurantStart,
	fetchRestaurantSuccess,
	setRestaurants,
} from "./restaurantSlice";

export const signUpUser = async (userInfo, dispatch) => {
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
	dispatch(signInStart());
	console.log("starting sign in user");
	console.log(userInfo);
	try {
		const response = await tracker.post("/signin", {
			email: userInfo.email,
			password: userInfo.password,
		});
		console.log("response: ", response);
		const token = response?.data?.token;
		console.log("token: ", token);
		try {
			await AsyncStorage.setItem("token", token);
			// console.log("token set to LOCAL storage");
		} catch (e) {
			//console.log("could not save token");
		}

		dispatch(signInSuccess(response.data));
		dispatch(setToken(token));
		dispatch(clearError());
		getUserInfo(token, dispatch);
	} catch (error) {
		dispatch(signInError(error?.message));
		console.log("error: ", error?.message);
	}
};

export const getUserInfo = async (token, dispatch) => {
	try {
		const response = await tracker.get("/user", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		dispatch(setUser(response.data));
	} catch (error) {
		dispatch(signInError(error?.message));
	}
};
export const updateUserInfo = async (userInfo, token, dispatch) => {
	try {
		const response = await tracker.put("/user", userInfo, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		//console.log("UPDATING USER");

		dispatch(setUser(response.data));
	} catch (error) {
		dispatch(signInError(error?.message));
	}
};

export const fetchRestaurants = async (dispatch) => {
	dispatch(fetchRestaurantStart());
	try {
		const response = await tracker.get("/restaurants");

		dispatch(fetchRestaurantSuccess());
		dispatch(setRestaurants(response.data));
	} catch (error) {
		dispatch(signInError(error?.message));
	}
};
