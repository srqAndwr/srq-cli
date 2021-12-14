const program = require('commander');

const createHelp = () => {
    program.option('-d,--dest <dest>', 'a target folder，例如:-d src/pages,错误:/src/pages');
    program.on('--help', () => {
        console.log("");
        console.log("usage");
        console.log("   srq -V");
        console.log("   srq --version");
    })
}

module.exports = createHelp;