const userService = require("../services/userServices");
const refreshService = require("../services/authRefreshService");

// REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userService.registerUser(
      username,
      email,
      password
    );

    res.status(201).json(user);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const data = await userService.loginUser(email, password);

    res.status(200).json(data);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// REFRESH TOKEN
const refreshToken = async (req, res) => {
  try {

    const { refreshToken } = req.body;

    const tokens = await refreshService.refreshAccessToken(
      refreshToken
    );

    res.json(tokens);

  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { refreshToken, accessToken } = req.body;

    await Token.deleteOne({
      user: req.user.userId,
      ...(refreshToken && { refreshToken })
    });

    if (accessToken) {
      await Token.updateOne(
        { user: req.user.userId },
        {
          $addToSet: {
            blacklistedAccessTokens: accessToken
          }
        },
        { upsert: true }
      );
    }

    res.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout
};