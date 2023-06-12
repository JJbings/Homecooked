import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
import { signInUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setToken } from "../redux/userSlice";
import { Button, TextInput } from "react-native-paper";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SigninScreen = ({ navigation }) => {
	const { error, pending, user, token } = useSelector(
		(state) => state.userState
	);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const signin = () => {
		signInUser({ email, password }, dispatch);
	};
	const removeToken = async () => {
		try {
			await AsyncStorage.removeItem("token");
		} catch (e) {}
	};
	const checkBiometricAvailability = async () => {
		//console.log("checking bio");
		try {
			const hasHardware = await LocalAuthentication.hasHardwareAsync();
			const hasEnrolledBiometrics = await LocalAuthentication.isEnrolledAsync();

			if (hasHardware && hasEnrolledBiometrics) {
				// Biometric authentication is available
				authenticateWithBiometrics();
			} else {
				// Biometric authentication is not available or no enrolled biometrics
				//console.log("No biometrics available");
				dispatch(logout());
				navigation.navigate("Signin");
			}
		} catch (error) {
			//console.log(error);
		}
	};

	const authenticateWithBiometrics = async () => {
		//console.log("authenticating wirth biometrics");
		try {
			const token = await AsyncStorage.getItem("token");
			//console.log(token);
			const { success, error } = await LocalAuthentication.authenticateAsync();

			if (success) {
				// Authentication successful
				//console.log("authentication success");
				try {
					dispatch(setToken(token));
				} catch (error) {
					//console.log(error);
				}
			} else {
				// Authentication failed or was canceled
				//console.log("Authentication error:", error);
				removeToken();
				dispatch(logout());
				navigation.navigate("Signin");
			}
		} catch (error) {
			//console.log(error);
		}
	};
	return (
		<View style={styles.Container}>
			<Spacer margin={20}>
				<Spacer mb={40}>
					<Text h3>Sign In</Text>
				</Spacer>
				<Spacer>
					<Input
						label='Email'
						value={email}
						autoCapitalize='none'
						autoCorrect={false}
						onChangeText={setEmail}
					/>
					<Input
						secureTextEntry
						value={password}
						autoCapitalize='none'
						autoCorrect={false}
						label='Password'
						onChangeText={setPassword}
					/>
				</Spacer>
				<Spacer mb={50} margin={30}>
					<Button
						mode='contained'
						onPress={() => {
							signin();
						}}
						style={{ marginBottom: 20 }}>
						Sign in
					</Button>
					{/* <Button
						mode='outlined'
						onPress={() => {
							checkBiometricAvailability();
						}}>
						Sign in using biometrics
					</Button> */}
				</Spacer>
				<Spacer mb={10}>
					<TouchableOpacity
						onPress={() => {
							dispatch(clearError());
							navigation.navigate("Signup");
						}}>
						<Text style={styles.RegisterButton}>
							Dont have an account yet? Register now!
						</Text>
					</TouchableOpacity>
				</Spacer>
				<Spacer mb={30}>
					{error && (
						<Text h5 style={styles.Error}>
							Username or password incorrect.
							{error}
						</Text>
					)}
				</Spacer>
			</Spacer>
		</View>
	);
};

const styles = StyleSheet.create({
	RegisterButton: { color: "blue" },
	Container: { flex: 1, justifyContent: "center", paddingBottom: 150 },
	Error: { color: "red", fontWeight: "bold" },
});

export default SigninScreen;
