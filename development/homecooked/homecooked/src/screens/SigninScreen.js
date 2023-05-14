import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
import { signInUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../redux/userSlice";
import { Button, TextInput } from "react-native-paper";

const SigninScreen = ({ navigation }) => {
	const { error, pending, user } = useSelector((state) => state.userState);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const signin = () => {
		signInUser({ email, password }, dispatch);
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
						}}>
						Sign in
					</Button>
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
