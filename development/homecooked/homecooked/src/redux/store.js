import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
export default configureStore({
	reducer: {
		userState: userReducer,
		cartState: cartReducer,
	},
});
