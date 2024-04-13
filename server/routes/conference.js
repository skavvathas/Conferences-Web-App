const express = require("express");

// controller functions
const {insertConference, getConference, getConferencesByAuthor, getConferenceById} = require("../controllers/conferenceController");

const router = express.Router();
//In summary, const app = express() is the main application instance, while
//const router = express.Router() is a modular router instance that can
//be used to handle routes for specific URL prefixes.
const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);

// insert conference in the database
router.post("/insertConf", insertConference);

// get Conference info
router.post("/getConf", getConference);

router.get("/:id", getConferencesByAuthor);

router.get("/id/:id", getConferenceById);


module.exports = router