


module.exports.newCoversation = async(req,res)=>{

    var sql = require("mssql");
    const {v4 : uuidv4} = require("uuid")
    const id = uuidv4()
    var request = new sql.Request(); 
    const firstuser = req.body.firstuser
    const seconduser = req.body.seconduser
    request.input("firstuser",sql.Numeric,firstuser)
    request.input("seconduser",sql.Numeric,seconduser)
    request.input("chatid",sql.VarChar,id)
    
    try{
        await request.query("insert into chat(firstuser,seconduser,chatid) values(@firstuser,@seconduser,@chatid)")
    }catch(e){
        console.log("error",e)
    }
    res.json({ mssg : "Conversation created"})
}
// app.get('/api/conversations/:userId', async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const conversations = await Conversations.find({ members: { $in: [userId] } });
//         const conversationUserData = Promise.all(conversations.map(async (conversation) => {
//             const receiverId = conversation.members.find((member) => member !== userId);
//             const user = await Users.findById(receiverId);
//             return { user: { receiverId: user._id, email: user.email, fullName: user.fullName }, conversationId: conversation._id }
//         }))
//         res.status(200).json(await conversationUserData);
//     } catch (error) {
//         console.log(error, 'Error')
//     }
// })

module.exports.getconversationbyid = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request()
    const { getuserbynumber } = require("./userController");
    const usernumber = req.number;
  try{
    request.input("number",sql.Numeric,usernumber);
    const conversations =  await request.query("select * from chat where firstuser = @number or seconduser = @number order by orderdatetime desc");
    const conversationUserData = Promise.all(conversations.recordset.map(async (conversation) => {
        const receiverId = conversation.firstuser === usernumber?conversation.seconduser:conversation.firstuser;
        const user = await getuserbynumber(receiverId)
        return { user: user, chatid: conversation.chatid , latestmessage:conversation.latestmessage , latestdate : conversation.latestdate }
    }))
    res.send({recordset : await conversationUserData})
}catch(e){
    console.log("error",e)
}
}

module.exports.sendmessage = async(req,res)=>{

    var sql = require("mssql");
    var request = new sql.Request(); 
    console.log("inside sendmessage")
    console.log(req.body)
    const moment = require('moment')
    const orderdatetime = new Date();
    const date = moment(new Date()).format('MMMM Do YYYY, h:mm a');
    const temp = date.split(',')[0];
    console.log(date)
    const length = temp.length;
    const dateonly = temp.slice(0,length-4)
    const { conversationId, senderId, message, receiverId  } = req.body;

    try{
    if (!senderId || !message) return res.status(400).send('Please fill all required fields')
    if (conversationId === 'new' && receiverId){
    
        const {v4 : uuidv4} = require("uuid")
        const id = uuidv4()
        request.input("chatid",sql.VarChar,id)
        request.input("sender",sql.Numeric,senderId)
        request.input("receiver",sql.Numeric,receiverId)
        request.input("date",sql.VarChar,date)
        request.input("orderdatetime",sql.DateTime,orderdatetime)
        request.input("latestdate",sql.VarChar,dateonly)
        request.input("content",sql.NVarChar,message)

            await request.query("insert into chat(firstuser,seconduser,chatid,latestmessage,latestdate,orderdatetime) values(@sender,@receiver,@chatid,@content,@date,@orderdatetime)")
            await request.query("insert into message(sender,receiver,content,chatid,timestamp,orderdatetime) values(@sender,@receiver,@content,@chatid,@date,@orderdatetime)")
            return res.status(200).send("Message sent");
    }
    else if (!conversationId && !receiverId) {
        return res.status(400).send('Please fill all required fields')
    }
  
   
    request.input("chatid",sql.VarChar,conversationId)
    request.input("sender",sql.Numeric,senderId)
    request.input("orderdatetime",sql.DateTime,orderdatetime)
    request.input("receiver",sql.Numeric,receiverId)
    request.input("date",sql.VarChar,date)
    request.input("latestdate",sql.VarChar,dateonly)
    request.input("content",sql.NVarChar,message)
    await request.query("update chat set latestmessage = @content , latestdate = @date , orderdatetime = @orderdatetime where chatid = @chatid ");
   const m =  await request.query("insert into message(sender,receiver,content,chatid,timestamp,orderdatetime) values(@sender,@receiver,@content,@chatid,@date,@orderdatetime)")
   console.log(m)
    return res.status(200).send("Message sent");

}catch(e){console.log("error",e)}
}




module.exports.getmessagesbychatid = async(req,res) =>{

    var sql = require("mssql");
    var request = new sql.Request(); 
    const { getuserbynumber } = require("./userController");

    console.log("in getmessagesbychatid")
    try{
        const checkMessages = async(chatid)=>
        {
            request.input("chatid",sql.VarChar,chatid)
            const messages = await request.query("select * from message where chatid = @chatid order by orderdatetime")
            const messageUserData =  Promise.all(messages.recordset.map(async (message) => {
          
                const user = await getuserbynumber(message.sender)
                return { user: user, message: message.content  , time:message.timestamp }
            }));
            res.status(200).send(await messageUserData);
        }

        const conversationId = req.params.conversationId;
        if (conversationId === 'new'){
            const sender  = req.query.senderId;
            const receiver  = req.query.receiverId;
            console.log(sender,receiver)
            request.input("sender",sql.Numeric,sender);
            request.input("receiver" , sql.Numeric , receiver)
            const checkConversation = await request.query("SELECT * from message where (sender =@sender or sender = @receiver) and (receiver = @sender or receiver = @receiver) order by orderdatetime")
            if (checkConversation.recordset.length > 0){
                checkMessages(checkConversation.recordset[0].chatid);
            } else {
                return res.status(200).json([])
            }
        } else {
            checkMessages(conversationId);
        }

    }catch(e){console.log("Error" , e)}
}


module.exports.getconversationsbynumber = async(sender , num) =>{

    var sql = require("mssql");
    var request = new sql.Request()
    const { getuserbynumber } = require("./userController");
    const usernumber = num;
    const usersender = sender;
  try{
    request.input("sender",sql.Numeric,usersender);
    request.input("number",sql.Numeric,usernumber);
    const conversations =  await request.query("select * from chat where firstuser = @number or seconduser = @number order by orderdatetime desc");
    const conversationUserData = Promise.all(conversations.recordset.map(async (conversation) => {
    const receiverId = conversation.firstuser === usernumber?conversation.seconduser:conversation.firstuser;
    const user = await getuserbynumber(receiverId)
    return { user: user, chatid: conversation.chatid , latestmessage:conversation.latestmessage , latestdate : conversation.latestdate }
    }))
    console.log(await conversationUserData)
    return {recordset : await conversationUserData}
}catch(e){
    console.log("error",e)
}
}

