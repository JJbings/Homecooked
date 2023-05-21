import { createSlice } from "@reduxjs/toolkit";

export const restuarantSlice = createSlice({
  name: "restaurantState",
  initialState: {
    restaurants: [],
    pending: false,
    error: "",
  },
  reducers: {
    setRestaurants: (state, action) => {
      console.log("SETTING RES");
      state.restaurants = action.payload;
    },
    setUser: (state, action) => {
      console.log("SETTING USER INFO");
      console.log("PAYLOAD ", action.payload);
      state.user.email = action.payload.email;
      state.user.username = action.payload.username;
      console.log("NEW USER", state.user);
    },
    logout: (state) => {
      state.user = {};
      state.token = "";
    },
    fetchRestaurantStart: (state) => {
      state.pending = true;
      console.log("DISPATCH fetch restaurant Start");
    },
    fetchRestaurantSuccess: (state) => {
      state.pending = false;
      console.log("DISPATCH fetch restaurant Success");
    },
  },
});

export const { setRestaurants, fetchRestaurantSuccess, fetchRestaurantStart } =
  restuarantSlice.actions;
export default restuarantSlice.reducer;
