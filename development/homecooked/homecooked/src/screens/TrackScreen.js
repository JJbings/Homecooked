import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TrackListScreen from "./TrackListScreen";
import TrackDetailScreen from "./TrackDetailScreen";

const Stack = createStackNavigator();

const TrackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TrackList" component={TrackListScreen} />
      <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TrackScreen;
