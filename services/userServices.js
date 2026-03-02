const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const refreshService = require("./authRefreshService");

// REGISTER
const registerUser = async (username, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return {
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  };
};

// LOGIN (Fixed Version)
const loginUser = async (email, password) => {

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const foundUser = await User.findOne({ email }).select("+password");

  if (!foundUser) {
    throw new Error("Invalid email or password");
  }

  console.log("PASSWORD INPUT:", password);
  console.log("HASHED PASSWORD:", foundUser.password);

const isMatch = await bcrypt.compare(
  String(password),
  String(foundUser.password)
);

  console.log("BCRYPT RESULT:", isMatch);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    {
      userId: foundUser._id,
      role: foundUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = await refreshService.generateRefreshToken(
    foundUser
  );

  return {
    accessToken,
    refreshToken,
    role: foundUser.role,
  };
};
module.exports = {
  registerUser,
  loginUser,
};