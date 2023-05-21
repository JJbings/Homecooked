import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartScreen from "./src/screens/StartScreen";
//import { Provider as AuthProvider } from "./src/context/AuthContext";

const Stack = createStackNavigator();

const App = () => {
	const { token, pending } = useSelector((state) => state?.userState);
	console.log("state token: ", token);
	const [storageToken, setStorageToken] = useState("");
	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("token");

			if (value !== null) {
				setStorageToken(value);
			}
		} catch (e) {}
	};
	const removeValue = async () => {
		try {
			await AsyncStorage.removeItem("token");
		} catch (e) {}

		console.log("Done.");
	};
	useEffect(() => {
		//getData();
		//removeValue();
		return () => {};
	}, []);

	const isSignedIn = token ? true : false;
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{ cardStyle: { backgroundColor: "white" } }}>
					{isSignedIn ? (
						<>
							<Stack.Screen
								options={{ presentation: "card", headerShown: false }}
								name='Home'
								component={HomeScreen}
							/>
						</>
					) : (
						<>
							<Stack.Screen
								options={{ headerShown: false }}
								headerShown={false}
								name='Start'
								component={StartScreen}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name='Signin'
								component={SigninScreen}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								headerShown={false}
								name='Signup'
								component={SignupScreen}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};
