const { stdout, stdin } = require("process");
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'destination.txt'), 'utf-8');

stdout.write('Введите текст, который хотите сохранить или введите "exit", чтобы выйти.\n')

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    stdout.write('Дополните текст, который хотите сохранить или введите "exit", чтобы выйти.\n')
    output.write(data);
  }
});

process.on('exit', () => {
  stdout.write('Введённый текст сохранён в файле destination.txt. Хорошего дня!');
})
process.on('SIGINT', () => {
  process.exit();
})
