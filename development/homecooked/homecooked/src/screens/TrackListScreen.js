import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const TrackListScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Track Detail"
        onPress={() =>
          navigation.navigate("TrackDetail", {
            screen: "TrackDetail",
            initial: false,
          })
        }
      />
      <Text>TrackListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({ root: { backgroundColor: "white" } });

export default TrackListScreen;
