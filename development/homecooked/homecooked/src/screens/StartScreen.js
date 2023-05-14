import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { Text } from "react-native-elements";
import { setToken } from "../redux/userSlice";
const StartScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const getToken = async () => {
		try {
			//const value = await AsyncStorage.getItem("token");
			const value = null;
			if (value !== null) {
				dispatch(setToken(value));
			}
			if (value === null) {
				navigation.navigate("Signin");
			}
		} catch (e) {}
	};

	const removeToken = async () => {
		try {
			await AsyncStorage.removeItem("token");
		} catch (e) {
			// remove error
		}
	};
	useEffect(() => {
		getToken();

		removeToken();
		return () => {};
	}, []);

	return (
		<View>
			<Text>Start</Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default StartScreen;
