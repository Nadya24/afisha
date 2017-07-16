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
        if (a == item) {
            return true;
        }
    }
    return false;
}
