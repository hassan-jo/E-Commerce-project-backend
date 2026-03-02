const userService = require("../services/userServices");

// REGISTER
const register = async (req, res) => {
  try {
    const  { username, email, password } = req.body ;
    const user = await userService.registerUser( username, email, password ) 
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await userService.loginUser(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };