const Ticket = require("../src/Ticket.js");
const cities = [
  {
    city: "Minsk",
    IATA: "MSQ",
    latitude: 53.889296,
    longitude: 28.033783,
    timezone: 3,
  },
  {
    city: "London",
    IATA: "LON",
    latitude: 51.469604,
    longitude: -0.453566,
    timezone: 1,
  },
  {
    city: "Rio De Janeiro",
    IATA: "RIO",
    latitude: -22.814295,
    longitude: -43.246152,
    timezone: -3,
  },
  {
    city: "Vladivostok",
    IATA: "VVO",
    latitude: 43.396705,
    longitude: 132.165106,
    timezone: 10,
  },
  {
    city: "Moscow",
    IATA: "MOW",
    latitude: 55.605088,
    longitude: 37.286204,
    timezone: 3,
  },
  {
    city: "Los Angeles",
    IATA: "LAX",
    latitude: 33.943477,
    longitude: -118.408668,
    timezone: -7,
  },
  {
    city: "Frankfort on the Main",
    IATA: "FRA",
    latitude: 50.050419,
    longitude: 8.571714,
    timezone: 1,
  },
];

test("Test Ticket.getIATA Error from and to non-string", () => {
  const number = 38;
  const boolean = true;
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
   function getSum() {
    return 1 + 4;
  }

  expect(() => Ticket.getIATA(number, "Minsk")).toThrow();
  expect(() => Ticket.getIATA(boolean, "Minsk")).toThrow();
  expect(() => Ticket.getIATA(DOM, "Minsk")).toThrow();
  expect(() => Ticket.getIATA(obj, "Minsk")).toThrow();
  expect(() => Ticket.getIATA(getSum, "Minsk")).toThrow();
  expect(() => Ticket.getIATA("Minsk", number)).toThrow();
  expect(() => Ticket.getIATA("Minsk", boolean)).toThrow();
  expect(() => Ticket.getIATA("Minsk", DOM)).toThrow();
  expect(() => Ticket.getIATA("Minsk", obj)).toThrow();
  expect(() => Ticket.getIATA("Minsk", getSum)).toThrow();
});

test("Test Ticket.searchTickets Error from and to non-string", () => {
  const number = 38;
  const boolean = true;
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => Ticket.searchTickets(number, "Minsk")).toThrow();
  expect(() => Ticket.searchTickets(boolean, "Minsk")).toThrow();
  expect(() => Ticket.searchTickets(DOM, "Minsk")).toThrow();
  expect(() => Ticket.searchTickets(obj, "Minsk")).toThrow();
  expect(() => Ticket.searchTickets(getSum, "Minsk")).toThrow();
  expect(() => Ticket.searchTickets("Minsk", number)).toThrow();
  expect(() => Ticket.searchTickets("Minsk", boolean)).toThrow();
  expect(() => Ticket.searchTickets("Minsk", DOM)).toThrow();
  expect(() => Ticket.searchTickets("Minsk", obj)).toThrow();
  expect(() => Ticket.searchTickets("Minsk", getSum)).toThrow();
});

test("Test Ticket.drawingTickets Error from and to not a object", () => {
  const number = 38;
  const boolean = true;
  const string = "hello";

  expect(() => Ticket.drawingTickets(number)).toThrow();
  expect(() => Ticket.drawingTickets(boolean)).toThrow();
  expect(() => Ticket.drawingTickets(string)).toThrow();
});

test("Test Ticket.drawingTickets Error from and to not a object", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => Ticket.drawingTickets(number)).toThrow();
  expect(() => Ticket.drawingTickets(boolean)).toThrow();
  expect(() => Ticket.drawingTickets(DOM)).toThrow();
  expect(() => Ticket.drawingTickets(obj)).toThrow();
  expect(() => Ticket.drawingTickets(getSum)).toThrow();
});
