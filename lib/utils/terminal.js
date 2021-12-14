const { spawn,exec } = require('child_process');

const terminalSpawn = (...args) => {
    return new Promise((resolve, reject) => {
        try {
            const child_process = spawn(...args);
            child_process.stdout.pipe(process.stdout);
            child_process.stderr.pipe(process.stderr);
            child_process.on('close', () => {
                resolve();
            });
        } catch (error) {
            reject(error);
        }
    })
}

const terminalExec = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(stdout.replace('\n', ''));
      resolve();
    })
  })
}

module.exports = {
    terminalSpawn,
    terminalExec
}