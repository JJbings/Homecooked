import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native-elements";
import { logout, setToken } from "../redux/userSlice";
import * as LocalAuthentication from "expo-local-authentication";

const StartScreen = ({ navigation }) => {
	const { hasBiometrics, token } = useSelector((state) => state.userState);
	const dispatch = useDispatch();
	const getTokenFromStorage = async () => {
		try {
			const value = await AsyncStorage.getItem("token");

			if (value !== null) {
				console.log("found token ");
				if (hasBiometrics) {
					checkBiometricAvailability();
				}
				if (!hasBiometrics) {
					dispatch(setToken(value));
				}
			}
			if (value === null) {
				navigation.navigate("Signin");
			}
		} catch (e) {}
	};
	const removeToken = async () => {
		try {
			await AsyncStorage.removeItem("token");
		} catch (e) {}
	};
	const checkBiometricAvailability = async () => {
		console.log("checking bio");
		try {
			const hasHardware = await LocalAuthentication.hasHardwareAsync();
			const hasEnrolledBiometrics = await LocalAuthentication.isEnrolledAsync();

			if (hasHardware && hasEnrolledBiometrics) {
				// Biometric authentication is available
				authenticateWithBiometrics();
			} else {
				// Biometric authentication is not available or no enrolled biometrics
				console.log("No biometrics available");
				dispatch(logout());
				navigation.navigate("Signin");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const authenticateWithBiometrics = async () => {
		console.log("authenticating wirth biometrics");
		try {
			const token = await AsyncStorage.getItem("token");
			console.log(token);
			const { success, error } = await LocalAuthentication.authenticateAsync();

			if (success) {
				// Authentication successful
				console.log("authentication success");
				try {
					dispatch(setToken(token));
				} catch (error) {
					console.log(error);
				}
			} else {
				// Authentication failed or was canceled
				console.log("Authentication error:", error);
				removeToken();
				dispatch(logout());
				navigation.navigate("Signin");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTokenFromStorage();

		return () => {};
	}, []);

	return (
		<View>
			<Text></Text>
		</View>
	);
};

const styles = StyleSheet.create({});

export default StartScreen;
