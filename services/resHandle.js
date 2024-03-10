const headers = require('./headers');

function resHandle(res, statusCode, data) {
    let resData;

    switch (statusCode) {
    case 200:
        resData = {
            "status": "success",
            data
        };
        break;
    case 400:
    case 404:
        resData = {
            "status": false,
            "message": statusCode === 400 ? '欄位填寫錯誤或找不到此 id' : '找不到此路由頁面'
        };
        break;
    }

    res.writeHead(statusCode, headers);
    res.write(JSON.stringify(resData));
    res.end();
}

module.exports = resHandle;