const Room = require('../models/room');
const resHandle = require('../services/resHandle');

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

const rooms = {
    async getRooms ({ req, res }) {
        const rooms = await Room.find();
        resHandle(res, 200, rooms);
    },
    async createRooms ({ req, res, body }) {
        try {
            const { name, price, rating } = JSON.parse(body);
            const addRoom = await Room.create({ name, price, rating });
            resHandle(res, 200, addRoom);
        } catch ({ errors }) {
            resHandle(res, 400);
        }
    },
    async deleteRooms ({ req, res }) {
        await Room.deleteMany({});
        const rooms = await Room.find();
        console.log(rooms)
        resHandle(res, 200, rooms);
    },
    async deleteRoom ({ req, res, url }) {
        const id = url.split('/').pop();
        const delRoom = await Room.findByIdAndDelete(id);
        if (delRoom) {
            resHandle(res, 200, delRoom);
        } else {
            resHandle(res, 400);
        }
        
    },
    async editRoom ({ req, res, url, body }) {
        try {
            const updateData = JSON.parse(body);
            const id = url.split('/').pop();
            await Room.findByIdAndUpdate(id, updateData);
            const updateRoom = await Room.findById(id);

            if (updateRoom) {
                resHandle(res, 200, updateRoom);
            } else {
                resHandle(res, 400);
            }
        } catch ({ errors }) {
            resHandle(res, 400);
        }
    }

};

module.exports = rooms;