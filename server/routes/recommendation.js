const express = require("express");

const { getAssignmentByReviewer, startRecommendation } = require("../controllers/recommendationController");

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);


router.post("/getRec", getAssignmentByReviewer)

router.post("/startRec", startRecommendation)


module.exports = router