import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { List, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = () => {
	const description = "Menu choice description here";
	const price = "$12,50";
	const subMenuTitle = "Submenu title here";
	return (
		<ScrollView style={{ backgroundColor: "white" }}>
			<List.Item
				style={{
					// display: "flex",
					// flexDirection: "row",
					// justifyContent: "space-between",
					backgroundColor: "white",
				}}
				title={() => {
					return (
						<>
							<Text>Title here </Text>
						</>
					);
				}}
				left={() => {
					return <Text style={{ margin: 20 }}>1</Text>;
				}}
				// left={(props) => (
				// 	<Text
				// 		style={{
				// 			alignSelf: "center",
				// 			color: "purple",
				// 			fontWeight: "700",
				// 		}}>
				// 		Price: $23,-
				// 	</Text>
				// )}
				description={() => (
					<View>
						<Text>{description}</Text>
					</View>
				)}
				right={(props) => (
					<TouchableOpacity>
						<Text
							style={{
								color: "purple",
								fontWeight: "500",
								marginLeft: 10,
							}}>
							{price}
						</Text>
						<View
							style={{
								alignSelf: "center",
								marginLeft: 5,
								display: "flex",
								flexDirection: "row",
								marginTop: 10,
							}}>
							<Ionicons name='remove-circle' size={34} color='purple' />
							<Ionicons name='add-circle' size={34} color='purple' />
						</View>
					</TouchableOpacity>
				)}
			/>
			<Divider></Divider>

			<List.Item
				title='Total:'
				right={() => {
					return (
						<Text
							style={{
								color: "purple",
								fontWeight: "800",
								marginRight: 10,
							}}
							variant='labelLarge'>
							{" "}
							$400
						</Text>
					);
				}}></List.Item>
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default CartScreen;
