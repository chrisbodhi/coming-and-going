'use strict';

const test = require('ava');
const {
  emptyResponse,
  filterData,
  processData
} = require('./helpers');

// Mocks and Consts
class Res {
  status (code) {
    this.status = code;
    return this;
  }

  json (j) {
    const s = JSON.stringify(j);
    this.json = s;
    return s;
  }
}

const buildResponse = () => {
  const r = new Res();
  emptyResponse(r, ts);
  return r;
};

const ts = 1503862844000;

test('emptyResponse notes a 200 status code', (t) => {
  const r = buildResponse();
  t.is(r.status, 200, 'did not get a 200 status code');
});

test('emptyResponse sends an empty array', (t) => {
  const r = buildResponse();
  const j = JSON.parse(r.json);
  t.deepEqual(j.trains, [], 'did not send an empty array');
});

test('filterData returns an array with an empty input', (t) => {
  const d = [];
  const a = filterData(d);
  t.true(Array.isArray(a), 'is not an array');
});

test('processData returns an object with `time` and `trains` keys', (t) => {
  const d = {
    header: {timestamp: ts},
    entity: []
  };
  const p = processData(d);
  const keys = Object.keys(p);
  t.true(keys.includes('time'), 'does not contain `time` key');
  t.true(keys.includes('trains'), 'does not contain `trains` key');
});
