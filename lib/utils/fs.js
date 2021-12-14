const fs = require('fs');
const path = require('path');

//递归创建文件夹
const mkDir = (pathName) => {
    if (fs.existsSync(pathName)) {
        return true;
    } else{
        if (mkDir(path.dirname(pathName))) {
            fs.mkdirSync(pathName);
            return true;
        }
    }
}

const ouputDir = (path, content) => {
    if (fs.existsSync(path)) {
        console.log('this file already exit~');
        return;
    }
    return fs.promises.writeFile(path, content);
}

module.exports = { mkDir, ouputDir };