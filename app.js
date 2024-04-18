const http = require('http');
const PORT = 3000;
const id = 1;
const { getCars, getCarInformation, getCarAge } = require('./cars');
const { getHTMLDocumentStart, getHTMLDocumentEnd } = require('./htmlGenerator');

const server = http.createServer((req, res) => {
    const cars = getCars();
    console.log(cars);
    res.setHeader('Content-Type', 'text/html');
    const htmlStart = getHTMLDocumentStart();
    const htmlEnd = getHTMLDocumentEnd();
    res.write(htmlStart);
    res.write(`<body>`);
    res.write(`<p>${getCarInformation(cars[0].id)}</p>`);
    res.write(`<p>${getCarAge(cars[0].id)}</p>`);
    res.write(`</body>`);
    res.write(htmlEnd);
    res.end();
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`);
});