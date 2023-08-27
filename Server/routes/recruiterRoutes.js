const app = require('express');
const router = app.Router();
const jwtverification = require("../middleware/jwtverification")
const {insertrecruiter ,deleterecruiter, getrecruiterbynumber } = require("../controllers/recruiterController")
router.post("/insertrecruiter", insertrecruiter);
router.post("/deleterecruiter", deleterecruiter);
router.get("/getrecruiterbynumber/:number",jwtverification,getrecruiterbynumber)
module.exports = router;