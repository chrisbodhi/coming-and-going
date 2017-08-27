'use strict';

const rp = require('request-promise');

const fileUrl = 'https://data.texas.gov/download/cuc7-ywmd/text%2Fplain';

const routeId = '550';

const requestOptions = {
  uri: fileUrl,
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

const isBusinessHours = () => {

}

const isSaturdayEve = () => {

}

const areTrainsRunning = () => {
  if (isBusinessHours()) return true;
  if (isSaturdayEve()) return true;
  return false;
}

const filterData = (data) => data
  .filter(e => e.vehicle.trip.route_id === routeId)
  .map(({ vehicle }) => vehicle)
  .map(({ position }) => position);

const makeDate = (timestamp) => {
  const d = new Date(timestamp * 1000);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} :: ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
};

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
function trains (req, res) {
  // note: server is running UTC time, and so is data.header.timestamp
  // todo: change to Central time
  // if request comes before or after trains are running,
  if (!areTrainsRunning()) res.status(200).json({ trains: [] })
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
}

exports.trains = trains;
