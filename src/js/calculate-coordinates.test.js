import { assert } from 'chai';
import calculateCord from './calculate-coordinates';

describe('Calculating function', () => {
  it('should return correct coordinates', () => {
    assert.equal(12, calculateCord(12, 1, 0.5));
    assert.equal(60, calculateCord(122, 2, 1.5));
  });

  it('should return NaN, if parameter is incorrect', () => {
    assert.equal(true, isNaN(calculateCord(12, 'asdd', 0.5)));
  });

  it('should return NaN, if there are less parameters, than expected', () => {
    assert.equal(true, isNaN(calculateCord(12)));
  });
});
