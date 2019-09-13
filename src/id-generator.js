'use strict';

const uniqid = require('uniqid');
const uuidV4 = require('uuid').v4;
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
      return uuidV4(null, Buffer.alloc(16))
        .toString('base64')
        .replace(/\//g, '_')
        .replace(/\+/g, '-')
        .substring(0, 22); // remove '=='
    }

    return uuidV4();
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

module.exports = defaultGenerator;
