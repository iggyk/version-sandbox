const fs = require("fs");

const folders = fs.readdirSync('./packages/');
folders.forEach(folder => {
    const output = `console.log('${folder} says HELLO WORLD ${Math.random()}')`;
    fs.writeFileSync(`./packages/${folder}/dist/src.js`, output, 'utf-8');
});