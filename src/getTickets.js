const getRandomNumber = (a, b) => Math.round(Math.random() * (b - a) + a);
const cities = ["LON", "LAX", "MSQ", "MOW", "VVO", "RIO", "FRA"];
const companies = ["B2", "SU", "AA", "BA", "AD", "XF"];

/**
 * @description artificial getting tickets
 * @param {Number} n quantity of tickets you need
 * @returns {object} tickets array of tickets
 */

function getTickets(n) {
  let tickets = [];
  const citLen = cities.length;
  const comp = companies.length;
  for (let i = 0; i < n; i++) {
    const ticket = {
      from: cities[getRandomNumber(0, citLen - 1)],
      to: cities[getRandomNumber(0, citLen - 1)],
      company: companies[getRandomNumber(0, comp - 1)],
      date: `2020-${getRandomNumber(1, 12)}-${getRandomNumber(
        1,
        31
      )} ${getRandomNumber(0, 23)}:${getRandomNumber(10, 59)}`,
      time: getRandomNumber(120, 1200),
      price: getRandomNumber(100, 1000),
    };
    if (ticket.from !== ticket.to) {
      tickets.push(ticket);
    }
  }
  return tickets;
}

module.exports = getTickets;
