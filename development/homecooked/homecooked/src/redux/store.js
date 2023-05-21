import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import restaurantReducer from "./restaurantSlice";
export default configureStore({
  reducer: {
    userState: userReducer,
    cartState: cartReducer,
    restaurantState: restaurantReducer,
  },
});
