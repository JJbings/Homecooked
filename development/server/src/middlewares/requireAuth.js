const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("user");

module.exports = (req, res, next) => {
	console.log("AUTHORIZING");
	const { authorization } = req.headers;
	console.log(authorization);

	if (!authorization) {
		return res.status(401).send({ error: "You must be logged in." });
	}
	const token = authorization.replace("Bearer ", "");

	try {
		jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
			if (err) {
				return res.status(401).send({ error: "You must be logged in." });
			}

			const { userId } = payload;

			const user = await User.findById(userId);

			req.user = user._id;
			next();
		});
	} catch (e) {
		console.log(e);
	}
};
