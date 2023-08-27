const app = require('express');
const router = app.Router();
var jwtverification = require("../middleware/jwtverification")
const {getuserprofile, updateuserprofile , internprofile, getinternexperience, getinterneducation, updateinternprofile, postexperience, posteducation, updateinternphoto, postbio, getprofileexperience, getprofileeducation, settingskills, getuserskills} = require("../controllers/profileController")
const multer = require("multer");


var imgconfig = multer.diskStorage({

    destination:(req,file,callback)=>{
  
      callback(null,"./uploads");
  
    },
     filename:(req,file,callback)=>{
       callback(null,`image-${Date.now()}.${file.originalname}`)
     }
  
  });
  
  const isImage = (req,file,callback) =>{
  
    if(file.mimetype.startsWith("image")){
      callback(null,Error("only image is allowed"))
    }
  
  }
  
  var upload = multer({
      storage:imgconfig,
      fileFilter:isImage
  })

router.post("/updateuserprofile",jwtverification, upload.single("photo"),updateuserprofile)
router.post("/updateinternphoto",jwtverification, upload.single("photo"),updateinternphoto)
router.get("/getuserprofile",jwtverification, getuserprofile);
router.post("/internprofile",jwtverification,internprofile)
router.get("/getinternexperience",jwtverification, getinternexperience);
router.get("/getinterneducation",jwtverification, getinterneducation);
router.post("/updateinternprofile",jwtverification,updateinternprofile);
router.post("/postexperience",jwtverification,postexperience);
router.post("/posteducation",jwtverification,posteducation);
router.post("/postbio",jwtverification,postbio);
router.post("/getprofileexperience/:number",jwtverification,getprofileexperience);
router.post("/getprofileeducation/:number",jwtverification,getprofileeducation);
router.post("/settingskills",settingskills);
router.post("/getuserskills/:number",jwtverification,getuserskills);

module.exports = router;