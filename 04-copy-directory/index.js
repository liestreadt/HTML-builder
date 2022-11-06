const path = require('path');
const { readdir, mkdir, copyFile, rm } = require('fs/promises');

(async function copyDir() {

  await rm(path.join(__dirname, './files-copy'), {
    recursive: true, force: true,
  });
  await mkdir(path.join(__dirname, './files-copy'), {
    recursive: true,
  });

  const files = await readdir(path.join(__dirname, './files'), {
    withFileTypes: true,
  });

  files.forEach(file => {
    const filePath = path.join(__dirname, './files', file.name);
    const newFilePath = path.join(__dirname, './files-copy', file.name);
    copyFile(filePath, newFilePath);
  })

  console.log('Files copied to foler "files-copy"');

})();

