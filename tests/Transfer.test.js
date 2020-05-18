const Transfer = require("../src/Transfer.js");

test("Test Transfer.getSecondCity Error tickets non-object", () => {
  const number = 38;
  const boolean = true;
  const string = "hello";

  expect(() => Transfer.getSecondCity(number)).toThrow();
  expect(() => Transfer.getSecondCity(boolean)).toThrow();
  expect(() => Transfer.getSecondCity(string)).toThrow();
});

test("Test Transfer.getSecondCity Error unsuitable type of object", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => Transfer.getSecondCity(DOM)).toThrow();
  expect(() => Transfer.getSecondCity(obj)).toThrow();
  expect(() => Transfer.getSecondCity(getSum)).toThrow();
});

test("Test Transfer.drawingTicket Error tickets non-object", () => {
  const number = 38;
  const boolean = true;
  const string = "hello";
  const ticket = {
    from: "MSQ",
    to: "LON",
    company: "B2",
    date: "2020-05-18 08:00",
    time: 60,
    price: 50,
  };

  expect(() => Transfer.drawingTicket(number, ticket)).toThrow();
  expect(() => Transfer.drawingTicket(boolean, ticket)).toThrow();
  expect(() => Transfer.drawingTicket(string, ticket)).toThrow();
  expect(() => Transfer.drawingTicket(ticket, number)).toThrow();
  expect(() => Transfer.drawingTicket(ticket, boolean)).toThrow();
  expect(() => Transfer.drawingTicket(ticket, string)).toThrow();
});

test("Test Transfer.drawingTicket Error unsuitable type of object", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }
  const ticket = {
    from: "MSQ",
    to: "LON",
    company: "B2",
    date: "2020-05-18 08:00",
    time: 60,
    price: 50,
  };

  expect(() => Transfer.drawingTicket(DOM, ticket)).toThrow();
  expect(() => Transfer.drawingTicket(obj, ticket)).toThrow();
  expect(() => Transfer.drawingTicket(getSum, ticket)).toThrow();
  expect(() => Transfer.drawingTicket(ticket, DOM)).toThrow();
  expect(() => Transfer.drawingTicket(ticket, obj)).toThrow();
  expect(() => Transfer.drawingTicket(ticket, getSum)).toThrow();
});

test("Test Transfer.getSecondCityTwoTransfers Error tickets non-object", () => {
  const number = 38;
  const boolean = true;
  const string = "hello";

  expect(() => Transfer.getSecondCityTwoTransfers(number)).toThrow();
  expect(() => Transfer.getSecondCityTwoTransfers(boolean)).toThrow();
  expect(() => Transfer.getSecondCityTwoTransfers(string)).toThrow();
});

test("Test Transfer.getSecondCityTwoTransfers Error unsuitable type of object", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
   function getSum() {
    return 1 + 4;
  }

  expect(() => Transfer.getSecondCityTwoTransfers(DOM)).toThrow();
  expect(() => Transfer.getSecondCityTwoTransfers(obj)).toThrow();
  expect(() => Transfer.getSecondCityTwoTransfers(getSum)).toThrow();
});

test("Test Transfer.getThirdCity Error tickets non-object", () => {
  const number = 38;
  const boolean = true;
  const string = "hello";

  expect(() => Transfer.getThirdCity(number)).toThrow();
  expect(() => Transfer.getThirdCity(boolean)).toThrow();
  expect(() => Transfer.getThirdCity(string)).toThrow();
});

test("Test Transfer.getThirdCity Error unsuitable type of object", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
  function getSum() {
    return 1 + 4;
  }

  expect(() => Transfer.getThirdCity(DOM)).toThrow();
  expect(() => Transfer.getThirdCity(obj)).toThrow();
  expect(() => Transfer.getThirdCity(getSum)).toThrow();
});

test("Test Transfer.drawingTicketsTwoTransfers Error tickets non-object", () => {
  const number = 38;
  const boolean = true;
  const string = "hello";
  const ticket1 = {
    from: "MSQ",
    to: "LON",
    company: "B2",
    date: "2020-05-18 08:00",
    time: 60,
    price: 50,
  };

  const ticket2 = {
    from: "LON",
    to: "LAX",
    company: "B2",
    date: "2020-05-18 23:00",
    time: 60,
    price: 50,
  };

  const ticket3 = {
    from: "LAX",
    to: "MOW",
    company: "B2",
    date: "2020-05-19 10:00",
    time: 60,
    price: 50,
  };

  expect(() => Transfer.drawingTicketsTwoTransfers(number, ticket2, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(boolean, ticket2, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(string, ticket2, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, ticket2, number)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, ticket2, boolean)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, ticket2, string)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, number, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, boolean, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, string, ticket3)
  ).toThrow();
});

test("Test Transfer.drawingTicketsTwoTransfers Error unsuitable type of object", () => {
  const DOM = document.createElement("div");
  const obj = { one: 34,
two: "three" };
   function getSum() {
    return 1 + 4;
  }
  const ticket1 = {
    from: "MSQ",
    to: "LON",
    company: "B2",
    date: "2020-05-18 08:00",
    time: 60,
    price: 50,
  };

  const ticket2 = {
    from: "LON",
    to: "LAX",
    company: "B2",
    date: "2020-05-18 23:00",
    time: 60,
    price: 50,
  };

  const ticket3 = {
    from: "LAX",
    to: "MOW",
    company: "B2",
    date: "2020-05-19 10:00",
    time: 60,
    price: 50,
  };

  expect(() => Transfer.drawingTicketsTwoTransfers(obj, ticket2, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(DOM, ticket2, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(getSum, ticket2, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, ticket2, obj)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, ticket2, DOM)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, ticket2, getSum)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, obj, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, DOM, ticket3)
  ).toThrow();
  expect(() => Transfer.drawingTicketsTwoTransfers(ticket1, getSum, ticket3)
  ).toThrow();
});
