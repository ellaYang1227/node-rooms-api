const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});
const { DATABASE, DATA_PASSWORD } = process.env;
const DB = DATABASE.replace('<password>', DATA_PASSWORD);

const mongoose = require('mongoose');
// 連接資料庫 mongodb://127.0.0.1:27017/<資料庫名稱> => mongodb://127.0.0.1:27017/hotel
// 連接資料庫 mongodb+srv://ella:<password>@cluster0.p6pkmbb.mongodb.net/<databaseName>?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(DB)
    .then(() => console.log('連接資料庫成功'))
    .catch((error) => console.error(error));