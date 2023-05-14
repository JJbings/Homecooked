import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Star = (rating) => {
	return (
		<View>
			<MaterialIcons name='star' size={24} color='#f2de2c' />
		</View>
	);
};

export default Star;
