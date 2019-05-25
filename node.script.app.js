const { exec } = require('child_process');

exec('npm run test', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
