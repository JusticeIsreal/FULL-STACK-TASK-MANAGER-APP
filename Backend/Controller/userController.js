const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// post user
const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  //check email doesnt exit in database
  const user = await UserSchema.findOne({ email: email });

  if (user) {
    return res.status(400).json({
      error: "User already exists",
    });
  }

  //create user

  try {
    const rounds = 10;
    const hashPassword = await bcrypt.hash(password, rounds);

    let user = await UserSchema.create({ name, email, password: hashPassword });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// get one
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check email doesnt exit in database
    const user = await UserSchema.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        error: "Password doesnt match",
      });
    }
    // JWT token
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    // let user = await UserSchema.findOne({ email, password });
    res.status(200).json({ token, email: user.email });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  addUser,
  loginUser,
};
