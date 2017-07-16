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
});
