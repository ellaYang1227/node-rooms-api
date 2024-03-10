const HttpControllers = require('../controllers/http');
const RoomsControllers = require('../controllers/rooms');

const routes = async (req, res) => {
    const { url, method } = req;
    console.log(method, url);
    
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    if (url === '/rooms' && method === 'GET') {
        RoomsControllers.getRooms({ req, res });
    } else if (url === '/rooms' && method === 'POST') {
        req.on('end', () => RoomsControllers.createRooms({ req, res, body }));
    } else if (url === '/rooms' && method === 'DELETE') {
        RoomsControllers.deleteRooms({ req, res });
    } else if (url.startsWith('/rooms/') && method === 'DELETE') {
        RoomsControllers.deleteRoom({ req, res, url });
    } else if (url.startsWith('/rooms/') && method === 'PATCH') {
        req.on('end', () => RoomsControllers.editRoom({ req, res, url, body }));
    } else if (method === 'OPTIONS') {
        HttpControllers.core({ req, res });
    } else {
        HttpControllers.notFound({ req, res });
    }
};

module.exports = routes;
