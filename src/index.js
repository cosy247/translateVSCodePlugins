const vscode = require('vscode');
const translate = require('./translate');

// const appid = '20230822001789260';
// const salt = Date.now();
// const secret = 'OH_OM0CviQsp6B0lojc2';

// async function getTranslateData(text) {
//     http.post('https://fanyi-api.baidu.com/api/trans/vip/fieldtranslate', (res) => {
//         vscode.window.showInformationMessage(parsedData.errorMsg);
//     });
//     const Http = new XMLHttpRequest();
//     Http.open('POST', `https://fanyi-api.baidu.com/api/trans/vip/fieldtranslate`, false);
//     Http.send({
//         q: text,
//         from: 'auto',
//         to: 'zh',
//         appid,
//         salt,
//         domain: 'it',
//         sign: md5(appid + text + salt + secret),
//     });
//     return Http.responseText;
// }

module.exports = {
    init() {
        vscode.languages.registerHoverProvider('*', {
            async provideHover(document, position) {
                let text = document.getText(document.getWordRangeAtPosition(position));
                const translateData = await translate(text);
                return new vscode.Hover(translateData + '🛫🛫🛫');
            },
        });
    }
};
