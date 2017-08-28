'use strict';

const test = require('ava');
const moment = require('moment');

const {
  areTrainsRunning,
  isFriday,
  isSaturday,
  isWeekday,
  makeDate,
  now
} = require('./times');

// Consts used for tests
const sunday = moment().day('Sunday');
const wednesday = moment().day('Wednesday');
const friday = moment().day('Friday');
const saturday = moment().day('Saturday');
const saturdayMorn = moment()
  .day('Saturday')
  .set('hour', 6);

test('one-line helpers', (t) => {
  t.false(isWeekday(sunday));
  t.false(isFriday(sunday));
  t.false(isSaturday(sunday));
  t.false(isWeekday(saturday));

  t.true(isWeekday(wednesday));
  t.true(isWeekday(friday));
  t.true(isFriday(friday));
  t.true(isSaturday(saturday));
});

// areTrainsRunning
test('areTrainsRunning', (t) => {
  t.is(typeof areTrainsRunning, 'function', 'is not a function');
});

test('not on Sundays', (t) => {
  t.false(areTrainsRunning(sunday), 'trains don\'t run Sundays');
});

test('not on Saturday mornings, either', (t) => {
  t.false(areTrainsRunning(saturdayMorn), 'trains don\'t run Saturday mornings');
});

// makeDate
test('makeDate', (t) => {
  t.is(typeof makeDate, 'function', 'is not a function');
});

test('accepts either timestamp or Moment object', (t) => {
  const s = makeDate(1503862844000);
  const m = makeDate(now(1503862844000));
  t.is(s, m, 'did not format both number and object');
});

test('returns a date string', (t) => {
  const date = makeDate(Date.now());
  t.not(date, 'Invalid date');
});

test('formats with month name, day of month, day of week, year, time', (t) => {
  const n = makeDate(1503861193);
  t.is(n, 'Sunday, August 27, 2017 2:13 PM', 'formatting failed');
});

// now
test('now', (t) => {
  t.is(typeof now, 'function', 'is not a function');
});

test('returns a Moment object', (t) => {
  const n = now();
  t.is(typeof n, 'object', 'is not an object');
  t.true(n.hasOwnProperty('_isAMomentObject'));
  t.true(n._isAMomentObject);
});

test('now is in the US Central time zone', (t) => {
  const n = now();
  t.is(n.tz(), 'America/Chicago', 'not a central time zone');
});
