const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/user");
const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profile");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

app.use(passport.initialize());

require("./config/passport.js")(passport);

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.use("/api/users", users);
app.use("/api/profile", profiles);
app.use("/api/post", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
