const app = require('express');
const router = app.Router();
const {handleLogout} = require("../controllers/logoutController")
router.get("/logout", handleLogout);
module.exports = router;