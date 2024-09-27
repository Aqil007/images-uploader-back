const User = require("../models/userSchema");
const crypto = require("crypto");

// ============== register ===================
exports.register = async (req, res) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  const data = {
    name,
    email,
    password,
  };
  if (user) {
    res.send({ msg: "User already exist !", isSucess: false });
  } else {
    if (email && name && password) {
      const newUser = await User.create(data);
      res.status(200).send({
        user: newUser,
        msg: "Registered successfully.",
        isSucess: true,
      });
    } else {
      res.send({ msg: "All fields are required !", isSucess: false });
    }
  }
};

// ================== login =======================
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      res
        .status(200)
        .send({ user, msg: "Login successfully.", isSucess: true });
    } else {
      res
        .status(401)
        .send({ msg: "Email or password is wrong !", isSucess: false });
    }
  } else {
    res
      .status(401)
      .send({ msg: "Email or password is wrong !", isSucess: false });
  }
};

// =============== forrgot password =======================

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).send({
      msg: "Password changed successfully.",
      isSucess: true,
    });
  } else {
    res.status(200).send({ msg: "User does not exist !", isSucess: false });
  }
};
