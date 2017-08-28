# Coming and Going
## Server-side Component

This is a Google Cloud Function that returns the position of the currently-running trains, the 550 line on Capital Metro. It's written for the Node.js runtime.

## Development

- Get Node.js v8.4.x onto your machine.
- Install and configure the `gcloud` [CLI](https://cloud.google.com/sdk/).
- Optionally, you may install [`yarn`](https://yarnpkg.com).
- Run either `npm install` or `yarn` after cloning this repo to your machine.

### Common Tasks

_note that the commands can be invoked with `npm run` instead of `yarn`_
- `yarn call`: invokes the `trains` function
- `yarn deploy`: deploys the `trains` function
- `yarn log`: reads the logs from the `trains` function
- `yarn status`: checks the status of the `trains` function
- `yarn test`: tests all functions
- `yarn test-watch`: starting watching tests for changes

### Invoking the Function

Either run `yarn call` from the directory that contains `index.js` or visit [this url](https://us-central1-coming-and-going.cloudfunctions.net/trains) in your browser to see the JSON response.
