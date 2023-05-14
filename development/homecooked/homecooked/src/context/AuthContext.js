import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const authReducer = (state, action) => {
	switch (action.type) {
		case "add_error":
			// Spread out the state object, and overwrite the errorMessage property
			// with the action.payload.
			return { ...state, errorMessage: action.payload };
		case "signup":
			// Reset the error message to an empty string.
			return { errorMessage: "", token: action.payload };
		case "signin":
			// Reset the error message to an empty string.
			return { errorMessage: "", token: action.payload };

		default:
			return state;
	}
};

const signup = (dispatch) => {
	return async ({ username, email, password }) => {
		console.log("getting: ");
		console.log(username, email, password);
		// Make API request to sign up with that email and password.
		// If we sign up, modify our state, and say that we are authenticated.
		// If signing up fails, we probably need to reflect an error message somewhere.
		try {
			const response = await trackerApi.post("/signup", {
				username,
				email,
				password,
			});
			//console.log(response.data);
		} catch (error) {
			//console.log(error.message);
		}
	};
};

const signin = (dispatch) => {
	return ({ email, password }) => {
		// Try to signin.
		// Handle success by updating state.
		// Handle failure by showing error message (somehow).
	};
};

const signout = (dispatch) => {
	return () => {
		// Somehow sign out!!!
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signup, signin, signout },
	{ isSignedIn: false }
);
