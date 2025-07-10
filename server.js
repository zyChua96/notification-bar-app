const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

// io.on('connection', (socket) => {
//   console.log('User connected');

//   const notifications = [
//   { type: 'message', message: 'You have a new message!' },
//   { type: 'system', message: 'System alert: Maintenance at 2 AM.' },
//   { type: 'order', message: 'Order #1234 has been shipped!' },
// ];

// let index = 0;

// setInterval(() => {
//   io.emit('notification', notifications[index]);
//   index = (index + 1) % notifications.length;
// }, 5000);

// });

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('new-notification', (data) => {
    // Broadcast to all clients
    io.emit('notification', data);
  });
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
