
const http = require('http');
const server = http.createServer(requestHandler);


async function requestHandler(req, res) {
    data = {};
    if (req.method === 'GET' && req.url === '/getRand/') {
        data = getRand();        
    }   
    else if (req.method === 'POST' && req.url === '/checkInfo/') {
        studentInfo = await parseBodyData(req);
        data = checkInfo(studentInfo);
    }

    res.writeHead(200, {
        'Content-type': 'application/json'
    });
    res.write(JSON.stringify(data));
    res.end();

}
function parseBodyData(req) {
    return new Promise((res, rej) => {
        parts = [];
        req.on('data', part => parts.push(part));
        req.on('error', err => {
            rej('Doslo je do greske u parsiranju', err);
        });
        req.on('end', () => {
            res(Buffer.concat(parts).toString());
        });
    });
}

function getRand() {
    let number = parseInt(Math.random() * 1000);
    return {
        randNum: number
    };
}

function checkInfo(info) {
    let studentInfo = JSON.parse(info);
    console.log(studentInfo);
    if (studentInfo.forename < 3) {
        return {
            status: false,
            reason: 'forename is invalid'
        };
    }
    if (studentInfo.lastname < 3) {
        return {
            status: false,
            reason: 'lastname is invalid'
        };
    }
    if (studentInfo.index < 6) {
        return {
            status: false,
            reason: 'index is invalid'
        };
    }
    else {
        return {
            status: true,
            reason: 'Dostavljene informacije su uredu.'
        };
    }
}
server.listen(3000);
