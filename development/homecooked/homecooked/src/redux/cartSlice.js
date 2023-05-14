import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cartState",
	initialState: {
		cart: {
			items: [],
			total: 0,
		},
		pending: false,
		error: "",
	},
	reducers: {
		emptyCart: (state, action) => {
			state.user = action.payload;
		},
		addToCart: (state, action) => {
			if (state.cart.items.length === 0) {
				state.cart.items.push(action.payload);
				state.cart.total = action.payload.price;
				console.log("first item added to cart");
				return;
			}
			const index = state.cart.items.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index === -1) {
				console.log("new item added to cart");
				state.cart.items.push(action.payload);
				state.cart.total += action.payload.price;
			} else {
				console.log("found item in cart");
				state.cart.items[index].quantity += 1;
				state.cart.total += action.payload.price;
			}
		},

		removeFromCart: (state, action) => {
			state.cart.items = state.cart.items.filter(
				(item) => item.id !== action.payload.id
			);
		},
		increaseQuantity: (state, action) => {
			const index = state.cart.items.findIndex(
				(item) => item.id === action.payload.id
			);
			state.cart.items[index].quantity += 1;
			state.cart.total += action.payload.price;
		},
		decreaseQuantity: (state, action) => {
			const index = state.cart.items.findIndex(
				(item) => item.id === action.payload.id
			);
			state.cart.items[index].quantity -= 1;
			state.cart.total -= action.payload.price;
		},
	},
});

export const { emptyCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
