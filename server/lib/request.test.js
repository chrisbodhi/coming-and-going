'use strict';

const test = require('ava');

const { requestFn, requestOptions } = require('./request');

test('`requestFn` is a function', (t) => {
  t.is(typeof requestFn, 'function', 'is not a function');
});

test('requests ask for JSON', (t) => {
  t.true(requestOptions.json, 'not asking for JSON');
});
