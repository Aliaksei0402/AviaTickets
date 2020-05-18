/**
 * @description getting time devided ino days, hours and minutes
 * @param {Number} minutes quantity of minutes
 * @returns {String} example: 10 days 7 hours 36 minutes
 */

function getHours(minutes) {
  if (typeof minutes !== "number") {
    throw new Error("non-number");
  }
  if (minutes < 0) {
    throw new Error("< 0");
  }
  if (minutes < 60) {
    return `${Math.ceil(minutes)} minutes`;
  }
  if (minutes <= 1440) {
    const h = Math.floor(minutes / 60);
    const m = minutes - h * 60;
    if (m === 0) {
      return `${h} hours`;
    }
    return `${h} hours ${Math.ceil(m)} minutes`;
  }
  const days = Math.floor(minutes / 24 / 60);
  const hours = Math.floor((minutes - days * 24 * 60) / 60);
  const min = Math.floor(minutes - days * 24 * 60 - hours * 60);
  if (hours === 0) {
    return `${days} days ${min} minutes`;
  }
  if (min === 0) {
    return `${days} days ${hours} hours`;
  }
  return `${days} days ${hours} hours ${min} minutes`;
}

module.exports = getHours;
