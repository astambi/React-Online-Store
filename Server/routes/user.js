const express = require("express");
const authCheck = require("../config/auth-check");
const validator = require("validator");
const User = require("../models/User");
const encryption = require("../utilities/encryption");

const router = new express.Router();

function validateUserUpdateForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = "";

  if (
    !payload ||
    typeof payload.username !== "string" ||
    payload.username.trim().length < 4
  ) {
    isFormValid = false;
    errors.username = "Username must be at least 4 characters long";
  }

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = "Password must be at least 8 characters long";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

// Current User Profile
router.get("/profile", authCheck, (req, res) => {
  User.findById(req.user._id).then(user => {
    if (!user) {
      const message = "User not found.";
      return res.status(200).json({
        success: false,
        message: message
      });
    }

    res.status(200).json(user);
  });
});

// Current User Profile
router.post("/profile", authCheck, (req, res) => {
  User.findById(req.user._id)
    .then(existingUser => {
      // User Not found
      if (!existingUser) {
        const message = "User not found.";
        return res.status(200).json({
          success: false,
          message: message
        });
      }

      // Update User Data
      const userObj = req.body;

      // Username
      if (
        userObj.username &&
        userObj.username.trim() !== "" &&
        userObj.username.trim() !== existingUser.username
      ) {
        existingUser.username = userObj.username.trim();
      }

      // Email
      if (
        userObj.email &&
        userObj.email.trim() !== "" &&
        userObj.email.trim() !== existingUser.email
      ) {
        existingUser.email = userObj.email.trim();
      }

      // Password
      let newHashedPassword = null;

      if (userObj.password && userObj.password.trim() !== "") {
        newHashedPassword = encryption.generateHashedPassword(
          existingUser.salt,
          userObj.password.trim()
        );

        if (existingUser.password !== newHashedPassword) {
          existingUser.password = userObj.password.trim();
        }
      }

      console.log(existingUser);
      // Validate user data
      const validationResult = validateUserUpdateForm(existingUser);
      if (!validationResult.success) {
        console.log(validationResult);
        return res.status(200).json({
          success: false,
          message: validationResult.message,
          errors: validationResult.errors
        });
      }

      // Hash Password
      if (newHashedPassword) {
        existingUser.password = newHashedPassword;
      }

      // Save User to db
      existingUser
        .save()
        .then(editedUser => {
          return res.status(200).json({
            success: true,
            message: "User profile edited successfully.",
            data: editedUser
          });
        })
        .catch(err => {
          console.log(err);
          let message = "Something went wrong :( Check the form for errors.";
          if (err.code === 11000) {
            message = "User with the given email already exists.";
          }
          return res.status(200).json({
            success: false,
            message: message
          });
        });
    })
    .catch(err => {
      console.log(err);
      const message = "Something went wrong :( Check the form for errors.";
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

// Current User Profile
router.delete("/profile", authCheck, (req, res) => {
  User.findById(req.user._id)
    .then(existingUser => {
      // User Not found
      if (!existingUser) {
        const message = "User not found.";
        return res.status(200).json({
          success: false,
          message: message
        });
      }

      // Remove User from db
      existingUser
        .remove()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "User profile deleted successfully."
          });
        })
        .catch(err => {
          console.log(err);
          return res.status(200).json({
            success: false,
            message: "Entry does not exist!"
          });
        });
    })
    .catch(err => {
      console.log(err);
      const message = "Something went wrong :( Check the form for errors.";
      return res.status(200).json({
        success: false,
        message: message
      });
    });
});

module.exports = router;
