'use strict';

const rp = require('request-promise');

const fileUrl = 'https://data.texas.gov/download/cuc7-ywmd/text%2Fplain';

const requestOptions = {
  uri: fileUrl,
  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true
};

function requestFn () {
  return rp(requestOptions);
}

exports.requestFn = requestFn;
exports.requestOptions = requestOptions;
