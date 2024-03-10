const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

let broadcaster;
let accessCode;

io.on('connection', (socket) => {
    console.log('New client connected');
    console.log('Client connected:', socket.id);
  
    socket.on('generateAccessCode', () => {
      accessCode = generateAccessCode();
      console.log('Generated Access Code:', accessCode);
      socket.emit('accessCode', accessCode);
    });
  
    socket.on('validateAccessCode', (code, callback) => {
      const isValid = code === accessCode;
      callback(isValid); // Validate the access code entered by the guest
      if (isValid) {
        socket.emit('accessCode', accessCode); // Emit the access code to the guest viewer
      }
    });

  socket.on('broadcaster', () => {
    broadcaster = socket.id;
    socket.broadcast.emit('broadcaster');
  });

  socket.on('watcher', () => {
    console.log('Received watcher event from guest');
    socket.to(broadcaster).emit('watcher', socket.id);
  });

  socket.on('candidate', (id, message) => {
    console.log('Received candidate event from broadcaster');
    socket.to(id).emit('candidate', socket.id, message);
    console.log('Emitted candidate event to guest');
  });

  socket.on('offer', (id, message) => {
    console.log('Received offer event from broadcaster');
    socket.to(id).emit('offer', socket.id, message);
    console.log('Emitted offer event to guest');
  });

  socket.on('answer', (id, message) => {
    socket.to(id).emit('answer', socket.id, message);
  });



  socket.on('disconnect', () => {
    console.log('Client disconnected');
    socket.to(broadcaster).emit('disconnectPeer', socket.id);
  });
});

// Function to generate a random access code
function generateAccessCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

