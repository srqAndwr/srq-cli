#!/usr/bin/env node
const program = require('commander');
const packageJson = require('./package.json');
const creatHelp = require('./lib/core/help');
const createCommods = require('./lib/core/create');

program.version(packageJson.version);


creatHelp();
createCommods();
process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
});

program.parse(process.argv);

