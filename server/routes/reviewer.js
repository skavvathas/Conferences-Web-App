const express = require("express");

// controller functions
const { insertReviewer, getReviewersByConferenceId } = require("../controllers/reviewerController");

const router = express.Router();
//In summary, const app = express() is the main application instance, while
//const router = express.Router() is a modular router instance that can
//be used to handle routes for specific URL prefixes.
const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);

// insert conference in the database
router.post("/insertReviewer", insertReviewer);

router.get("/:id", getReviewersByConferenceId);



module.exports = router