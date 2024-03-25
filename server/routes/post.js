const express = require("express");

// controller functions
const {insertPost, getPostsbyPaperId} = require("../controllers/postController");

const router = express.Router();
//In summary, const app = express() is the main application instance, while
//const router = express.Router() is a modular router instance that can
//be used to handle routes for specific URL prefixes.
const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);

// insert post in the database
router.post("/insertPost", insertPost)

// get Post info
router.post("/getPosts", getPostsbyPaperId)

module.exports = router