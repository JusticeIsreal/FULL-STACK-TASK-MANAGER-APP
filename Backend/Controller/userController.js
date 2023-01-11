const UserSchema = require("../models/userSchema");
const NoteSchema = require("../models/noteSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get all users

const getAllUsers = async (req, res) => {
  const users = await UserSchema.find({}).populate("note");
  res.status(200).json({ users });
};

// register user

const addUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserSchema.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: `${email} has been taken by another user ` });
  }

  try {
    const rounds = 10;
    const hashPassword = await bcrypt.hash(password, rounds);

    let users = await UserSchema.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// login
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

// post a note

const postANote = async (req, res) => {
  try {
    const body = req.body;
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      res.status(401).json({ msg: "token missing" });
    }

    const token = auth.split(" ")[1];

    const userData = jwt.verify(token, process.env.SECRET);
    if (!userData) {
      res.status(401).json({ msg: "token missing" });
    }

    const user = await UserSchema.findById(userData.id);

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const notes = new NoteSchema({
      content: body.content,
      date: new Date(),
      user: user._id,
    });

    const savedNote = await notes.save();
    user.note.push(savedNote);
    await user.save();

    res.json(savedNote);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  loginUser,
  postANote,
};
