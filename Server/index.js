const express = require('express');
const app = express();
const internRoutes = require("./routes/internRoutes")
 const createTcpPool = require("./db");
 
const recruiterRoutes = require("./routes/recruiterRoutes")
const userRoutes = require("./routes/userRoutes")
const refreshtokenRoutes = require("./routes/refreshtokenRoutes")
const logoutRoutes = require("./routes/logoutRoutes")
const internpostRoutes = require("./routes/internpostRoutes")
const profileRoutes = require("./routes/profileRoutes")
const recruiterpostRoutes = require("./routes/recruiterpostRoutes")
const chatRoutes = require("./routes/chatRoutes")
const emailRoutes = require("./routes/emailRoutes")
// const postRoutes = require("./routes/postRoutes")

// const path = require("path");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,        //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}


const PORT = 4000;
const { getuserbynumber } = require("./controllers/userController");

// connect();
createTcpPool();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))

const server =   app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  })

app.use("/uploads" , express.static("./uploads"))
app.use("/", internRoutes);
app.use("/videos" , express.static("./videos"))
app.use("/", recruiterRoutes);
app.use("/", userRoutes);
app.use("/",refreshtokenRoutes);
app.use("/",logoutRoutes);
app.use('/',internpostRoutes);
app.use('/',profileRoutes)
app.use('/',recruiterpostRoutes);
app.use('/',emailRoutes);
app.use('/',chatRoutes);

const io = require('socket.io')(server, {
  cors: {
      origin: 'http://localhost:3000',
  }
});

let users = [];
 
  io.on('connection', socket => {
    console.log('User connected', socket.id);
    socket.on('addUser', userId => {
      console.log("reached 2")
        const isUserExist = users.find(user => user.userId === userId);
        console.log(users)
        if (!isUserExist) {
            const user = { userId, socketId: socket.id };
            users.push(user);
            io.emit('getUsers', users);
            console.log("reached 3")
        }
        else
        {
          io.emit('getUsers', users);
        }
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message,date, conversationId }) => {
        const receiver = users.find(user => user.userId === receiverId);
        const sender = users.find(user => user.userId === senderId);
        const user = await getuserbynumber(senderId) ;
        const user2 = await getuserbynumber(receiverId);
        console.log('sender :>> ', sender,receiver);
        if (receiver){
          console.log("inside receiver")
            io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
                senderId,
                message,
                date,
                conversationId,
                receiverId,
                user: user ,
                user2:user2
            });
            }
            else {
              console.log("inside sender")
                io.to(sender.socketId).emit('getMessage', {
                    senderId,
                    message,
                    date,
                    conversationId,
                    receiverId,
                    user: user,
                    user2:user2
                });
            }
        });

    socket.on('disconnect', () => {
      console.log("reached out")
        users = users.filter(user => user.socketId !== socket.id);
        io.emit('getUsers', users);
    });
    // io.emit('getUsers', socket.userId);
});


// app.use("/", postRoutes);