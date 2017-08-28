'use strict';

const {
  emptyResponse,
  makeTrainRequest
} = require('./lib/helpers');
const {
  areTrainsRunning,
  now
} = require('./lib/times');
const { requestFn } = require('./lib/request');

// Present time, defined outside of `trains` function
// definition to make it all nicer to test
const n = now();

/**
 * Trains returns information about the running trains to the client
 *
 * Does not execute request to outside service if trains
 * are known to not be running, i.e. on Sundays
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
function index (req, res) {
  areTrainsRunning(n)
    ? makeTrainRequest(requestFn, res)
    : emptyResponse(res, n);
}

exports.trains = index;
