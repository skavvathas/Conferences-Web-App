require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
//const mongoose = require("mongoose");
//const multer = require("multer");
//const postsRoutes = require('./routes/posts')
const userRoutes = require("./routes/user");
const userConferences = require("./routes/conference");
const userReviewer = require("./routes/reviewer");
const userPaper = require("./routes/paper")
const userPost = require("./routes/post")
//const friendsRoutes = require("./routes/friends");
//const uploadRoutes = require("./routes/upload");
//const User = require("./models/userModel");
// express app
const app = express();
const path = require('path');
const mysql = require("mysql");

//app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
});

//mongoose.connect("mongodb+srv://skavvathas:01052001sk@cluster0.9dsorio.mongodb.net/twitterClone", { useNewUrlParser: true });
//mongoose.connect("mongodb+srv://<username>:<password>@cluster0.9dsorio.mongodb.net/twitterClone", { useNewUrlParser: true });

// routes
//app.use('/api/posts', postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/conference", userConferences);
app.use("/api/reviewer", userReviewer);
app.use("/api/paper", userPaper);
app.use("/api/post", userPost)
//app.use("/api/friends", friendsRoutes);
//app.use("/api/uploaded", uploadRoutes);
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, function() {
    console.log("Server started on port 4000!");
});