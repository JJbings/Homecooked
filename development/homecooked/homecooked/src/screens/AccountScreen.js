import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from "react-native";

import Spacer from "../components/Spacer";
import { logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, List, Text } from "react-native-paper";
import { Input } from "react-native-elements";
import { updateUserInfo } from "../redux/apiCalls";

const AccountScreen = ({ navigation }) => {
	const { error, pending, user, token } = useSelector(
		(state) => state.userState
	);

	const dispatch = useDispatch();
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const removeToken = async () => {
		try {
			await AsyncStorage.removeItem("token");
		} catch (e) {
			// remove error
		}
	};
	useEffect(() => {
		if (user) {
			if (!userName || userName === "") {
				setEmail(user.email);
				setUserName(user.username);
				setFirstName(user.firstname);
				setLastName(user.lastname);
			}
		}
		return () => {};
	}, [user]);

	const resetUser = () => {
		console.log(user);
		setEmail(user.email);
		setUserName(user.username);
		setFirstName(user.firstname);
		setLastName(user.lastname);
	};
	return (
		<SafeAreaView forceInset={{ top: "always" }}>
			<View style={{ backgroundColor: "white", height: "100%" }}>
				<ScrollView style={{ flex: 1 }}>
					<Avatar.Image
						style={{ alignSelf: "center", marginTop: 20 }}
						size={200}
						source={{
							uri: "https://source.unsplash.com/random/?person",
						}}></Avatar.Image>

					<Spacer margin={30} mb={10}>
						<View style={{ width: 300, marginLeft: 30 }}>
							<Text variant='bodySmall'> Username:</Text>
							<Input value={userName} onChangeText={setUserName}></Input>
						</View>
						<View style={{ width: 300, marginLeft: 30 }}>
							<Text variant='bodySmall'> Email:</Text>
							<Input value={email} onChangeText={setEmail}></Input>
						</View>
						<View style={{ width: 300, marginLeft: 30 }}>
							<Text variant='bodySmall'> Firstname:</Text>
							<Input value={firstName} onChangeText={setFirstName}></Input>
						</View>
						<View style={{ width: 300, marginLeft: 30 }}>
							<Text variant='bodySmall'> Lastname:</Text>
							<Input value={lastName} onChangeText={setLastName}></Input>
						</View>

						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-around",
								marginHorizontal: 70,
							}}></View>
					</Spacer>
				</ScrollView>
				<View style={{ marginBottom: 15, marginLeft: 80, marginRight: 80 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-around",
							marginBottom: 10,
						}}>
						<Button
							style={styles.LogoutButton}
							mode='outlined'
							onPress={() => {
								resetUser();
							}}>
							Reset
						</Button>
						<Button
							style={styles.LogoutButton}
							mode='outlined'
							onPress={() => {
								updateUserInfo(
									{
										username: userName,
										email,
										firstname: firstName,
										lastname: lastName,
										phone,
									},
									token,
									dispatch
								);
							}}>
							Save
						</Button>
					</View>

					<Button
						style={styles.LogoutButton}
						mode='contained'
						onPress={() => {
							dispatch(logout());
							removeToken();
							//navigation.popToTop();
						}}>
						Sign out
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	LogoutButton: { color: "blue" },
});

export default AccountScreen;
