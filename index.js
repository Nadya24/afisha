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
        console.log('requesting ' + url + '...')
        let page = await request.get(url);
        await fs.writeFile(filename, page);
        return page;
    }
}

 const cheerio = require('cheerio');
(async function() {
    // console.log(await cachedGet('http://www.redom.ru/afisha/all/'));
    let page = await cachedGet('http://www.redom.ru/afisha/all/');
  
    let $ = cheerio.load(page);

   
    let events = $('.schedule tr[event-id]').map(function(i, el) {
	    let $el = $(el);
	    return {
		    title: $el.find('.schedule_name a').text().trim(),
		    place: $el.find('.schedule_place a').text().trim(),
		    place_url: $el.find('.schedule_place a').attr('href'),
	    }
    }).get();
    //console.log(events);
   
    let urls = events.map(event => 'http://www.redom.ru' + event.place_url);
    console.log(urls);
   
    let placePages = await Promise.all(urls.map(cachedGet));
	let coords = placePages.map(function (page) {
		let re = latitude
		return {
			
			latitude:page.match(re),
		//	longitude:page.match('');
		}
	})
	// latitude: 56.024642, longitude: 92.834363
	
	console.log(coords.map(p => p.latitude))
})()


