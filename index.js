const Promise = require('bluebird');
const request = require('request-promise');
const _fs = require('fs');
const fs = {
    readFile: Promise.promisify(_fs.readFile),
    writeFile: Promise.promisify(_fs.writeFile),
}
const querystring = require('querystring');


async function cachedGet(url) {
    let filename = 'page-cache/' + querystring.escape(url);
    try {
        return await fs.readFile(filename, 'utf-8')
        // return await fs.readFile('page-cache/123' , 'utf-8');
    } catch (e) {
        console.log('hey')
        let page = await request.get(url);
        await fs.writeFile(filename, page);
        return page;
    }
}

(async function() {
    console.log(await cachedGet('http://www.redom.ru/afisha/all/'));
})()

