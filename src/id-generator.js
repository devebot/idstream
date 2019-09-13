'use strict';

const uniqid = require('uniqid');
const uuid = require('uuid');
const Buffer = global.Buffer || require('buffer').Buffer;

function IdGenerator (kwargs = {}) {
  let defaultType = kwargs.type;

  this.getId = function(opts = {}) {
    if (typeof opts === 'string') {
      opts = { type: opts };
    }
    const type = opts.type || defaultType;

    if (type === 'uniqid') {
      return uniqid();
    }

    if (type === 'base64') {
      return uuid.v4(null, Buffer.alloc(16))
        .toString('base64')
        .replace(/\//g, '_')
        .replace(/\+/g, '-')
        .substring(0, 22); // remove '=='
    }

    return uuid.v4();
  }

  this.setType = function (newType) {
    if (newType === null) {
      defaultType = newType;
    }
    if (['uniqid', 'base64', 'uuid'].indexOf(newType) >= 0) {
      defaultType = newType;
    }
    return this;
  }

  this.reset = function () {
    defaultType = kwargs.type;
    return this;
  }
}

const defaultGenerator = new IdGenerator();

Object.defineProperties(defaultGenerator, {
  new: {
    get: function() {
      return function (kwargs) {
        return new IdGenerator(kwargs);
      }
    },
    set: function(value) {}
  }
});

defaultGenerator.uniqid = uniqid;
defaultGenerator.uuid = uuid;

module.exports = defaultGenerator;
