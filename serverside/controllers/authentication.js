const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //  email format validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters long." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already Exist", status: "no" });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const authToken = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return res.status(200).json({
        message: "User Registered Successfully",
        userInfo: { userEmail: newUser.email, userId: newUser._id },
        token: authToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({ message: "Password doesn't Matched...!" });
    }

    const authToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      msg: "Login Successful...",
      token: authToken,
      userInfo: {
        userId: user._id,
        userEmail: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyOtpToRegister = async (req, res) => {
  const { otp, email, username, password, role } = req.body;
  // password minimum length validation

  const response = await OtpModel.find({ email })
    .sort({ createdAt: -1 })
    .limit(1);
  if (response.length === 0 || otp !== response[0].otp) {
    return res.status(400).json({
      success: false,
      message: "The OTP is not valid",
    });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let moneyCredited = 0;
  console.log(role);
  if (role === "student") {
    moneyCredited = 300;
  } else {
    moneyCredited = 200;
  }

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
    moneyAmount: moneyCredited,
  });

  await newUser.save();
  const authToken = jwt.sign(
    {
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res.status(200).json({
    message: "User Registered Successfully",
    user: newUser,
    token: authToken,
  });
};

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(500).json({ message: "Internal server error" });
};
module.exports = {
  registerUser,
  loginUser,
  getUser,
};
