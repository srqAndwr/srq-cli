const { promisify } = require('util');
const downloadRepo = promisify(require('download-git-repo'));
const { terminalSpawn } = require('../utils/terminal');
const renderFile = require('../utils/renderEjs');
const path = require('path');
const { ouputDir,mkDir } = require('../utils/fs');
// const log = require('../utils/log');
// const open = require('open');

//create 
const createAction = async (project) => {
    console.log('srq helps you create your project, please wait a moment~');
    console.log('---------------------------------------------------------');
    //clone
    await downloadRepo('direct:https://github.com/coderwhy/hy-vue-temp.git',project,{ clone : true });
    //npm install
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await terminalSpawn(npm, ['install'], { cwd: `./${project}` });
    console.log('-----------------------');
    console.log('dependencies installed~');
    console.log('-----------------------');
    console.log("");
    console.log('-----------------------');
    console.log(`  cd ./${project}`);
    console.log('   npm run serve');
    console.log('-----------------------');
    //npm run serve
    // await terminalSpawn(npm, ['run', 'serve'], { cwd: `./${project}` });
    //打开浏览器
    // open('http://localhost:8080');
}
//addComponent
const addComponentAction = async (name,dest) => {
    //编译ejs模板
    const result = await renderFile('component.vue.ejs',{name,lowerName:name.toLowerCase()});
    // console.log(result);
    //写入到目标文件
    mkDir(dest);
    const outputPath = path.resolve(dest,`${name}.vue`);
    await ouputDir(outputPath,result);
}
//addPage
const addPageAction = async (name, dest) => {
    //编译ejs模板
    const pageResult = await renderFile('component.vue.ejs', { name, lowerName: name.toLowerCase() });
    const routerResult = await renderFile('router.vue.ejs', { name, lowerName: name.toLowerCase() });
    // console.log(routerResult);
    //写入到目标文件
    const targetDir = path.resolve(dest, name.toLowerCase());
    // console.log(targetDir);
    mkDir(targetDir);
    await ouputDir(path.resolve(targetDir,`${name}.vue`), pageResult);
    await ouputDir(path.resolve(targetDir,'router.js'), routerResult);
}

const add3PageAction = async (name, dest) => {
    //编译ejs模板
    const pageResult = await renderFile('component.vue3.ejs', { name, lowerName: name.toLowerCase() });
    const routerResult = await renderFile('router.vue3.ejs', { name, lowerName: name.toLowerCase(),dest:dest.replace('src','@') });
    // console.log(routerResult);
    //写入到目标文件
    const targetDir = path.resolve(dest, name.toLowerCase());
    const routerTargetDir = path.resolve('src/router'+dest.split('src/views')[1], name.toLowerCase());
    // console.log(targetDir);
    mkDir(targetDir);
    mkDir(routerTargetDir);
    await ouputDir(path.resolve(targetDir,`${name}.vue`), pageResult);
    await ouputDir(path.resolve(routerTargetDir,`${name}.ts`), routerResult);
}
module.exports = {
    createAction,
    addComponentAction,
    addPageAction,
    add3PageAction
}