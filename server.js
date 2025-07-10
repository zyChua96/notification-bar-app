const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('User connected');

  // Simulated notifications
  setInterval(() => {
    socket.emit('notification', {
      type: 'system',
      message: 'System alert: All systems operational.',
    });
  }, 10000); // every 10 seconds
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
