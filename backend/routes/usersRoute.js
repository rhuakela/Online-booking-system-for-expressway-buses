const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// new user registration

router.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "Sorry User already exists",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User added successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// login user

router.post("/login", async (req, res) => {
  try {
    console.log(req.body)
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }

    if (userExists.isBlocked) {
      return res.send({
        message: "This user is blocked... contact admin",
        success: false,
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!passwordMatch) {
      return res.send({
        message: "Incorrect password",
        success: false,
        data: null,
      });
    }
    const token = jwt.sign({ userId: userExists._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
      user: userExists._id
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// get user by id

router.post("/get-user-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// This code for get all users to admin panel

router.post("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// This code for update users

router.post("/update-user-permissions", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      message: "User permission updated successfully",
      success: true,
      data: null,
    });
  } catch {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
});

// This code for forgot password

// router.post("/forgot-password", async (req, res) => {
//   try {
//     const userExists = await User.findOne({ email: req.body.email });
//     if (!userExists) {
//       return res.send({
//         message: "User does not exist",
//         success: false,
//         data: null,
//       });
//     }

//     // Generate a password reset token and save it to the user object
//     const token = crypto.randomBytes(20).toString("hex");
//     userExists.resetPasswordToken = token;
//     userExists.resetPasswordExpires = Date.now() + 3807000; // Token expires in 1 hour

//     // Save the user object with the reset token and expiration time
//     await userExists.save();

//     // Send an email to the user with the reset password link
//     const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
//     await sendForgotPasswordEmail(req.body.email, resetPasswordLink);

//     res.send({
//       message: "Password reset link has been sent to your email",
//       success: true,
//       data: null,
//     });
//   } catch (error) {
//     res.send({
//       message: error.message,
//       success: false,
//       data: null,
//     });
//   }
// });

// for profile

module.exports = router;
