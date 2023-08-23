const http = require('http');
const https = require('https');

let lastRequestTime = 0;
http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    const text = decodeURI(req.url).slice(1);
	if(text == '') {
        res.end('');
	}else if (text == 'favicon.ico') {
        res.end('网站图标.ico');
    } else {
        const nowTime = Date.now();
        if (nowTime - lastRequestTime > 1000) {
            lastRequestTime = nowTime;
            getTranslate(text).then((data) => {
                res.end(data);
            });
        } else {
            res.end('一秒一次!');
        }
    }
}).listen('4500', () => {});

function getTranslate(text) {
    return new Promise((resolve, reject) => {
        const nowTime = Date.now();
        if (nowTime - lastRequestTime > 1000) {
            https
                .get(`https://translate.appworlds.cn?text=${text}&from=auto&to=en`, (res) => {
                    let list = [];
                    res.on('data', (chunk) => {
                        list.push(chunk);
                    });
                    res.on('end', () => {
                        resolve(Buffer.concat(list).toString());
                    });
                })
                .on('error', (err) => {
                    reject(err);
                });
        } else {
            resolve('太快了~');
        }
    });
}

const pattern = new RegExp("[\u4E00-\u9FA5]+");
module.exports = (text) => {
    return new Promise((resolve, reject) => {
        const nowTime = Date.now();
        if (nowTime - lastRequestTime > 1000) {
            https
                .get(`https://translate.appworlds.cn?text=${text}&from=auto&to=${pattern.test(str) ? 'en' : 'ch'}`, (res) => {
                    let list = [];
                    res.on('data', (chunk) => {
                        list.push(chunk);
                    });
                    res.on('end', () => {
                        resolve(Buffer.concat(list).toString());
                    });
                })
                .on('error', (err) => {
                    reject(err);
                });
        } else {
            resolve('太快了~');
        }
    });
}
