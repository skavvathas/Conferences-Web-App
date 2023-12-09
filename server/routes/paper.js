const express = require("express");

const { insertPaper, getPapersByConferenceId } = require("../controllers/paperController");

const router = express.Router();

const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);


router.post("/insertpaper", insertPaper);

router.get("/:id", getPapersByConferenceId);

module.exports = router