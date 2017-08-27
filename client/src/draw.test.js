/* eslint-env jest */
import draw from './draw';

it('is defined', () => {
  expect(draw).toBeDefined();
});

it('returns a number', () => {
  const output = draw();
  expect(typeof output).toBe('number');
});
