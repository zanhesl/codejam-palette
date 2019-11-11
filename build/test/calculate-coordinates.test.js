'use strict';

var chai = require('chai');

function calculateCord(cord, pixelSize, mathError) {
  return Math.round(cord / pixelSize - mathError);
}

describe('Calculating function', () => {
  it('should return 0', () => {
    chai.assert.equal(12, calculateCord(12, 1, 0.5));
    chai.assert.equal(60, calculateCord(122, 2, 1.5));
  });

  it('should return NaN, if parameter is incorrect', () => {
    chai.assert.equal(true, isNaN(calculateCord(12, 'asdd', 0.5)));
  });

  it('should return NaN, if there are less parameters, than expected', () => {
    chai.assert.equal(true, isNaN(calculateCord(12)));
  });
});
