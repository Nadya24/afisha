var assert = require('assert');
var utils = require('./utils')

describe('utils', function() {
    describe('distinct', function() {
        it('should remove dups', function() {
            assert.deepEqual(utils.distinct([1,2,3,2]), [1,2,3]);
            assert.deepEqual(utils.distinct([5,5,5]), [5]);
        });
        it('should support empty arrays', function() {
            assert.deepEqual(utils.distinct([]), []);
        });
    });

    describe('inarray', function() {
        it('should find element', function() {
            assert.equal(utils.inarray(10, [2, 10, 5]), true);
        });
        it('should find absense', function() {
            assert.equal(utils.inarray(11, [2, 10, 5]), false);
        });
    });

    describe('combine', function() {
        it('should combine things', function() {
            let res = utils.combine([
                {title: 'a', place: 'Home', place_url: '/place/12/'},
                {title: 'b', place: 'Home', place_url: '/place/12/'},
                {title: 'c', place: 'Work', place_url: '/place/42/'},
            ], ['/place/12/', '/place/42/'], [
                {latitude: 42, longitude: 15},
                {latitude: 43, longitude: 0},
            ])
            assert.deepEqual(res, [
                {title: 'a', place: 'Home', place_url: '/place/12/', latitude: 42, longitude: 15},
                {title: 'b', place: 'Home', place_url: '/place/12/', latitude: 42, longitude: 15},
                {title: 'c', place: 'Work', place_url: '/place/42/', latitude: 43, longitude: 0},
            ]);
        });
    });
});
