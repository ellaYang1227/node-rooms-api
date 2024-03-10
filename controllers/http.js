const headers = require('../services/headers');
const resHandle = require('../services/resHandle');

const http = {
    core ({ req, res }) {
        res.writeHead(200, headers);
        res.end();
    },
    notFound ({ req, res }) {
        resHandle(res, 404);
    }
};

module.exports = http;