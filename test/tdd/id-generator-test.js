'use strict';

var assert = require('chai').assert;
var idGenerator = require('../../lib/id-generator');

describe('id-generator', function() {
  describe('default generator', function () {
    it('generate the IDs based on uniqid method properly', function () {
      assert.isAbove(idGenerator.getId({ type: 'uniqid' }).length, 16);
      assert.isAtMost(idGenerator.getId({ type: 'uniqid' }).length, 18);
    });
    it('generate the IDs based on base64 uuid method properly', function () {
      assert.equal(idGenerator.getId({ type: 'base64' }).length, 22);
    });
    it('generate the IDs based on default uuid method properly', function () {
      assert.lengthOf(idGenerator.getId(), 36);
    });
  });
});
