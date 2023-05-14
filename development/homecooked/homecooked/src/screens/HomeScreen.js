import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TrackCreateScreen from "./TrackCreateScreen";
import AccountScreen from "./AccountScreen";
import TrackScreen from "./TrackScreen";
import RestaurantScreen from "./RestaurantScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import CartScreen from "./CartScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
	return (
		<Tab.Navigator
			initialRouteName='RestaurantList'
			screenOptions={{
				tabBarActiveTintColor: "#b220ba",
				tabBarInactiveTintColor: "#222",
				tabBarStyle: {
					backgroundColor: "#fff",
					backgroundColor: "white",
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "bold",
				},
				tabBarIconStyle: {
					marginBottom: -5,
				},
				cardStyle: { backgroundColor: "white" },
			}}>
			{/* <Tab.Screen
				name='TrackScreen'
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='settings-outline' color={color} size={size} />
					),
				}}
				component={TrackScreen}
				listeners={({ navigation, route }) => ({
					tabPress: (e) => {
						navigation.navigate(route.name);
					},
				})}
			/> */}
			<Tab.Screen
				name='Restaurants'
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						//<Ionicons name='settings-outline' color={color} size={size} />
						<MaterialIcons name='food-bank' size={24} color='orange' />
					),
				}}
				component={RestaurantScreen}
				listeners={({ navigation, route }) => ({
					tabPress: (e) => {
						console.log(route);
						navigation.navigate(route.name);
					},
				})}
			/>
			{/* <Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						//<Ionicons name='settings-outline' color={color} size={size} />
						<MaterialIcons name='food-bank' size={24} color='black' />
					),
				}}
				name='TrackCreate'
				component={TrackCreateScreen}
			/> */}
			<Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						//<Ionicons name='settings-outline' color={color} size={size} />
						<MaterialCommunityIcons name='account' size={24} color='orange' />
					),

					backgroundColor: "white",
					cardStyle: { backgroundColor: "white" },
				}}
				name='Account'
				component={AccountScreen}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ color, size }) => (
						//<Ionicons name='settings-outline' color={color} size={size} />
						<MaterialCommunityIcons name='cart' size={24} color='orange' />
					),

					backgroundColor: "white",
					cardStyle: { backgroundColor: "white" },
				}}
				name='Cart'
				component={CartScreen}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({ backgroundColor: "white" });

export default HomeScreen;
