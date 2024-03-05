const mongoose = require('mongoose');
// const roomSchema = {
//     name: {
//         type: String,
//         required: [true, '名稱必填']
//     },
//     price: {
//         type: Number,
//         required: [true, '價格必填']
//     },
//     rating: Number
// };
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '名稱必填']
    },
    price: {
        type: Number,
        required: [true, '價格必填']
    },
    rating: Number,
    // 自訂義 createdAt 建立時間作法
    createdAt: {
        type: Date,
        default: Date.now,
        select: false // 隱藏不會回傳至前端
    }
}, {
    // 移除欄位 __v 方法
    versionKey: false,
    // collection 固定名稱，後面不加上 s 方法
    // collection: 'room'
    // 新增 createdAt 建立時間作法
    // timestamps: true
});

// mongoose 會自動將名稱開頭轉為小寫並強制在結尾加 s：如 Room => rooms
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;