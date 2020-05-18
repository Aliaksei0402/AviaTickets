const autocomplete = require("../src/Autocomplete.js");

test("Autocomplete test Error first argument non-object", () => {
  const string = "fsg";
  const number = 38;
  const boolean = true;
  const array = [1, 2, 3, 4];
  expect(() => autocomplete(string, array)).toThrow();
  expect(() => autocomplete(number, array)).toThrow();
  expect(() => autocomplete(boolean, array)).toThrow();
});

test("Autocomplete test Error first argument not a DOM-object", () => {
  const obj = { one: 34,
two: "three" };
  const array = [1, 2, 3, 4];

  expect(() => autocomplete(obj, array)).toThrow();
});

test("Autocomplete test Error second argument non-object", () => {
  const DOM = document.createElement("div");
  const string = "fsg";
  const number = 38;
  const boolean = true;

  expect(() => autocomplete(DOM, string)).toThrow();
  expect(() => autocomplete(DOM, number)).toThrow();
  expect(() => autocomplete(DOM, boolean)).toThrow();
});

test("Autocomplete test Error second argument not an array", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => autocomplete(DOM, obj)).toThrow();
  expect(() => autocomplete(DOM, getSum)).toThrow();
});
