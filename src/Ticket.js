const getHours = require("./getHours");
const Transfer = require("./Transfer");
const getDateArrival = require("./getDateArrival");

/** Class working with tickets */
class Ticket {
  /**
   * @param {String} from city from going
   * @param {String} to city to going
   * @param {String} date date of flying format YYYY-MM-DD
   * @param {object} cities array of cities
   * @param {object} tickets array of tickets
   * @param {object} avialines array of avialines
   * @param {Number} distance km between selected cities
   */
  constructor(from, to, date, cities, tickets, avialines, distance) {
    this.from = from;
    this.to = to;
    this.date = date;
    this.cities = cities;
    this.tickets = tickets;
    this.avialines = avialines;
    this.distance = distance;
    this.codeFrom = "";
    this.codeTo = "";
  }

  /**
   * @description getting IATA codes of cities
   * @param {String} from name city from going
   * @param {String} to name city to going
   */
  getIATA(from, to) {
    if (typeof from !== "string" || typeof to !== "string") {
      throw new Error("non-string");
    }
    for (let i = 0; i < this.cities.length; i++) {
      if (from === this.cities[i].city) {
        this.codeFrom = this.cities[i].IATA;
      }
    }
    for (let i = 0; i < this.cities.length; i++) {
      if (to === this.cities[i].city) {
        this.codeTo = this.cities[i].IATA;
      }
    }
    this.searchTickets(this.codeFrom, this.codeTo);
  }

  /**
   * @description searching all tickets checking FROM, TO, DATE
   * @param {String} from IATA code of city FROM
   * @param {String} to IATA code of city TO
   */
  searchTickets(from, to) {
    let x = 0;
    for (let i = 0; i < this.tickets.length; i++) {
      if (
        from === this.tickets[i].from &&
        to === this.tickets[i].to &&
        new Date(this.date).toISOString().slice(0, 10) ===
          new Date(this.tickets[i].date).toISOString().slice(0, 10)
      ) {
        this.drawingTickets(this.tickets[i]);
        x++;
      }
    }
    if (x === 0) {
      this.drawingNoTickets();
    }
  }

  /**
   * @description message about no tickets without transfers
   */
  drawingNoTickets() {
    const tickets = document.getElementById("tickets");
    tickets.innerText = "";
    tickets.insertAdjacentHTML(
      "beforeend",
      ` <div class="alert alert-warning">
          <div class="noTickets">
            <h2>Билеты не найдены</h2>
            <h4>Это могло произойти из-за следующих причин:</h4>
          </div>
        <ul>
          <li>В этот аэропорт не летают самолеты.</li>
          <li>
            Страна закрыта на карантин в связи со сложившейся ситуацией в мире.
          </li>
          <li>
            На эту дату все билеты куплены. Попробуйте поискать билеты на
            соседние даты или ...
          </li>
        </ul>
        <a href="#" id="searchTransfer">Найти билеты с пересадкой</a>
      </div>`
    );
    const searchTransfer = document.getElementById("searchTransfer");
    searchTransfer.addEventListener("click", () => {
      const tickets = document.getElementById("tickets");
      tickets.innerText = "";
      const transfer = new Transfer(
        this.from,
        this.to,
        this.date,
        this.cities,
        this.tickets,
        this.avialines,
        this.codeFrom,
        this.codeTo
      );
      transfer.getFirstCity();
    });
  }

  /**
   * @description drawing DOM of possible ticket
   * @param {object} ticket all information about searched ticket
   */
  drawingTickets(ticket) {
    let avialine = {};
    for (let i = 0; i < this.avialines.length; i++) {
      if (ticket.company === this.avialines[i].IATA) {
        avialine = this.avialines[i];
      }
    }
    const tickets = document.getElementById("tickets");
    tickets.insertAdjacentHTML(
      "beforeend",
      `<div class="ticket">
          <div class="buyTicket">
            <button class="buy btn btn-primary btn-lg" type="button">
                Купить за <br /> $${ticket.price}
            </button>
          </div>

          <div class="infoFlying">
            <div class="company">
              <a target="_blank" href="${avialine.web}">
                <img src="${avialine.logo}" title="${
        avialine.name
      }" width="300" />
              </a>
            </div>
            <div class="infoTicket">
              <div class="from-to">
                <div class="city">
                  <span>${this.from}</span>
                  <p class="time">${new Date(ticket.date)
                    .toLocaleTimeString()
                    .slice(0, 5)}
                  </p>
                  <p class="date">
                    ${new Date(ticket.date).toLocaleDateString()}
                  </p>
                </div>
              <div>
                <p class="dottedLine">
                  ${this.distance} km, ${getHours(ticket.time)}
                </p>
              </div>
              <div class="city">
                <span>${this.to}</span>
                <p class="time">${getDateArrival(ticket, this.cities)
                  .toLocaleTimeString()
                  .slice(0, 5)}</p>
                <p class="date">${getDateArrival(
                  ticket,
                  this.cities
                ).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`
    );
  }
}

module.exports = Ticket;
