const getDateArrival = require("./getDateArrival");
const getDistance = require("./getDistance");
const getHours = require("./getHours");

/** Class working with flying, whick  */
class Transfer {
  /**
   * @param {String} from name city from going
   * @param {String} to name city to going
   * @param {String} date entered to input date
   * @param {object} cities array of cities
   * @param {object} tickets array of tickets
   * @param {object} avialines array of avialines
   * @param {String} codeFrom IATA code of from
   * @param {String} codeTo IATA code of to
   * @param {object} namesCities array of names cities
   */
  constructor(from, to, date, cities, tickets, avialines, codeFrom, codeTo) {
    this.from = from;
    this.to = to;
    this.date = date;
    this.cities = cities;
    this.tickets = tickets;
    this.avialines = avialines;
    this.codeFrom = codeFrom;
    this.codeTo = codeTo;
    this.namesCities = this.cities.map((item) => item.city);
  }

  /**
   * @description getting first ticket of flying with transfer
   */
  getFirstCity() {
    let firstTickets = [];
    for (let i = 0; i < this.tickets.length; i++) {
      if (
        this.codeFrom === this.tickets[i].from &&
        new Date(this.date).toLocaleDateString() ===
          new Date(this.tickets[i].date).toLocaleDateString()
      ) {
        firstTickets.push(this.tickets[i]);
      }
    }
    if (firstTickets.length !== 0) {
      this.getSecondCity(firstTickets);
      this.getSecondCityTwoTransfers(firstTickets);
    } else {
      this.drawingNoTickets();
    }
  }

  /**
   * @description getting message about no tickets with transfers
   */
  drawingNoTickets() {
    const tickets = document.getElementById("tickets");
    tickets.innerText = "";
    tickets.insertAdjacentHTML(
      "beforeend",
      ` <div class="alert alert-warning">
        <div class="noTickets">
          <h2>Билеты не найдены</h2>
          <h4>Извините, в этот день у Вас не получится улететь...</h4>
          <h6>Попробуйте поискать билеты в другие дни</h6>
        </div>
    </div>`
    );
  }

  /**
   * @description getting second tickets of flyings with tranfers
   * @param {object} tickets array of first tickets of flying with transfers
   */
  getSecondCity(tickets) {
    const fortyMinutes = 40 * 60 * 1000;
    const thirtyHours = 30 * 60 * 60 * 1000;
    for (let i = 0; i < tickets.length; i++) {
      for (let j = 0; j < this.tickets.length; j++) {
        if (
          this.codeTo === this.tickets[j].to &&
          this.codeFrom !== this.tickets[j].from &&
          tickets[i].to === this.tickets[j].from &&
          new Date(
            getDateArrival(tickets[i], this.cities).getTime() + fortyMinutes
          ) <= new Date(new Date(this.tickets[j].date).getTime()) &&
          new Date(
            getDateArrival(tickets[i], this.cities).getTime() + thirtyHours
          ) >= new Date(new Date(this.tickets[j].date).getTime())
        ) {
          this.drawingTicket(tickets[i], this.tickets[j]);
        }
      }
    }
  }

  /**
   * @description getting HTML-block of flying with 1 transfer (full ticket)
   * @param {object} firstTicket object with all information about first flying
   * @param {object} secondTicket object with all information about second flying
   */
  drawingTicket(firstTicket, secondTicket) {
    let firstAvialine = {};
    let secondAvialine = {};
    let transferCity = "";
    for (let i = 0; i < this.cities.length; i++) {
      if (firstTicket.to === this.cities[i].IATA) {
        transferCity = this.cities[i].city;
      }
    }
    for (let i = 0; i < this.avialines.length; i++) {
      if (firstTicket.company === this.avialines[i].IATA) {
        firstAvialine = this.avialines[i];
      }
    }
    for (let i = 0; i < this.avialines.length; i++) {
      if (secondTicket.company === this.avialines[i].IATA) {
        secondAvialine = this.avialines[i];
      }
    }
    const tickets = document.getElementById("tickets");
    tickets.insertAdjacentHTML(
      "beforeend",
      `<div class="ticket">
      <div class="buyTicket">
        <button class="buy btn btn-primary btn-lg" type="button">
          Купить за <br />
          $${firstTicket.price + secondTicket.price}
        </button>
      </div>

      <div class="infoFlying">
        <div class="company">
          <a class="logo" target="_blank" href="${firstAvialine.web}">
            <img src="${firstAvialine.logo}" title="${
        firstAvialine.name
      }" width="250" />
          </a>
          <a class="logo" target="_blank" href="${secondAvialine.web}">
            <img src="${secondAvialine.logo}" title="${
        secondAvialine.name
      }" width="250" />
          </a>
        </div>
        <div class="infoTicket">
          <div class="from-to">
            <div class="city">
              <span>${this.from}</span>
              <p class="time">${new Date(firstTicket.date)
                .toLocaleTimeString()
                .slice(0, 5)}</p>
              <p class="date"> ${new Date(
                firstTicket.date
              ).toLocaleDateString()}</p>
            </div>
            <div class="dottedBlock">
              <p>${getDistance(
                this.cities,
                this.namesCities,
                this.from,
                transferCity
              )} km</p>
              <p class="dottedLine">${getHours(firstTicket.time)}</p>
            </div>
            <div class="city">
              <span>${transferCity}</span>
              <div class="infoTransfer waiting">
                <div>
                  <p>Arrival</p>
                  <p>${getDateArrival(firstTicket, this.cities)
                    .toLocaleTimeString()
                    .slice(0, 5)}</p>
                  <p>${getDateArrival(
                    firstTicket,
                    this.cities
                  ).toLocaleDateString()}</p>
                </div>
                <div>
                  <p>Waiting</p>
                  <p>${getHours(
                    new Date(
                      new Date(secondTicket.date) -
                        getDateArrival(firstTicket, this.cities).getTime()
                    ) /
                      1000 /
                      60
                  )}
                </div>
                <div>
                  <p>Departure</p>
                  <p>${new Date(secondTicket.date)
                    .toLocaleTimeString()
                    .slice(0, 5)}</p>
                  <p>${new Date(secondTicket.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div class="dottedBlock">
              <p>${getDistance(
                this.cities,
                this.namesCities,
                transferCity,
                this.to
              )} km</p>
              <p class="dottedLine">${getHours(secondTicket.time)}</p>
            </div>
            <div class="city">
              <span>${this.to}</span>
              <p class="time">
              ${getDateArrival(secondTicket, this.cities)
                .toLocaleTimeString()
                .slice(0, 5)}
              </p>
              <p class="date">
              ${getDateArrival(secondTicket, this.cities).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>`
    );
  }

  /**
   * @description getting first transfer-city of flying with 2 transfers
   * @param {object} tickets array of first tickets in flying with 2 transfers
   */
  getSecondCityTwoTransfers(tickets) {
    const fortyMinutes = 40 * 60 * 1000;
    const thirtyHours = 30 * 60 * 60 * 1000;
    let secondTickets = [];
    for (let i = 0; i < tickets.length; i++) {
      for (let j = 0; j < this.tickets.length; j++) {
        if (
          this.tickets[j].to !== this.codeTo &&
          tickets[i].to === this.tickets[j].from &&
          new Date(
            getDateArrival(tickets[i], this.cities).getTime() + fortyMinutes
          ) <= new Date(new Date(this.tickets[j].date).getTime()) &&
          new Date(
            getDateArrival(tickets[i], this.cities).getTime() + thirtyHours
          ) >= new Date(new Date(this.tickets[j].date).getTime())
        ) {
          secondTickets.push([tickets[i], this.tickets[j]]);
        }
      }
    }
    if (secondTickets.length !== 0) {
      this.getThirdCity(secondTickets);
    } else {
      this.drawingNoTickets();
    }
  }

  /**
   * @description getting second transfer-city of flying with 2 transfers
   * @param {object} secondTickets array of first and second tickets in flying with 2 transfers
   */
  getThirdCity(secondTickets) {
    const fortyMinutes = 40 * 60 * 1000;
    const thirtyHours = 30 * 60 * 60 * 1000;
    let s = 0;
    for (let i = 0; i < secondTickets.length; i++) {
      for (let j = 0; j < this.tickets.length; j++) {
        if (
          secondTickets[i][1].to === this.tickets[j].from &&
          this.codeTo === this.tickets[j].to &&
          this.codeFrom !== this.tickets[j].from &&
          new Date(
            getDateArrival(secondTickets[i][1], this.cities).getTime() +
              fortyMinutes
          ) <= new Date(new Date(this.tickets[j].date).getTime()) &&
          new Date(
            getDateArrival(secondTickets[i][1], this.cities).getTime() +
              thirtyHours
          ) >= new Date(new Date(this.tickets[j].date).getTime())
        ) {
          this.drawingTicketsTwoTransfers(
            secondTickets[i][0],
            secondTickets[i][1],
            this.tickets[j]
          );
          s++;
        }
      }
    }
    if (s === 0) {
      this.drawingNoTickets();
    }
  }

  /**
   * @description getting HTML-block of flying with 2 transfers (full ticket)
   * @param {object} firstTicket first ticket of flying with 2 transfers
   * @param {object} secondTicket second ticket of flying with 2 transfers
   * @param {object} thirdTicket third ticket of flying with 2 transfers
   */
  drawingTicketsTwoTransfers(firstTicket, secondTicket, thirdTicket) {
    let firstAvialine = {};
    let secondAvialine = {};
    let thirdAvialine = {};
    let firstTransferCity = "";
    let secondTransferCity = "";
    for (let i = 0; i < this.cities.length; i++) {
      if (firstTicket.to === this.cities[i].IATA) {
        firstTransferCity = this.cities[i].city;
      }
    }
    for (let i = 0; i < this.cities.length; i++) {
      if (secondTicket.to === this.cities[i].IATA) {
        secondTransferCity = this.cities[i].city;
      }
    }
    for (let i = 0; i < this.avialines.length; i++) {
      if (firstTicket.company === this.avialines[i].IATA) {
        firstAvialine = this.avialines[i];
      }
    }
    for (let i = 0; i < this.avialines.length; i++) {
      if (secondTicket.company === this.avialines[i].IATA) {
        secondAvialine = this.avialines[i];
      }
    }
    for (let i = 0; i < this.avialines.length; i++) {
      if (thirdTicket.company === this.avialines[i].IATA) {
        thirdAvialine = this.avialines[i];
      }
    }
    const tickets = document.getElementById("tickets");
    tickets.insertAdjacentHTML(
      "beforeend",
      ` <div class="ticket">
          <div class="buyTicket">
            <button class="buy btn btn-primary btn-lg" type="button">
              Купить за <br />
              $${firstTicket.price + secondTicket.price + thirdTicket.price}
            </button>
          </div>
  
          <div class="infoFlying">
            <div class="companyTwo">
              <a class="logoTwo" target="_blank" href="${firstAvialine.web}">
                <img src="${firstAvialine.logo}" title="${
        firstAvialine.name
      }" width="100%" />
              </a>
              <a class="logoTwo" target="_blank" href="${secondAvialine.web}">
                <img src="${secondAvialine.logo}" title="${
        secondAvialine.name
      }" width="100%" />
              </a>
              <a class="logoTwo" target="_blank" href="${thirdAvialine.web}">
              <img src="${thirdAvialine.logo}" title="${
        thirdAvialine.name
      }" width="100%" />
            </a>
            </div>
            <div class="infoTicketTwo">
              <div class="from-to">
                <div class="city">
                  <span>${this.from}</span>
                  <p class="time">${new Date(firstTicket.date)
                    .toLocaleTimeString()
                    .slice(0, 5)}</p>
                  <p class="date">${new Date(
                    firstTicket.date
                  ).toLocaleDateString()}</p>
                </div>
                <div class="dottedBlock">
                  <p>${getDistance(
                    this.cities,
                    this.namesCities,
                    this.from,
                    firstTransferCity
                  )} km</p>
                  <p class="firstFly fly">${getHours(firstTicket.time)}</p>
                </div>
                <div class="dottedBlock">
                  <p>${getDistance(
                    this.cities,
                    this.namesCities,
                    firstTransferCity,
                    secondTransferCity
                  )} km</p>
                  <p class="secondFly fly">${getHours(secondTicket.time)}</p>
                </div>
                <div class="dottedBlock">
                  <p>${getDistance(
                    this.cities,
                    this.namesCities,
                    secondTransferCity,
                    this.to
                  )} km</p>
                  <p class="thirdFly fly">${getHours(thirdTicket.time)}</p>
                </div>
                <div class="city">
                  <span>${this.to}</span>
                  <p class="time">
                  ${getDateArrival(thirdTicket, this.cities)
                    .toLocaleTimeString()
                    .slice(0, 5)}
                  </p>
                  <p class="date">
                  ${getDateArrival(
                    thirdTicket,
                    this.cities
                  ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div class="transfers">
                <div class="city">
                  <div>${firstTransferCity}</div>
                  <div class="infoTransfer waiting">
                    <div>
                      <p>Arrival</p>
                      <p>${getDateArrival(firstTicket, this.cities)
                        .toLocaleTimeString()
                        .slice(0, 5)}</p>
                      <p>${getDateArrival(
                        firstTicket,
                        this.cities
                      ).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p>Waiting</p>
                      <p>${getHours(
                        new Date(
                          new Date(secondTicket.date) -
                            getDateArrival(firstTicket, this.cities).getTime()
                        ) /
                          1000 /
                          60
                      )}</p>
                    </div>
                    <div>
                      <p>Departure</p>
                      <p>${new Date(secondTicket.date)
                        .toLocaleTimeString()
                        .slice(0, 5)}</p>
                      <p>${new Date(secondTicket.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div class="city">
                  <div>${secondTransferCity}</div>
                  <div class="infoTransfer waiting">
                    <div>
                      <p>Arrival</p>
                      <p>${getDateArrival(secondTicket, this.cities)
                        .toLocaleTimeString()
                        .slice(0, 5)}</p>
                      <p>${getDateArrival(
                        secondTicket,
                        this.cities
                      ).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p>Waiting</p>
                      <p>${getHours(
                        new Date(
                          new Date(thirdTicket.date) -
                            getDateArrival(secondTicket, this.cities).getTime()
                        ) /
                          1000 /
                          60
                      )}</p>
                    </div>
                    <div>
                      <p>Departure</p>
                      <p>${new Date(thirdTicket.date)
                        .toLocaleTimeString()
                        .slice(0, 5)}</p>
                      <p>${new Date(thirdTicket.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    );
  }
}
module.exports = Transfer;
