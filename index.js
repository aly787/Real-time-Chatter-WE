// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express app
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Create an HTTP server and integrate it with Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Listen for client connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming chat messages
    socket.on('chat message', (msg) => {
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
