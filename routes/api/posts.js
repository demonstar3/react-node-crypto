const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
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
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          const { errors, isValid } = validatePostInput(req.body);
          if (!isValid) {
            return res.status(400).json(errors);
          }
          const newPost = {
            text: req.body.text,
            username: req.body.username,
            title: req.body.title,
            user: req.user.id
          };
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          Post.findOneAndUpdate(
            { user: req.user.id },
            { $set: newPost },
            { new: true }
          ).then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ postnotfound: "Post cannot be found" })
        );
    });
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

    newPost.save().then(post => res.json(post));
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

          post.remove().then(() => res.json({ sucess: true }));
        })
        .catch(err =>
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
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          username: req.body.username,
          user: req.user.id
        };

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err =>
        res.status(404).json({ postnotfound: "No post was found" })
      );
  }
);

//DELETE REQ TO DELETE A COMMENT /api/post/comment/:id/:comment_id
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if the comment exists & if user is authorized
        const commentIndex = post.comments.findIndex(
          comment => comment.user.toString() === req.user.id
        );
        if (
          post.comments.findIndex(
            comment => comment._id.toString() === req.params.comment_id
          ) === -1
        ) {
          return res
            .status(404)
            .json({ commentnotfound: "The comment was not found" });
        }
        if (commentIndex === -1) {
          return res
            .status(401)
            .json({ msg: "You are not authorized to delete this comment" });
        }

        post.comments.splice(commentIndex, 1);
        post.save().then(post => res.json({ msg: "Comment Deleted" }));
      })
      .catch(err =>
        res.status(404).json({ postnotfound: "No post was found" })
      );
  }
);
module.exports = router;
