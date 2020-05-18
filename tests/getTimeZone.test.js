const getTimeZone = require("../src/getTimeZone.js");
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

test("Test getTimeZone Error first argument non-string", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };

function getSum() {
    return 1 + 4;
  }
  const number = 38;
  const boolean = true;

  expect(() => getTimeZone(DOM, cities)).toThrow();
  expect(() => getTimeZone(obj, cities)).toThrow();
  expect(() => getTimeZone(getSum, cities)).toThrow();
  expect(() => getTimeZone(number, cities)).toThrow();
  expect(() => getTimeZone(boolean, cities)).toThrow();
});

test("Test getTimeZone Error second argument non-object", () => {
  const number = 38;
  const boolean = true;
  const string = "combo";

  expect(() => getTimeZone("MOW", string)).toThrow();
  expect(() => getTimeZone("MOW", number)).toThrow();
  expect(() => getTimeZone("MOW", boolean)).toThrow();
});

test("Test getTimeZone Error second argument non-array", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
   function getSum() {
    return 1 + 4;
  }

  expect(() => getTimeZone("MOW", DOM)).toThrow();
  expect(() => getTimeZone("MOW", obj)).toThrow();
  expect(() => getTimeZone("MOW", getSum)).toThrow();
});

test("Test getTimeZone", () => {
  expect(getTimeZone("MOW", cities)).toBe(3);
  expect(getTimeZone("LAX", cities)).toBe(-7);
  expect(getTimeZone("MSQ", cities)).toBe(3);
  expect(getTimeZone("VVO", cities)).toBe(10);
  expect(getTimeZone("FRA", cities)).toBe(1);
  expect(getTimeZone("RIO", cities)).toBe(-3);
  expect(getTimeZone("LON", cities)).toBe(1);
});
