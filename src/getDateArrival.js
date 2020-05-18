const getTimeZone = require("./getTimeZone");

/**
 * @description getting date of arrival from ticket whit local time
 * @param {object} ticket ticket of flying
 * @param {object} cities array of cities
 * @returns {object} date and time of arriving
 */
function getDateArrival(ticket, cities) {
  if (typeof ticket !== "object" || typeof cities !== "object") {
    throw new Error("non-object");
  }
  if (!(cities instanceof Array)) {
    throw new Error("non-array");
  }
  const hours = new Date(ticket.date).getHours() + Math.floor(ticket.time / 60);
  const minutes = ticket.time - Math.floor(ticket.time / 60) * 60;
  return new Date(
    new Date(ticket.date).getFullYear(),
    new Date(ticket.date).getMonth(),
    new Date(ticket.date).getDate(),
    hours - getTimeZone(ticket.from, cities) + getTimeZone(ticket.to, cities),
    new Date(ticket.date).getMinutes() + minutes
  );
}

module.exports = getDateArrival;
