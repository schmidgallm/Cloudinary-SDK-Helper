// Dependencies
const http = require('http');
const app = require('./app');

// Init Port based on envriorment
const PORT = process.env.PORT || 5000;

//  Create HTTP server and pass express into it
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`> Server now listening on port ${PORT}`);
});
