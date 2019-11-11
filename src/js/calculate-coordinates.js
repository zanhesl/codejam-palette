function calculateCord(cord, pixelSize, mathError) {
  return Math.round(cord / pixelSize - mathError);
}

export default calculateCord;
