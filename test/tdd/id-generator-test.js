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

  describe('multiple generators', function () {
    it('the generators are independent with each others', function () {
      var idgen1 = idGenerator.new({ type: 'uniqid' });
      var idgen2 = idGenerator.new({ type: 'base64' });
      assert.lengthOf(idGenerator.getId(), 36);
      assert.isAtMost(idgen1.getId().length, 18);
      assert.equal(idgen2.getId().length, 22);
    });
  });

  describe('static functions, properties', function () {
    it('export the uniqid & uuid libraries properly', function () {
      assert.isFunction(idGenerator.new);
      assert.isFunction(idGenerator.uniqid);
      assert.isFunction(idGenerator.uuid);
      assert.isFunction(idGenerator.uuid.v1);
      assert.isFunction(idGenerator.uuid.v4);
    })
  });
});
