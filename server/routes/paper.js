const express = require("express");

const { insertPaper, getPapersByConferenceId, getPaper } = require("../controllers/paperController");

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);


router.post("/insertpaper", insertPaper);

router.get("/:id", getPapersByConferenceId);

router.post("/", getPaper);

module.exports = router