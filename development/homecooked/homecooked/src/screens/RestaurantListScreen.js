import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
//import restaurants from "../data/restaurants.json";
import Spacer from "../components/Spacer";
import { Card, Chip, Searchbar } from "react-native-paper";
import Star from "../components/Star";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchRestaurants } from "../redux/apiCalls";
import { useFocusEffect } from "@react-navigation/native";
import { emptyCart } from "../redux/cartSlice";

const RestaurantListScreen = ({ navigation }) => {
  //const [restaurantList, setRestaurantList] = useState(restaurants);
  const dispatch = useDispatch();
  const { error, pending, restaurants } = useSelector(
    (state) => state.restaurantState
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(emptyCart());

      return () => {};
    }, [])
  );
  // const restaurants = [];

  const [filteredList, setFilteredList] = useState(restaurants);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setFilteredList(() => {
        return restaurants.filter((restaurant) => {
          return restaurant.name.toLowerCase().includes(query.toLowerCase());
        });
      });
    } else {
      setFilteredList(restaurants);
    }
  };
  const handlePress = () => {
    navigation.navigate("Restaurant Details");
  };

  useEffect(() => {
    if (restaurants?.length === 0 && !pending) {
      fetchRestaurants(dispatch);
    }
    if (restaurants?.length > 1) {
      setFilteredList(restaurants);
    }
    return () => {};
  }, [restaurants]);

  return (
    <View style={styles.root}>
      <Spacer margin={10}>
        <Searchbar
          placeholder="Search for restaurants"
          elevation={0}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{}}
        ></Searchbar>
        {filteredList ? (
          <FlatList
            style={styles.list}
            data={filteredList}
            renderItem={(restaurant) => {
              return (
                <Spacer margin={10}>
                  <Card
                    style={{ backgroundColor: "#fcfcfc" }}
                    onPress={() => handlePress()}
                  >
                    <Card.Cover
                      style={{
                        height: 150,
                        borderRadius: 0,
                        overflow: "hidden",
                      }}
                      source={{
                        uri: "https://source.unsplash.com/random/300x300/?food",
                      }}
                    />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card.Title
                        style={{ flex: 1, alignSelf: "center" }}
                        title={restaurant.item.name}
                        titleVariant="titleMedium"
                        titleStyle={{ fontWeight: "bold", color: "black" }}
                      />
                      <Chip
                        style={{ alignSelf: "center", marginRight: 5 }}
                        type="flat"
                        icon="star"
                      >
                        4.4 {`(23)`}
                      </Chip>
                    </View>

                    <Card.Content style={{}}>
                      <Text style={{ marginBottom: 10 }}>
                        {restaurant.item.description}
                      </Text>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Entypo name="location-pin" size={15} color="black" />
                        <Text> Adress: Streetname, 6 </Text>
                      </View>
                    </Card.Content>
                  </Card>
                  <Spacer></Spacer>
                </Spacer>
              );
            }}
          />
        ) : null}
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { backgroundColor: "white" },
  list: { backgroundColor: "white", height: "100%" },
  card: { backgroundColor: "white", display: "flex", flexDirection: "column" },
});

export default RestaurantListScreen;
