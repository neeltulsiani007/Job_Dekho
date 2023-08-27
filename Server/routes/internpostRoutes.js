const app = require('express');
const router = app.Router();
const multer = require("multer")
const {internpost,getpost,postlikes,updatelikes,individualpost, getcomments, addcomments, internvideo, getpostsbyoffset} = require("../controllers/postController")

var jwtverification = require("../middleware/jwtverification")

var imgconfig = multer.diskStorage({

  destination:(req,file,callback)=>{

    callback(null,"./uploads");

  },
   filename:(req,file,callback)=>{
     callback(null,`image-${Date.now()}.${file.originalname}`)
   }
});

var secondimgconfig = multer.diskStorage({

  destination:(req,file,callback)=>{
    callback(null,"./videos");
  },
   filename:(req,file,callback)=>{
     callback(null,`video-${Date.now()}.${file.originalname}`)
   }

});

const isImage = (req,file,callback) =>{

  if(file.mimetype.startsWith("image")){
    callback(null,Error("only image is allowed"))
  }
}
const isVideo = (req,file,callback) =>{

  if(file.mimetype.startsWith("video")){
    callback(null,Error("only video is allowed"))
  }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

var uploadvideo = multer({
  storage:secondimgconfig,
  fileFilter:isVideo
})
   
router.post("/internpost",jwtverification, upload.single("photo"),internpost)
router.post("/internvideo",jwtverification, uploadvideo.single("video"),internvideo)
router.get("/getpost",jwtverification,getpost)
router.post("/postlikes",jwtverification,postlikes)
router.get("/updatelikes",jwtverification, updatelikes)
router.get("/post/:id",jwtverification,individualpost)
router.get("/comments/:id",jwtverification,getcomments)
router.get("/getpostsbyoffset/:offset" , jwtverification , getpostsbyoffset)
router.post("/addcomments/:id",jwtverification,addcomments)
module.exports = router;

