const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const User = require("../models/User");

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  await Token.findOneAndUpdate(
    { user: user._id },
    { refreshToken },
    { upsert: true, new: true }
  );

  return refreshToken;
};

// Rotation Strategy
const refreshAccessToken = async (oldRefreshToken) => {
  if (!oldRefreshToken) throw new Error("Refresh token required");

  const decoded = jwt.verify(
    oldRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const tokenRecord = await Token.findOne({
    user: decoded.userId,
    refreshToken: oldRefreshToken,
  });

  if (!tokenRecord) throw new Error("Invalid refresh token");

  const user = await User.findById(decoded.userId);

  // ✅ Rotation — generate new refresh token
  const newRefreshToken = await generateRefreshToken(user);

  const newAccessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

module.exports = {
  generateRefreshToken,
  refreshAccessToken,
};