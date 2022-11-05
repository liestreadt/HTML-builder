const fs = require('fs');
const path = require('path');
const { stdout } = process;

const source = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let data = '';

source.on('data', chunk => data += chunk);
source.on('end', () => stdout.write('\n' + data));
source.on('error', (error) => console.log('Error', error.message));
