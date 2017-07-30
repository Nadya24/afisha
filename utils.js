exports.distinct = function (array) {
    let result = [];
    for (let a of array) {
        if (exports.inarray(a,result) == false) {
            result.push(a);
        }
    }
    return result;
}


exports.inarray = function (item, array) {
    for (let a of array) {
        if (a == item) return true;
    }
    return false;
}


exports.combine = function(events, distinctUrls, coords) {
    for (let event of events) {
        //  console.log(event.place_url, distinctUrls.indexOf(event.place_url))
        // event.latitude =
        let index = distinctUrls.indexOf(event.place_url);
        event.latitude = coords[index].latitude;
        event.longitude = coords[index].longitude;
    }
    return(events);
}

// let res = utils.combine([
//     {title: 'a', place: 'Home', place_url: '/place/12/'},
//     {title: 'b', place: 'Home', place_url: '/place/12/'},
//     {title: 'c', place: 'Work', place_url: '/place/42/'},
// ],
// ['/place/12/', '/place/42/'],
// [
//     {latitude: 42, longitude: 15},
//     {latitude: 43, longitude: 0},
// ])
