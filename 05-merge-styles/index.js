const path = require('path');
const fs = require('fs');
const { readdir} = require('fs/promises');

const stylesPath = path.join(__dirname, './styles');

(async () => {

  const files = await readdir(stylesPath, {
    withFileTypes: true,
  });

  const outputBundle = fs.createWriteStream(path.join(__dirname, './project-dist/bundle.css'));

  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const inputData = fs.createReadStream(path.join(stylesPath, file.name), 'utf-8');
      inputData.on('data', data => {
        outputBundle.write(data)
      })
    }
  })

})();
