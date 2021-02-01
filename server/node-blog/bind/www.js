const htpp = require('http');

const PORT = 8000;
const serverHandle = require('../app')

const server = htpp.createServer(serverHandle)
server.listen(PORT);