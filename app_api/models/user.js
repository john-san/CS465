const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  hash: String,
  salt: String,
});

userSchema.methods.setPassword = function (password) {
  // create a unique salt for this user
  this.salt = crypto.randomBytes(16).toString("hex");
  // hash provided password with the salt
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
}

userSchema.methods.validPassword = function (password) {
  // hash provided password with the salt
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  // compare hashes
  return this.hash === hash;
}

userSchema.methods.generateJwt = function () {
  // set expiration to 7 days
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  // create JWT
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
}

mongoose.model("user", userSchema);