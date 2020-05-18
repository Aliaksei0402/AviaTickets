/**
 * @description getting time zone of city
 * @param {String} city IATA code of city
 * @param {object} cities array of cities
 * @returns {Number} timezone examples: 3, -7, 10
 */

function getTimeZone(city, cities) {
  if (typeof city !== "string") {
    throw new Error("non-string");
  }
  if (typeof cities !== "object") {
    throw new Error("non-object");
  }
  if (!(cities instanceof Array)) {
    throw new Error("non-array");
  }
  let timezone = 0;
  for (let i = 0; i < cities.length; i++) {
    if (city === cities[i].IATA) {
      timezone = cities[i].timezone;
      return timezone;
    }
  }
}

module.exports = getTimeZone;
