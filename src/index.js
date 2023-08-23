const vscode = require('vscode');
const DICTQuery = require('./query');
const formatter = require('./format');
const md5 = require('./md5');


const markdownHeader = `翻译 \`$word\` :  
`;
const markdownFooter = `  
`;
const markdownLine = `  
*****
`;

const genMarkdown = function (word, translation, p) {
    if (!translation && !p) {
        return `- [${word}](https://translate.google.com?text=${word}) :  
本地词库暂无结果 , 查看 [Google翻译](https://translate.google.com?text=${word}) [百度翻译](https://fanyi.baidu.com/#en/zh/${word})`;
    }
    return `- [${word}](https://translate.google.com?text=${word}) ${p ? '*/' + p + '/*' : ''}:  
${translation.replace(
    /\\n/g,
    `  
`
)}`;
};

const appid = '20230822001789260';
const salt = Date.now();
const secret = OH_OM0CviQsp6B0lojc2;

function getSign(text) {
    return md5(appid + text + salt + secret);
}

async function  getTranslateData(text) {
    const Http = new XMLHttpRequest();
    Http.open('POST', `https://fanyi-api.baidu.com/api/trans/vip/fieldtranslate`, false);
    Http.send({
        q: text,
        from: 'auto',
        to: 'zh',
        appid,
        salt,
        domain: 'it',
        sign: getSign(text),
    });
    return Http.responseText;
}

async function init() {
    vscode.languages.registerHoverProvider('*', {
        async provideHover(document, position) {
            // if (!document.getWordRangeAtPosition(position)) {
            //     return;
            // }
            
            // test
            let text = document.getText(document.getWordRangeAtPosition(position));
            // const translateData = await getTranslateData(word);
            // let selectText = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
            // if (selectText && word.indexOf(selectText) > -1) {
            //     word = selectText;
            // }
            // let originText = formatter.cleanWord(word);
            // let words = formatter.getWordArray(formatter.cleanWord(word));
            // let hoverText = '';
            // for (let i = 0; i < words.length; i++) {
            //     let _w = words[i];
            //     let ret = await DICTQuery(_w);
            //     if (i == 0) {
            //         hoverText += genMarkdown(_w, ret.w, ret.p);
            //     } else {
            //         hoverText += markdownLine + genMarkdown(_w, ret.w, ret.p);
            //     }
            // }

            // const header = markdownHeader.replace('$word', originText);
            // hoverText = header + hoverText + markdownFooter;
            // console.log(word, translateData);
            return new vscode.Hover(text + '🛫🛫🛫');
        },
    });
}

module.exports = {
    init,
};
