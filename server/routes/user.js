const express = require("express");

// controller functions
const {loginUser, registerUser, token, allUsers, editUser, getUserByUsername} = require("../controllers/userController");

const router = express.Router();
//In summary, const app = express() is the main application instance, while
//const router = express.Router() is a modular router instance that can
//be used to handle routes for specific URL prefixes.

// login route
// loginUser API function in controller/userController.js
router.post("/login", loginUser)

// signup route
// registerUser API function in  controller/userController.js
router.post("/register", registerUser)

router.get("/token", token)

// edit the user
router.put("/edit", editUser)

router.get("/getUserByUsername/:id", getUserByUsername)




module.exports = router