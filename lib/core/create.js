const program = require('commander');

const { createAction,addPageAction,addComponentAction,add3PageAction } = require('./actions');

const createCommods = () => {
    //创建create <project> 命令
    program
        .command('create <project>')
        .description('clone a repository from git into target folder')
        .action(createAction);
    
    program
        .command('addcpn <name>')
        .description('add a component，例如: srq addcpn NavBar [-d src/components]')
        .action((name) => {
            addComponentAction(name, program.opts().dest || 'src/components');
        });
    
    program
        .command('addpage <name>')
        .description('add a page and router-config，例如：srq addpage Login [-d src/pages]')
        .action((name) => {
            addPageAction(name, program.opts().dest || 'src/pages');
        });
    
    program
        .command('add3page <name>')
        .description('add a vue3page and router-config，例如：srq add3page Login,默认将page添加到views中')
        .action((name) => {
            console.log('11');
            add3PageAction(name, program.opts().dest || 'src/views');
            console.log('2');
        });
}

module.exports = createCommods;