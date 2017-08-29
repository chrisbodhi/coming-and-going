/* eslint-env jest */

import {
  addOriginPos,
  downtownLatLng,
  latLng,
  lineData
} from './Map';

// props.positions contains many `data`
const trains = [
  {
    latitude: 30.2651119,
    longitude: -97.7394562,
    bearing: 285,
    odometer: 0,
    speed: 0
  },
  {
    latitude: 30,
    longitude: -97,
    bearing: 85,
    odometer: 0,
    speed: 10
  }
];

const finalData = [
  [
    downtownLatLng,
    {
      lat: 30.2651119,
      lng: -97.7394562
    }
  ],
  [
    downtownLatLng,
    {
      lat: 30,
      lng: -97
    }
  ]
];

const latLngData = latLng(trains);
const originData = addOriginPos(latLngData);
// goal: get tuples of train pos & downtown station
const lineDataData = lineData(trains);

describe('latLng', () => {
  it('returns an array', () => {
    expect(Array.isArray(latLngData)).toBe(true);
  });

  it('the array contains objects of lat/long', () => {
    latLngData.forEach((elem) => {
      const keys = Object.keys(elem);
      expect(keys.includes('lat')).toBe(true);
      expect(keys.includes('lng')).toBe(true);
    });
  });
});

describe('addOriginPos', () => {
  it('returns an array', () => {
    expect(Array.isArray(originData)).toBe(true);
  });

  it('returns an array of length two', () => {
    expect(originData.length).toBe(2);
  });

  it('the first element is the downtown station', () => {
    originData.forEach(d => {
      expect(d[0]).toEqual(downtownLatLng);
    });
  });
});

describe('lineData', () => {
  it('returns tuples of train and downtown coordinates', () => {
    expect(lineDataData).toEqual(finalData);
  });
  it('returns the same data as addOriginPos', () => {
    expect(lineDataData).toEqual(originData);
  });
});
