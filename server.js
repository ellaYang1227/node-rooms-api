const http = require('http');
const headers = require('./headers');
const Room = require('./models/room');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});
const { PORT, DATABASE, DATA_PASSWORD } = process.env;
const DB = DATABASE.replace('<password>', DATA_PASSWORD);
const mongoose = require('mongoose');
// 連接資料庫 mongodb://127.0.0.1:27017/<資料庫名稱> => mongodb://127.0.0.1:27017/hotel
// 連接資料庫 mongodb+srv://ella:<password>@cluster0.p6pkmbb.mongodb.net/<databaseName>?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(DB)
    .then(() => console.log('連接資料庫成功'))
    .catch((error) => console.error(error));


// 新增資料方式 - 1
// 實體化
// const testRoom = new Room({
//     name: '迪士尼雙人套房',
//     price: 2800,
//     rating: 4.2
// });

// testRoom.save()
//     .then(() => console.log('新增一筆資料'))
//     .catch(({errors}) => console.error(errors));

// 新增資料方式 - 2 (create = new + save)
// Room.create({
//     name: '迪士尼雙人套房',
//     price: 2800,
//     rating: 4.2
// })
// .then(() => console.log('新增一筆資料'))
// .catch(({errors}) => console.error(errors));


const requestListener = async (req, res) => {
    const { url, method } = req;

    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    if (url === '/rooms' && method === 'GET') {
        const rooms = await Room.find();
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            'status': 'success',
            'data': rooms
        }));
        res.end();
    } else if (url === '/rooms' && method === 'POST') {
        req.on('end', async () => {
            try {
                const { name, price, rating } = JSON.parse(body);
                const addRoom = await Room.create({ name, price, rating });
                res.writeHead(200, headers);
                res.write(JSON.stringify({
                    'status': 'success',
                    'data': addRoom
                }));
                res.end();
            } catch ({ errors }) {
                res.writeHead(400, headers);
                res.write(JSON.stringify({
                    'status': false,
                    'message': '欄位填寫錯誤或找不到此 id',
                    'error': errors
                }));
                res.end();
            }
        });
    } else if (url === '/rooms' && method === 'DELETE') {
        await Room.deleteMany({});
        const rooms = await Room.find();
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            'status': 'success',
            'data': rooms
        }));
        res.end();

    } else if (url.startsWith('/rooms/') && method === 'DELETE') {
        const id = url.split('/').pop();
        const delRoom = await Room.findByIdAndDelete(id);
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            'status': 'success',
            'data': delRoom
        }));
        res.end();
    } else if (url.startsWith('/rooms/') && method === 'PATCH') {
        req.on('end', async () => {
            try {
                const updateData = JSON.parse(body);
                const id = url.split('/').pop();
                await Room.findByIdAndUpdate(id, updateData);
                const updateRoom = await Room.findById(id);
                res.writeHead(200, headers);
                res.write(JSON.stringify({
                    'status': 'success',
                    'data': updateRoom
                }));
                res.end();
            } catch ({ errors }) {
                res.writeHead(400, headers);
                res.write(JSON.stringify({
                    'status': false,
                    'message': '欄位填寫錯誤或找不到此 id',
                    'error': errors
                }));
                res.end();
            }
        });
    } else if (method === 'OPTIONS') {
        res.writeHead(200, headers);
        res.end();
    } else {
        res.writeHead(404, headers);
        res.write(JSON.stringify({
            'status': false,
            'message': '沒有此路由頁面'
        }));
        res.end();
    }
    
};

const server = http.createServer(requestListener);
server.listen(PORT);