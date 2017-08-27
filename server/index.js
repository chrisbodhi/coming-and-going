'use strict';

const rp = require('request-promise');

const {
  areTrainsRunning,
  makeDate,
  now
} = require('./lib/times');

const fileUrl = 'https://data.texas.gov/download/cuc7-ywmd/text%2Fplain';

const routeId = '550';

const requestOptions = {
  uri: fileUrl,
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

const filterData = (data) => data
  .filter(e => e.vehicle.trip.route_id === routeId)
  .map(({ vehicle }) => vehicle)
  .map(({ position }) => position);

// Present time, defined outside of `trains` function
// definition to make it nicer to test
const n = now();

/**
 * Trains returns information about the running trains to the client
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
function trains (req, res) {
  if (areTrainsRunning(n)) {
    rp(requestOptions)
      .then(function (data) {
        const time = makeDate(data.header.timestamp);
        console.log('Data time:', time);

        const trains = filterData(data.entity);

        res.status(200).json({ time, trains });
      })
      .catch(function (err) {
        console.error(`Request failed (${err.statusCode}): ${err.message}`);
        res.status(err);
      });
  } else {
    res.status(200).json({ trains: [] });
  }
}

exports.trains = trains;
