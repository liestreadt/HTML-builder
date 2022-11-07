const path = require('path');
const fs = require('fs');
const { rm, readdir, mkdir, copyFile, readFile, writeFile} = require('fs/promises');

const projectPath = path.join(__dirname, './project-dist');
const assetsOriginPath = path.join(__dirname, './assets');
const stylesOriginPath = path.join(__dirname, './styles');
const templateOriginPath = path.join(__dirname, './template.html');
const componentsOriginPath = path.join(__dirname, './components');

async function createCssBundle(stylesPath, distPath) {
  const files = await readdir(stylesPath, {
    withFileTypes: true,
  });
  const outputBundle = fs.createWriteStream(path.join(distPath, './style.css'));

  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const inputData = fs.createReadStream(path.join(stylesPath, file.name), 'utf-8');
      inputData.on('data', data => {
        outputBundle.write(data)
      })
    }
  })
};

async function createHtmlBundle(template, components, distPath) {
  const inputTemplate = await readFile(template, 'utf-8');
  const inputTemplateItems = inputTemplate.match(/{{[-.\w]+}}/gi);
  let resultHTML = inputTemplate;

  if (inputTemplateItems) {
    for await (let item of inputTemplateItems) {
      const comp = `${item.replace('{{', '').replace('}}', '')}.html`;
      const compHTML = await readFile(path.join(components, comp), 'utf-8');
      resultHTML = resultHTML.replace(item, compHTML);
    }
  }

  await writeFile(path.join(distPath, 'index.html'), resultHTML);
};

async function copyDir(originPath, distPath) {
  await rm(distPath, {
    recursive: true, force: true,
  });
  await mkdir(distPath, {
    recursive: true,
  });

  const items = await readdir(originPath, {
    withFileTypes: true,
  });

  items.forEach(item => {
    if (item.isDirectory()) {
      copyDir(
        path.join(originPath, item.name),
        path.join(distPath, item.name)
      );
    }
    if (item.isFile()) {
      copyFile(
        path.join(originPath, item.name),
        path.join(distPath, item.name)
      )
    }
  })
};

(async function createProject() {
  await copyDir(assetsOriginPath, path.join(projectPath, './assets'));
  await createCssBundle(stylesOriginPath, projectPath);
  await createHtmlBundle(templateOriginPath, componentsOriginPath, projectPath);
})();
