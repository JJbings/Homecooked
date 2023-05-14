const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: true, // no two users can have the same username
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  firstname: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  lastname: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true, // no two users can have the same email
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: String,
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    // if the password is not modified, we don't want to do anything
    return next();
  }
  // if the password is modified, we want to hash it
  bcrypt.genSalt(15, (err, salt) => {
    if (err) {
      return next(err);
    }
    // if we get the salt, we want to hash the password
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      console.log("hash", hash);
      // if we get the hash, we want to set the user's password to the hash
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword) {
  // this.password is the hashed and salted password
  // candidatePassword is the password that the user is trying to login with
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

mongoose.model("user", userSchema);
