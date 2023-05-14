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

const AccountScreen = ({ navigation }) => {
	const { error, pending, user } = useSelector((state) => state.userState);
	console.log(user);
	const dispatch = useDispatch();
	const [name, setName] = useState("John");
	const removeToken = async () => {
		try {
			await AsyncStorage.removeItem("token");
		} catch (e) {
			// remove error
		}
	};
	useEffect(() => {
		console.log(user);
		return () => {};
	}, [user]);

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
							<Text variant='bodySmall'> Name:</Text>
							<Input value={name} onChangeText={setName}></Input>
						</View>
						<View style={{ width: 300, marginLeft: 30 }}>
							<Text variant='bodySmall'> Username:</Text>
							<Input value='John123'></Input>
						</View>
						<View style={{ width: 300, marginLeft: 30 }}>
							<Text variant='bodySmall'> Email:</Text>
							<Input value='John@admin.nl'></Input>
						</View>
						<View style={{ width: 300, marginLeft: 30 }}>
							<Text variant='bodySmall'> Phone:</Text>
							<Input value='John'></Input>
						</View>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-around",
								marginHorizontal: 70,
							}}>
							<Button
								style={styles.LogoutButton}
								mode='contained'
								onPress={() => {
									dispatch(logout());
									removeToken();
									//navigation.popToTop();
								}}>
								Reset
							</Button>
							<Button
								style={styles.LogoutButton}
								mode='contained'
								onPress={() => {
									dispatch(logout());
									removeToken();
									//navigation.popToTop();
								}}>
								Save
							</Button>
						</View>
					</Spacer>
				</ScrollView>
				<View style={{ marginBottom: 15, marginLeft: 80, marginRight: 80 }}>
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
