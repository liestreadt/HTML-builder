const path = require('path');
const { readdir } = require('fs/promises');
const { stat } = require('fs');

(async function () {
    const files = await readdir(path.join(__dirname, './secret-folder'), {
      withFileTypes: true,
    });

    for (let file of files) {
      if (file.isFile()) {
        const filePath = path.join(__dirname, './secret-folder', file.name);
        const fileExt = path.extname(filePath);
        stat(filePath, (err, stats) => {
          console.log(`${file.name.replace(fileExt, '')} - ${fileExt.replace('.', '')} - ${(stats.size / 1024).toFixed(2)}Kb`);
        })
      }
    }
})();
