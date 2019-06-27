const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const keys = require("../../config/keys");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const aws = require("aws-sdk");
const multer = require("multer");
const methods = require("../../image_upload/image_upload");
aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
  secretAccessKey: keys.SecretAccessKey,
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
  accessKeyId: keys.AccessKeyID,
  region: "us-east-2" // region of your bucket
});
//validation

const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comments");

//ROUTE TO GET ALL POSTS at /api/post

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ posts: "No Posts are available currently" })
    );
});

//ROUTE TO GET POST BY ID at /api/post/:id

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ post: "No Post Found" }));
});

//ROUTE TO EDIT POST BY ID at /api/post/:id

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        const { errors, isValid } = validatePostInput(req.body);
        if (!isValid) {
          return res.status(400).json(errors);
        }
        const newPost = {
          text: req.body.text,
          title: req.body.title
        };

        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        Post.findOneAndUpdate(
          { _id: post._id },
          { $set: newPost },
          { new: true }
        ).then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfound: "Post cannot be found" })
      );
  }
);

//ROUTE TO CREATE POST AT api/posts

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      username: req.body.username,
      title: req.body.title,
      user: req.user.id
    });
    let profileFields = {
      posts: []
    };
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile.posts !== []) {
        profileFields.posts = profile.posts;
      }

      profile.posts.unshift({ post: newPost._id });
      profile.save().catch(err => console.log(err));
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => console.log(err));
  }
);
//route for image upload
const upload = multer({
  storage: methods.storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, cb) {
    methods.checkFileType(file, cb);
  }
});
router.post(
  "/image_upload/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  (req, res) => {
    let file = {};
    if (req.file === undefined) {
      return res
        .status(404)
        .json({ error: "Your must select an image to upload" });
    } else {
      file.fileLoc = req.file.location;
      file.imageKey = req.file.key;
    }
    Post.findById(req.params.id)
      .then(post => {
        console.log(post);
        const newPost = {
          image: file.fileLoc,
          imageKey: file.imageKey
        };

        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        Post.findOneAndUpdate(
          { _id: post._id },
          { $set: newPost },
          { new: true }
        ).then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfound: "Post cannot be found" })
      );
  }
);

//ROUTE TO DELETE THE POST api/posts/:id

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          Profile.findOne({ user: req.user.id }).then(profile => {
            for (var i = profile.posts.length - 1; i >= 0; i--) {
              if (profile.posts[i].post === req.params.id) {
                profile.posts.splice(i, 1);
                // break;       //<-- Uncomment  if only the first term has to be removed
              }
            }
            profile.save().catch(err => console.log(`uhoh : ${err}`));
          });
          var paramsss = {
            Bucket: "crypto-net",
            Key: post.imageKey.toString()
          };
          var s3 = new aws.S3();
          s3.deleteObject(paramsss, function(err, data) {
            if (err) {
              console.log(err);
            }
          });
          post.remove().then(() => res.json({ sucess: true }));
        })
        .catch(
          // err => console.log(err),
          res.status(404).json({ postnotfound: "No post was found" })
        );
    });
  }
);

//ROUTE TO LIKE THE POST api/posts/like/:id
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "You have already liked this post!" });
          }

          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })

        .catch(err =>
          res.status(404).json({ postnotfound: "No post was found" })
        );
    });
  }
);

//POST REQ TO UNLIKE POST /api/post/unlinke/:id

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLiked: "You have not liked this post!" });
          }

          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })

        .catch(err =>
          res.status(404).json({ postnotfound: "No post was found" })
        );
    });
  }
);

//ROUTE TO ADD COMMENT AT /api/post/comment/:id
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          username: req.body.username,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);
//DELETE REQ TO DELETE A COMMENT /api/post/comment/:id/:comment_id
// @route DELETE /api/posts/comment/:id/:comment_id
// @desc Delete a comment to post
// @access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment doesn't exist" });
        }

        // Filter the comment to be deleted
        const updatedComments = post.comments.filter(
          comment =>
            !(
              comment.user.toString() === req.user.id &&
              comment._id.toString() === req.params.comment_id
            )
        );

        // Check to see if the user is authorized to delete that comment
        // They will only be able to delete that comment if they're the creator of it
        if (updatedComments.length === post.comments.length) {
          return res.status(401).json({
            notauthorized:
              "If you're seeing this that means either of three things \n 1. You used postman or some other tool to send this request to delete someone else's comment \n 2. You changed the JavaScript on the front-end to send this request \n 3. You made your own script to make the requst."
          });
        }
        // Update comments
        post.comments = updatedComments;
        // Save to database
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
