const translate = require('./src/index.js');

function activate(context) {
    translate.init();
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
