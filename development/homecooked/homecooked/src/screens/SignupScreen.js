import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
//import { Context as AuthContext } from "../context/AuthContext.js";
import { useSelector, useDispatch } from "react-redux";
import { clearError, update } from "../redux/userSlice";
import { signUpUser } from "../redux/apiCalls";
import { Button } from "react-native-paper";

const SignupScreen = ({ navigation }) => {
	//const userState = useSelector((state) => state.userState);
	const { userInfo, pending, error } = useSelector((state) => state.userState);

	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userName, setUsername] = useState("");

	const signup = () => {
		//console.log(email, password);
		signUpUser({ userName, email, password }, dispatch);
	};

	return (
		<View style={styles.Container}>
			<Spacer margin={20}>
				<Spacer mb={40}>
					<Text h3>Sign Up</Text>
				</Spacer>
				<Spacer>
					<Input
						label='Username'
						value={userName}
						onChangeText={setUsername}
						autoCapitalize='none'
						autoCorrect={false}
					/>
					<Input
						label='Email'
						value={email}
						onChangeText={setEmail}
						autoCapitalize='none'
						autoCorrect={false}
					/>
					<Input
						secureTextEntry
						label='Password'
						value={password}
						onChangeText={setPassword}
						autoCapitalize='none'
						autoCorrect={false}
					/>
				</Spacer>
				<Spacer mb={40} margin={30}>
					<Button
						mode='contained'
						onPress={() => {
							signup();
						}}>
						Sign up
					</Button>
				</Spacer>
				<Spacer mb={10}>
					<TouchableOpacity
						onPress={() => {
							dispatch(clearError());
							navigation.navigate("Signin");
						}}>
						<Text style={styles.RegisterButton}>
							Already have an account? Sign in instead!
						</Text>
					</TouchableOpacity>
				</Spacer>
				<Spacer>
					{error && (
						<Text h5 style={styles.Error}>
							Cannot create account. Username or email already in use. Please
							try again.
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

export default SignupScreen;
