const getDateArrival = require("../src/getDateArrival.js");
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
const ticket = {
  from: "MSQ",
  to: "LON",
  company: "B2",
  date: "2020-05-18 08:00",
  time: 60,
  price: 50,
};

test("Test getDateArrival Error first argument non-object", () => {
  const string = "fsg";
  const number = 38;
  const boolean = true;

  expect(() => getDateArrival(string, cities)).toThrow();
  expect(() => getDateArrival(number, cities)).toThrow();
  expect(() => getDateArrival(boolean, cities)).toThrow();
});

test("Test getDateArrival Error second argument non-object", () => {
  const string = "fsg";
  const number = 38;
  const boolean = true;

  expect(() => getDateArrival(ticket, string)).toThrow();
  expect(() => getDateArrival(ticket, number)).toThrow();
  expect(() => getDateArrival(ticket, boolean)).toThrow();
});

test("Test getDateArrival Error second argument non-array", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }
  expect(() => getDateArrival(ticket, DOM)).toThrow();
  expect(() => getDateArrival(ticket, obj)).toThrow();
  expect(() => getDateArrival(ticket, getSum)).toThrow();
});

test("getDateArrival", () => {
  const ticket1 = {
    from: "MSQ",
    to: "LON",
    company: "B2",
    date: "2020-05-18 08:00",
    time: 60,
    price: 50,
  };
  const ticket2 = {
    from: "MSQ",
    to: "LAX",
    company: "B2",
    date: "2020-01-18 15:36",
    time: 60,
    price: 50,
  };
  const ticket3 = {
    from: "VVO",
    to: "MOW",
    company: "B2",
    date: "2021-02-18 09:00",
    time: 60,
    price: 50,
  };
  expect(new Date(getDateArrival(ticket1, cities)).toString()).toBe(
    new Date("2020-05-18 07:00:00").toString()
  );
  expect(new Date(getDateArrival(ticket2, cities)).toString()).toBe(
    new Date("2020-01-18 06:36").toString()
  );
  expect(new Date(getDateArrival(ticket3, cities)).toString()).toBe(
    new Date("2021-02-18 03:00:00").toString()
  );
});
