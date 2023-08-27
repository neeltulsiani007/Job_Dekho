const app = require('express');
const router = app.Router();
const { newCoversation, getconversationbyid, sendmessage, getmessagesbychatid } = require("../controllers/chatController");
const jwtverification = require('../middleware/jwtverification');
router.post("/newconversation", newCoversation);
router.get("/getconversations",jwtverification, getconversationbyid)
router.post("/sendmessage",jwtverification, sendmessage);
router.get("/getmessagesbychatid/:conversationId",jwtverification,getmessagesbychatid)
module.exports = router;