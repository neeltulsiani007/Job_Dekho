const app = require('express');
const router = app.Router();
const jwtverification = require('../middleware/jwtverification')
const {insertuser,checkuserexists,users, changepassword, getuser, getusertype, getuserbynumber} = require("../controllers/userController")
router.post("/insertuser", insertuser);
router.post("/checkuserexists",checkuserexists)
router.get("/getuser",jwtverification,getuser)
router.post("/getuserbynumber",jwtverification,getuserbynumber)
router.get("/users",jwtverification,  users)
router.post("/changepassword",jwtverification,changepassword)
router.get("/getusertype",jwtverification,getusertype)
module.exports = router;