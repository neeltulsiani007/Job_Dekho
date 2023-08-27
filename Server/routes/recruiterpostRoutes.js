const app = require('express');
const router = app.Router();
const jwtverification = require("../middleware/jwtverification")
const {recruiterpost, getrecruiterpost, postapplicants, updateapplicants, getapplicants} = require("../controllers/postController")
router.post("/recruiterpost",jwtverification,recruiterpost);
router.get("/getrecruiterpost",jwtverification,getrecruiterpost)
router.post("/postapplicants",jwtverification,postapplicants);
router.get("/updateapplicants",jwtverification,updateapplicants)
router.get("/getapplicants",jwtverification,getapplicants)
module.exports = router;