/* eslint-env browser  */
import React, { Component } from 'react';

import Map from './Map';

import './App.css';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.29&libraries=places,geometry&key=${process.env.REACT_APP_GMAPS_API_KEY}`;
const trainsURL = process.env.REACT_APP_TRAINS_URL;

const stations = [{
  position: {
    lat: 30.265002,
    lng: -97.739234,
  },
  key: 'Downtown',
  icon: 'marker.svg',
  defaultAnimation: 3,
}];

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
      position: 0,
      processId: 0
    };
  }

  componentDidMount () {
    const processId = setInterval(this._fetchData, 5000);
    this.setState({ processId });
  }

  componentWillUnmount () {
    clearInterval(this.state.processId);
  }

  _fetchData = () => {
    const processId = this.state.processId;
    fetch(trainsURL)
      .then(data => data.json())
      .then(json => this.setState({ data: [...this.state.data, json] }))
      .catch(err => {
        console.error(err);
        clearInterval(processId);
      });
  }

  render () {
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
          markers={stations}
          positions={this.state.data}
          />
      </div>
    );
  }
}

export default App;
