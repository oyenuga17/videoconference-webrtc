const express = require('express');
const path = require('path');

const app = express();
var fs = require( 'fs' );
const port = 5500;

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var server = require('https').createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  requestCert: false,
  rejectUnauthorized: false
 }, app);

server.listen(port, '192.168.0.101', () => {
  console.log(`Server is running on http://localhost:${port}`);
});