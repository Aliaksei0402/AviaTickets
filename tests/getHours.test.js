const getHours = require("../src/getHours.js");

test("Test getHours Error minutes non-number", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
   function getSum() {
    return 1 + 4;
  }
  const string = "life";
  const boolean = true;

  expect(() => getHours(DOM)).toThrow();
  expect(() => getHours(obj)).toThrow();
  expect(() => getHours(getSum)).toThrow();
  expect(() => getHours(string)).toThrow();
  expect(() => getHours(boolean)).toThrow();
  expect(() => getHours("combo")).toThrow();
});

test("Test getHours Error minutes < 0", () => {
  expect(() => getHours(-10)).toThrow();
  expect(() => getHours(-1)).toThrow();
  expect(() => getHours(-1000)).toThrow();
  expect(() => getHours(-100)).toThrow();
});

test("Test getHours", () => {
  expect(getHours(5.5)).toBe("6 minutes");
  expect(getHours(5.48)).toBe("6 minutes");
  expect(getHours(1000.548)).toBe("16 hours 41 minutes");
  expect(getHours(12.0001)).toBe("13 minutes");
  expect(getHours(15348.245)).toBe("10 days 15 hours 48 minutes");
});
