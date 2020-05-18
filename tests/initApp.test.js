const initApp = require("../src/index.js");

test("Test initApp.getPlacemark Error non-string", () => {
  const number = 38;
  const boolean = true;
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => initApp.getPlacemark(number)).toThrow();
  expect(() => initApp.getPlacemark(boolean)).toThrow();
  expect(() => initApp.getPlacemark(DOM)).toThrow();
  expect(() => initApp.getPlacemark(obj)).toThrow();
  expect(() => initApp.getPlacemark(getSum)).toThrow();
});

test("Test initApp.highlightPlacemark Error non-object", () => {
  const number = 38;
  const boolean = true;
  const string = "hello";

  expect(() => initApp.highlightPlacemark(number)).toThrow();
  expect(() => initApp.highlightPlacemark(boolean)).toThrow();
  expect(() => initApp.highlightPlacemark(string)).toThrow();
});

test("Test initApp.highlightPlacemark Error unsuitable type of object", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => initApp.highlightPlacemark(DOM)).toThrow();
  expect(() => initApp.highlightPlacemark(obj)).toThrow();
  expect(() => initApp.highlightPlacemark(getSum)).toThrow();
});

test("Test initApp.getInfoBlock Error from and to non-string", () => {
  const number = 38;
  const boolean = true;
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => initApp.getInfoBlock(number, "Minsk")).toThrow();
  expect(() => initApp.getInfoBlock(boolean, "Minsk")).toThrow();
  expect(() => initApp.getInfoBlock(DOM, "Minsk")).toThrow();
  expect(() => initApp.getInfoBlock(obj, "Minsk")).toThrow();
  expect(() => initApp.getInfoBlock(getSum, "Minsk")).toThrow();
  expect(() => initApp.getInfoBlock("Minsk", number)).toThrow();
  expect(() => initApp.getInfoBlock("Minsk", boolean)).toThrow();
  expect(() => initApp.getInfoBlock("Minsk", DOM)).toThrow();
  expect(() => initApp.getInfoBlock("Minsk", obj)).toThrow();
  expect(() => initApp.getInfoBlock("Minsk", getSum)).toThrow();
});

test("Test initApp.getLine Error from and to non-string", () => {
  const number = 38;
  const boolean = true;
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => initApp.getLine(number, "Minsk", 1568)).toThrow();
  expect(() => initApp.getLine(boolean, "Minsk", 1568)).toThrow();
  expect(() => initApp.getLine(DOM, "Minsk", 1568)).toThrow();
  expect(() => initApp.getLine(obj, "Minsk", 1568)).toThrow();
  expect(() => initApp.getLine(getSum, "Minsk", 1568)).toThrow();
  expect(() => initApp.getLine("Minsk", number, 1568)).toThrow();
  expect(() => initApp.getLine("Minsk", boolean, 1568)).toThrow();
  expect(() => initApp.getLine("Minsk", DOM, 1568)).toThrow();
  expect(() => initApp.getLine("Minsk", obj, 1568)).toThrow();
  expect(() => initApp.getLine("Minsk", getSum, 1568)).toThrow();
});

test("Test initApp.getLine Error distance non-number", () => {
  const boolean = true;
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }
  const string = "hello";

  expect(() => initApp.getLine("London", "Minsk", boolean)).toThrow();
  expect(() => initApp.getLine("London", "Minsk", DOM)).toThrow();
  expect(() => initApp.getLine("London", "Minsk", obj)).toThrow();
  expect(() => initApp.getLine("London", "Minsk", getSum)).toThrow();
  expect(() => initApp.getLine("London", "Minsk", string)).toThrow();
});

test("Test initApp.getLine Error distance < 0", () => {
  expect(() => initApp.getLine("London", "Minsk", -15)).toThrow();
  expect(() => initApp.getLine("London", "Minsk", -152.21152)).toThrow();
});
