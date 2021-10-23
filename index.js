const { request } = require("express");
const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const indexRouter = require("./routers/index");
const http = require('http');
const server = http.createServer(app);
const { v4: uuidv4 } = require('uuid');

const { Server } = require("socket.io");
const io = new Server(server);
const CORE_APP_URL = process.env.CORE_APP_URL+':'+process.env.CORE_APP_PORT;
const axios = require('axios').default;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const backurl = process.env.CORE_APP_URL+':'+process.env.CORE_APP_PORT;
console.log('Server is comunicating with : '+backurl);
app.use(express.json({extended: true}));
app.use(cookieParser());
//Static files
app.use(express.static('views'));
app.use(express.static('assets'));
app.use(express.static('style'));

//Router
app.use('/', indexRouter);
var connectedUsers = [];

io.on('connection', (socket) => {

  socket.on('join', (chat_id) => {
      socket.pseudo = uuidv4();
      connectedUsers.push(socket);
      console.log(connectedUsers);
      socket.join(chat_id);
      socket.channel = chat_id;
      axios.get(CORE_APP_URL+"/chat/messages/"+chat_id).then(response => {
          socket.emit('loadMessages', response.data);
      }).catch(err => {
          
      });

  });

  socket.on('newMessage', (message, receiver)=> {
      

      axios.post(CORE_APP_URL+"/chat/message",{chat_id:socket.channel, content:message, receiver:receiver}).then(response => {
      }).catch(err => {
    
      })

  })

  socket.on('writting', (pseudo) => {
      socket.broadcast.to(socket.channel).emit('writting', pseudo);
  });

  socket.on('notWritting', (pseudo) => {
      socket.broadcast.to(socket.channel).emit('notWritting', pseudo);
  });

});


server.listen(process.env.PORT || "4200", () => {
  console.log("Le serveur est à l’écoute sur le port 4200");
});
