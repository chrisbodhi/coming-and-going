'use strict';

const { makeDate } = require('./times');

const routeId = '550';

const emptyResponse = (res, n) => {
  res.status(200).json({ time: makeDate(n), trains: [] });
};

const filterData = (data) => data
  .filter(e => e.vehicle.trip.route_id === routeId)
  .map(({ vehicle }) => vehicle)
  .map(({ position }) => position);

const processData = (data) => {
  const time = makeDate(data.header.timestamp);
  const trains = filterData(data.entity);
  return { time, trains };
};

const makeTrainRequest = (req, res) => {
  req()
    .then(data => {
      const { time, trains } = processData(data);
      res.status(200).json({ time, trains });
    })
    .catch(err => {
      console.error(`Request failed: ${err.message}`);
      res.status(err);
    });
};

exports.emptyResponse = emptyResponse;
exports.filterData = filterData;
exports.makeTrainRequest = makeTrainRequest;
exports.processData = processData;
