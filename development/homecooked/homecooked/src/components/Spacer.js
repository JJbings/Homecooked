import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Spacer = ({ children, margin, mb }) => {
	const marginSpacer = margin || 30;
	const marginBottom = mb || 0;
	return (
		<View style={{ margin: margin, marginBottom: marginBottom }}>
			{children}
		</View>
	);
};

export default Spacer;
