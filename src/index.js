const axios = require("axios");
const getDistance = require("./getDistance");
const Ticket = require("./Ticket");
const getTickets = require("./getTickets");
const autocomplete = require("./Autocomplete");
const getHours = require("./getHours");

/** Class working with map and inputs for searching */
class initApp {
  /**
   * @param {object} cities Array of cities
   * @param {object} tickets Array of tickets
   * @param {object} avialines Array of avialines
   * @param {object} namesCities Array of names of cities
   */
  constructor(cities, tickets, avialines) {
    this.cities = cities;
    this.tickets = tickets;
    this.avialines = avialines;
    this.namesCities = this.cities.map((item) => item.city);
  }

  /**
   * @async
   * @description Getting the Map and Placemarks
   */
  async initMap() {
    this.myMap = new ymaps.Map("map", {//eslint-disable-line
      center: [15.617, 5.217],
      zoom: 1.85,
    });

    this.cities.forEach((item) => {
      const cityPlacemark = new ymaps.Placemark( //eslint-disable-line
        [item.latitude, item.longitude],
        {
          hintContent: item.city,
        },
        { preset: "islands#blueCircleDotIcon" }
      );
      this.myMap.geoObjects.add(cityPlacemark);

      cityPlacemark.events.add("click", () => {
        this.getPlacemarks(item.city);
      });
    });

    this.ckeckingInputs();
    this.initializationLocalStorage();
    this.initializationAutocomplete();

    const clear = document.getElementById("clear");
    clear.addEventListener("click", () => {
      localStorage.clear();
    });
  }

  /**
   * @description calling checking inputs functions
   */
  ckeckingInputs() {
    this.checkInputFrom();
    this.checkInputTo();
    this.checkInputDate();
    this.checkClickCalendar();
  }

  /**
   * @description loading data from localeStorage
   */
  initializationLocalStorage() {
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    const date = document.getElementById("date");
    from.value = localStorage.getItem("from") || "";
    to.value = localStorage.getItem("to") || "";
    date.value = localStorage.getItem("date") || "";
    const search = document.getElementById("search");
    const eventInput = new Event("input");
    const eventClick = new Event("click");
    to.dispatchEvent(eventInput);
    from.dispatchEvent(eventInput);
    date.dispatchEvent(eventInput);
    search.dispatchEvent(eventClick);
  }

  /**
   * @description initialization Autocomplete
   */
  initializationAutocomplete() {
    autocomplete(document.getElementById("from"), this.namesCities);
    autocomplete(document.getElementById("to"), this.namesCities);
  }

  /**
   * @description catching date selected on calendar
   */
  checkClickCalendar() {
    const date = document.getElementById("date");
    date.addEventListener("click", () => {
      const calendar = document.getElementById("datepickers-container");
      calendar.addEventListener("click", () => {
        const event = new Event("input");
        date.dispatchEvent(event);
      });
    });
  }

  /**
   * @description checking input from
   */
  checkInputFrom() {
    const from = document.getElementById("from");
    from.addEventListener("input", () => {
      if (this.namesCities.includes(from.value)) {
        from.classList.add("good");
        this.myMap.geoObjects.each((geoObject) => {
          if (geoObject.properties._data.hintContent === from.value) {
            this.highlightPlacemark(geoObject);
          }
        });
        this.checkInputs();
      } else {
        from.classList.remove("good");
        this.removeHighlightPlacemarks(); //удалить метку
        this.removeLine();
        this.disableSearch();
        this.removeInfoBlock();
      }
    });
  }

  /**
   * @description checking input to
   */
  checkInputTo() {
    const to = document.getElementById("to");
    to.addEventListener("input", () => {
      if (this.namesCities.includes(to.value)) {
        to.classList.add("good");
        this.myMap.geoObjects.each((geoObject) => {
          if (geoObject.properties._data.hintContent === to.value) {
            this.highlightPlacemark(geoObject);
          }
        });
        this.checkInputs();
      } else {
        to.classList.remove("good");
        this.removeHighlightPlacemarks(); //удалить метку
        this.removeLine();
        this.disableSearch();
        this.removeInfoBlock();
      }
    });
  }

  /**
   * @description checking input date
   */
  checkInputDate() {
    const date = document.getElementById("date");
    const exp = /20\d\d-[0-1]\d-[0-3]\d/;
    date.addEventListener("input", () => {
      if (
        new Date(date.value).toLocaleDateString() ===
          new Date().toLocaleDateString() ||
        (new Date(date.value).getTime() >= new Date().getTime() &&
          exp.test(date.value))
      ) {
        date.classList.add("good");
        this.checkInputs();
      } else {
        date.classList.remove("good");
        this.disableSearch();
      }
    });
  }

  /**
   * @description Working with "click" on placemark
   * @param {string} city clicked city name
   */
  getPlacemarks(city) {
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    const event = new Event("input");

    if (from.value !== "" && to.value !== "") {
      from.value = city;
      to.value = "";
      this.removeHighlightPlacemarks();
      from.dispatchEvent(event);
    } else if (from.value === "") {
      from.value = city;
      from.dispatchEvent(event);
    } else if (from.value !== city) {
      to.value = city;
      to.dispatchEvent(event);
    }
  }

  /**
   * @description checking all inputs together
   */
  checkInputs() {
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    const date = document.getElementById("date");
    this.removeLine();
    this.removeInfoBlock();
    if (
      from.value !== "" &&
      this.namesCities.includes(from.value) &&
      to.value !== "" &&
      this.namesCities.includes(to.value)
    ) {
      this.myMap.geoObjects.each((geoObject) => {
        if (
          geoObject.properties._data.hintContent === to.value ||
          geoObject.properties._data.hintContent === from.value
        ) {
          this.highlightPlacemark(geoObject);
        }
      });
      this.getInfoBlock(from.value, to.value);
      if (
        (new Date(date.value).toLocaleDateString() !== "Invalid Date" &&
          new Date(date.value).toLocaleDateString() ===
            new Date().toLocaleDateString()) ||
        new Date(date.value).getTime() >= new Date().getTime()
      ) {
        const search = document.getElementById("search");
        search.removeAttribute("disabled", false);
        search.addEventListener("click", () => {
          localStorage.setItem("from", from.value);
          localStorage.setItem("to", to.value);
          localStorage.setItem("date", date.value);
          const tickets = document.getElementById("tickets");
          tickets.innerHTML = "";
          const ticket = new Ticket(
            from.value,
            to.value,
            date.value,
            this.cities,
            this.tickets,
            this.avialines,
            getDistance(this.cities, this.namesCities, from.value, to.value)
          );
          ticket.getIATA(from.value, to.value);
        });
      }
    } else {
      this.disableSearch();
    }
  }

  /**
   * @description disable button "Search"
   */
  disableSearch() {
    const search = document.getElementById("search");
    search.setAttribute("disabled", true);
  }

  /**
   * @description highlight point
   * @param {object} point point which will highlight
   */
  highlightPlacemark(point) {
    point.options.set({ preset: "islands#redCircleDotIcon" });
  }

  /**
   * @description remove all highlighting of points
   */
  removeHighlightPlacemarks() {
    this.myMap.geoObjects.each(function (el, i) {
      el.options.set({ preset: "islands#blueCircleDotIcon" }, i);
    });
  }

  /**
   * @description remove line between cities
   */
  removeLine() {
    this.myMap.geoObjects.each((geoObject) => {
      if (geoObject.properties._data.balloonContent === "") {
        this.myMap.geoObjects.remove(geoObject);
      }
    });
  }

  /**
   * @description getting div with information about distance
   * @param {string} from name city from going
   * @param {string} to name city to going
   */
  getInfoBlock(from, to) {
    const body = document.querySelector("body");
    const infoBlock = document.createElement("div");
    body.prepend(infoBlock);
    infoBlock.setAttribute("id", "info");
    infoBlock.classList.add("alert", "alert-warning");
    let distance = getDistance(this.cities, this.namesCities, from, to);
    infoBlock.insertAdjacentHTML(
      "beforeend",
      `<p>Маршрут: ${from} - ${to}</p> <p>Расстояние по прямой: ${distance} км</p>
      
      <div class="information"><div class="button"><a href="#map"><button type="button" class="btn btn-outline-secondary" id="lookMap">Посмотреть на карте</button></a></div>
      <div class="img"><img src="/img/run.png" width="60px" /></div>
      <div class="fun">Если бы Вы перемещались с максимальной скоростью бега человека, то преодолели бы маршрут с таким расстоянием по прямой за <strong>${getHours(
        (distance / 44) * 60
      )}</strong></div></div>`
    );
    this.getLine(from, to, distance);
  }

  /**
   * @description removing info block
   */
  removeInfoBlock() {
    if (document.getElementById("info") !== null) {
      document.getElementById("info").remove();
    }
  }

  /**
   * @description getting line between selected cities
   * @param {string} from name city from going
   * @param {string} to name city to going
   * @param {number} distance distance between from and to
   */
  getLine(from, to, distance) {
    if (typeof distance !== "number" || distance < 0) {
      throw new Error("Uncorrect distance");
    }
    const lineBetween = [
      [
        this.cities[this.namesCities.indexOf(from)].latitude,
        this.cities[this.namesCities.indexOf(from)].longitude,
      ],
      [
        this.cities[this.namesCities.indexOf(to)].latitude,
        this.cities[this.namesCities.indexOf(to)].longitude,
      ],
    ];
    var myPolyline = new ymaps.Polyline( //eslint-disable-line
      lineBetween,
      {
        // Описываем свойства геообъекта.
        // Содержимое балуна.
        hintContent: `${from} - ${to}<br/>${distance} km`,
        balloonContent: "",
      },
      {
        // Задаем опции геообъекта.
        // Отключаем кнопку закрытия балуна.
        balloonCloseButton: false,
        // Цвет линии.
        strokeColor: "#000000",
        // Ширина линии.
        strokeWidth: 4,
        // Коэффициент прозрачности.
        strokeOpacity: 0.5,
      }
    );
    this.myMap.geoObjects.add(myPolyline);
  }
}

async function init() {
  const app = new initApp(
    (await axios.get("../json/cities.json")).data,
    // (await axios.get("../json/tickets.json")).data,
    getTickets(10000),
    (await axios.get("../json/avialines.json")).data
  );
  ymaps.ready(() => app.initMap()); //eslint-disable-line
}
init();

module.exports = initApp;
