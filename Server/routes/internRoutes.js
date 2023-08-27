const app = require('express');
const router = app.Router();
var jwtverification = require("../middleware/jwtverification")
const {insertintern , deleteintern, getallinterns, getinternsbystring} = require("../controllers/internController")
router.post("/insertintern", insertintern);
router.post("/deleteintern", deleteintern);
router.get("/getallinterns",jwtverification,getallinterns);
router.post("/getinternsbystring",getinternsbystring);
module.exports = router;