const express = require("express");
const router = express.Router();

const {
  addUser,
  loginUser,
  getAllUsers,
  postANote,
} = require("../Controller/userController");

router.get("/allUsers", getAllUsers);
router.post("/addUser", addUser);
router.post("/loginUser", loginUser);
router.post("/postNote", postANote);

module.exports = router;
