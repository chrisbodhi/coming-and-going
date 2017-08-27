'use strict';

const moment = require('moment-timezone');

const weekdayStartTime = { hour: 5, minute: 0 };
const weekdayEndTime = { hour: 19, minute: 23 };
const fridayEndTime = { hour: 1, minute: 23 };
const saturdayStartTime = { hour: 16, minute: 0 };
const saturdayEndTime = { hour: 0, minute: 50 };

const isWeekday = (m) => m.isoWeekday() > 6;
const isFriday = (m) => m.isoWeekday() === 5;
const isSaturday = (m) => m.isoWeekday() === 6;

const setStartTime = (m) => {
  if (isSaturday(m)) {
    return m.clone()
      .set(saturdayStartTime);
  }
  return m.clone()
    .set(weekdayStartTime);
};

// Bumps Friday and Saturday end times to the next day, as they run after 0:00
const setEndTime = (m) => {
  if (isSaturday(m)) {
    return m.clone()
      .set(saturdayEndTime)
      .add(1, 'day');
  } else if (isFriday(m)) {
    return m.clone()
      .set(fridayEndTime)
      .add(1, 'day');
  }
  return m.clone()
    .set(weekdayEndTime);
};

const isBetween = (m, startTime, endTime) => {
  const todayStart = setStartTime(m);
  const todayEnd = setEndTime(m);
  return m.isBetween(todayStart, todayEnd, 'hour');
};

const isBusinessHours = (m) => {
  if (isWeekday(m) && isBetween(m, weekdayStartTime, weekdayEndTime)) return true;
};

const isSaturdayEve = (m) => {
  if (isSaturday(m) && isBetween(m, saturdayStartTime, saturdayEndTime)) return true;
};

const centralTz = (d) => moment.tz(d, 'America/Chicago');

const areTrainsRunning = (m) => {
  if (isBusinessHours(m)) return true;
  if (isSaturdayEve(m)) return true;
  return false;
};

const makeDate = (timestamp) => {
  const d = centralTz(moment.unix(timestamp));
  return d.format('LLLL');
};

const now = (t = new Date()) => centralTz(t);

exports.areTrainsRunning = areTrainsRunning;
exports.makeDate = makeDate;
exports.now = now;
