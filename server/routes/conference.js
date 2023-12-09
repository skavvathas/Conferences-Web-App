const express = require("express");

// controller functions
const {insertConf, getConf, getConferencesByAuthor} = require("../controllers/conferenceController");

const router = express.Router();
//In summary, const app = express() is the main application instance, while
//const router = express.Router() is a modular router instance that can
//be used to handle routes for specific URL prefixes.
const requireAuth = require('../middleware/requireAuth');
router.use(requireAuth);

// insert conference in the database
router.post("/insertConf", insertConf)

// get Conference info
router.post("/getConf", getConf)

router.get("/:id", getConferencesByAuthor);


module.exports = router