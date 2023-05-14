import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantListScreen from "./RestaurantListScreen";
import RestauarantDetailScreen from "./RestaurantDetailScreen";

const Stack = createStackNavigator();

const RestaurantScreen = () => {
	return (
		<Stack.Navigator
			screenOptions={{ cardStyle: { backgroundColor: "white" } }}>
			<Stack.Screen name='Restaurant' component={RestaurantListScreen} />
			<Stack.Screen
				name='Restaurant Details'
				component={RestauarantDetailScreen}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({});

export default RestaurantScreen;
