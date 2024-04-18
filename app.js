const http = require('http');
const fs = require("fs");
const routes = require('./routes/index');
const PORT = 3000;

const server = http.createServer((request, response) => {
    const { url, method } = request;

    if (url === '/' && method === 'GET') {
        routes.handleHome(response);
    } 
    else if (url === '/add-car') {
        routes.handleAddCar(method, request, response);
    }
    else if (url === '/car' && method === 'GET') {
        routes.handleCar(response);
    }
    else {
        routes.handlePageNotFound(response);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});