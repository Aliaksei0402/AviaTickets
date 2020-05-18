const haversine = require("haversine");

/**
 * @description count distance betweem from and to
 * @param {object} cities array of cities
 * @param {object} namesCities array of names of cities
 * @param {String} from city from going
 * @param {String} to city to going
 * @returns {Number} distance distance betweem from and to
 */
function getDistance(cities, namesCities, from, to) {
  if (typeof cities != "object" || typeof namesCities != "object") {
    throw new Error("non-object!");
  }
  if (!(cities instanceof Array) || !(namesCities instanceof Array)) {
    throw new Error("Non-date");
  }
  if (typeof from != "string" || typeof to != "string") {
    throw new Error("non-string!");
  }
  const distance = Math.round(
    haversine(
      {
        latitude: cities[namesCities.indexOf(from)].latitude,
        longitude: cities[namesCities.indexOf(from)].longitude,
      },
      {
        latitude: cities[namesCities.indexOf(to)].latitude,
        longitude: cities[namesCities.indexOf(to)].longitude,
      }
    )
  );
  return distance;
}

module.exports = getDistance;
