const getDistance = require("../src/getDistance.js");

const namesCities = [
  "Minsk",
  "London",
  "Rio De Janeiro",
  "Vladivostok",
  "Moscow",
  "Los Angeles",
  "Frankfort on the Main",
];

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

test("Test getDistance Error firts argument non-object", () => {
  const string = "fsg";
  const number = 38;
  const boolean = true;
  expect(() => getDistance(string, namesCities, "Minsk", "London")).toThrow();
  expect(() => getDistance(number, namesCities, "Minsk", "London")).toThrow();
  expect(() => getDistance(boolean, namesCities, "Minsk", "London")).toThrow();
});

test("Test getDistance Error first argument non-array", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
   function getSum() {
    return 1 + 4;
  }

  expect(() => getDistance(DOM, namesCities, "Minsk", "London")).toThrow();
  expect(() => getDistance(obj, namesCities, "Minsk", "London")).toThrow();
  expect(() => getDistance(getSum, namesCities, "Minsk", "London")).toThrow();
});

test("Test getDistance Error second argument non-object", () => {
  const string = "fsg";
  const number = 38;
  const boolean = true;
  expect(() => getDistance(cities, string, "Minsk", "London")).toThrow();
  expect(() => getDistance(cities, number, "Minsk", "London")).toThrow();
  expect(() => getDistance(cities, boolean, "Minsk", "London")).toThrow();
});

test("Test getDistance Error second argument non-array", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => getDistance(cities, DOM, "Minsk", "London")).toThrow();
  expect(() => getDistance(cities, obj, "Minsk", "London")).toThrow();
  expect(() => getDistance(cities, getSum, "Minsk", "London")).toThrow();
});

test("Test getDistance Error third and fourth argument non-string", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }
  const number = 38;
  const boolean = true;

  expect(() => getDistance(cities, namesCities, DOM, "London")).toThrow();
  expect(() => getDistance(cities, namesCities, obj, "London")).toThrow();
  expect(() => getDistance(cities, namesCities, getSum, "London")).toThrow();
  expect(() => getDistance(cities, namesCities, number, "London")).toThrow();
  expect(() => getDistance(cities, namesCities, boolean, "London")).toThrow();
  expect(() => getDistance(cities, namesCities, "Minsk", DOM)).toThrow();
  expect(() => getDistance(cities, namesCities, "Minsk", obj)).toThrow();
  expect(() => getDistance(cities, namesCities, "Minsk", getSum)).toThrow();
  expect(() => getDistance(cities, namesCities, "Minsk", number)).toThrow();
  expect(() => getDistance(cities, namesCities, "Minsk", boolean)).toThrow();
});

test("Test getDistance", () => {
  expect(getDistance(cities, namesCities, "Minsk", "London")).toBe(1926);
  expect(getDistance(cities, namesCities, "Moscow", "Los Angeles")).toBe(9793);
  expect(getDistance(cities, namesCities, "Moscow", "Vladivostok")).toBe(6434);
  expect(getDistance(cities, namesCities, "Vladivostok", "Los Angeles")).toBe(
    8834
  );
});
