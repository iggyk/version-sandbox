const fs = require("fs");

const folders = fs.readdirSync('./packages/');
folders.forEach(folder => {
    fs.copyFileSync(`./packages/${folder}/package.json`, `./packages/${folder}/dist/package.json`);
});