const fs = require('fs');
const querystring = require('querystring');

const { renderPage: renderHomePage } = require('../views/home');
const { renderPage: renderAddCarPage } = require('../views/add-car');
const { renderPage: renderCarPage } = require('../views/car');

const handleHome = (response) => {
    response.setHeader('Content-Type', 'text/html');
    response.write(renderHomePage());
    response.end();
}

function handleAddCar(method, request, response) {
    if (method === 'GET') {
        response.setHeader('Content-Type', 'text/html');
        response.write(renderAddCarPage('add-car'));
        response.end();
    } else if (method === 'POST') {
        let body = [];
        
        request.on('data', chunk => {
            body.push(chunk);
        });

        request.on('end', () => {
            body = Buffer.concat(body).toString();
            const formData = querystring.parse(body);
            const formDataJSON = JSON.stringify(formData);
            
            fs.writeFileSync('formData.json', formDataJSON);
            response.statusCode = 302;
            response.setHeader('Location', '/car');
            response.end();
        });
    }
}

const handleCar = (response) => {
    fs.readFile('formData.json', 'utf8', (err, data) => {
        if (!err) {
            response.setHeader('Content-Type', 'text/html');
            const text = data.toString().replace(/[{}"]/g, " ");
            response.write(renderCarPage(text));
            response.end();
        }
    });
}

const handlePageNotFound = (response) => {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'text/html');
    response.write('404 Page Not Found');
    response.end();
}

module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound
};