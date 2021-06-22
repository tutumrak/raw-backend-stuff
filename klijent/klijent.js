const http = require('http');

const request = http.request({
    hostname: 'localhost',
    port: 3000,
    method: 'GET',
    path: '/getRand/'

}, response => {
    let parts = [];
    response.on('data', part => parts.push(part));
    response.on('end', () => {
        let resData = Buffer.concat(parts).toString();
        console.log(resData);
    });
    
});

request.end();