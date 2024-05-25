function randomDecimal(low, high) {
    return Math.random() * (high - low) + low;
}

function randomInteger(low, high) {
    return Math.floor(randomDecimal(low,high));
}

function randomColor() {
    return `rgb(${randomInteger(0, 256)}, ${randomInteger(0, 256)}, ${randomInteger(0, 256)})`;
}

function constrain(val, low, high) {
    if (val < low) {
      return low;
    } else if (val > high) {
      return high;
    } else {
      return val;
    }
}