const app = require('express');
const router = app.Router();
const {sendemail, verifyemail} = require("../controllers/emailController");
const jwtverification = require('../middleware/jwtverification');
router.post("/sendemail",jwtverification, sendemail);
router.get("/emailverification/:number/verify/:token" ,jwtverification, verifyemail)
module.exports = router;