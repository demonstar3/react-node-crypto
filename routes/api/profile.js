const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const methods = require("../../image_upload/image_upload");
//LOAD validation
const validateProfileInput = require("../../validation/profile");
//Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//GET REQ to api/profile to get current users profile
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "You have not created your profile yet";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//GET REQ TO API/PROFILE/HANDLE/:handle to get profile by handle

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("users", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile found for this user";
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//GET REQ to api/profile/user/:userid to get profile by user id
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("users", ["name"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile found for this user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//GET REQ TO api/profile/all to get all profiles

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("users", ["name"])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "There is no profile found for this user";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err =>
      res
        .status(404)
        .json({ profile: "There are currently no profiles avaiable" })
    );
});
//POST REQ TO /api/profile to make a profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get fields
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.username) profileFields.username = req.body.username;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.coins) profileFields.coins = req.body.coins;
    if (req.body.bio) profileFields.bio = req.body.bio;

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({ user: req.user.id }).then(profile => {
      //update

      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
        .then(profile => res.json(profile))
        .catch(err => console.log(err));
    });
  }
);
const multer = require("multer");
const upload = multer({
  storage: methods.storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    methods.checkFileType(file, cb);
  }
});

router.post(
  "/img_upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  (req, res, err) => {
    if (req.file == undefined) {
      res.status(404).json({ error: "no file selected" });
    } else {
      res.json({ fileLoc: req.file.location });
    }
  }
);

module.exports = router;
