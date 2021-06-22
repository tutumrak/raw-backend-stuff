const http = require('http');
const request = http.request({
    port: 3000,
    hostname: 'localhost',
    path: '/checkInfo/',
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
}, response => {
    let parts = [];
    response.on('data', part => parts.push(part));
    response.on('end', () => {
        let data = Buffer.concat(parts).toString();
        console.log(data);
    });
});
const studentToCheck = {
    forename: 'Mika',
    surname: 'Alas',
    index: 240250
};
let reqData = JSON.stringify(studentToCheck);
request.write(reqData);
request.end();