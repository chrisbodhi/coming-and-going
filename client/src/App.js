import React, { Component } from 'react';

// import Northward from './Northward';
// import Southward from './Southward';
import Map from './Map';

import './App.css';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.29&libraries=places,geometry&key=${process.env.REACT_APP_GMAPS_API_KEY}`;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      markers: [
        {
          position: {
            lat: 30.265000,
            lng: -97.739258
          },
          key: `Downtown Station`,
          defaultAnimation: 4
        },
        {
          position: {
            lat: 30.262177,
            lng: -97.727505
          },
          key: `Plaza Saltillo Station`,
          defaultAnimation: 4
        }
      ],
      position: 0,
      processId: 0
    };
  }

  componentWillUpdate () {
    const noop = () => {};
    const processId = setInterval(noop, 1000);
    this.setState({ processId });
  }

  componentWillUnmount () {
    clearInterval(this.state.processId);
  }

  render () {
    console.log('this.state', this.state);
    return (
      <div className='App'>
        <Map
          loadingElement={
            <div style={{ height: `100%` }}>
              <div
                style={{
                  display: `block`,
                  width: `80px`,
                  height: `80px`,
                  margin: `150px auto`
                }}
                >
                  Loading...
                </div>
            </div>
            }
          googleMapURL={googleMapURL}
          containerElement={
            <div style={{ height: `100%` }} />
            }
          mapElement={
            <div style={{ height: `100%` }} />
            }
          markers={this.state.markers}
          />
      </div>
    );
  }
}

export default App;
