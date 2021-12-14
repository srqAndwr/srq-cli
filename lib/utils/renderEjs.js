const { renderFile } = require('ejs');
const path = require('path');
const renderEjs = (ejsFileName,data) => {
    return new Promise((resolve, reject) => {
        const templatePath = path.resolve(__dirname, `../templates/${ejsFileName}`);
        renderFile(templatePath, { data }, (err,str) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(str);
        });
    })
}

module.exports = renderEjs;