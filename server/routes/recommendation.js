const express = require("express");

const { getAssignmentByReviewer } = require("../controllers/recommendationController");

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);


router.post("/getRec", getAssignmentByReviewer)


module.exports = router