use cryptofolio_db;

INSERT INTO Users (userName, firstName, lastName, email, password, createdAt, updatedAt)
VALUES ("demoUser", "demoFirst", "demoLast", "demo@cryptofolio.com", "myword",  "2018-12-03 04:01:00",  "2018-12-03 04:01:00");

INSERT INTO Portfolios (coin, holdings, own, createdAt, updatedAt, UserUserName)
VALUES ("bitcoin", 2.5, true, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demoUser"),
("ethereum", 11.0, true, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demoUser"),
("litecoin", 35.0, true, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demoUser");

INSERT INTO Transactions (type, currency, quantity, price, date, createdAt, updatedAt, UserUserName)
VALUES ("buy", "bitcoin", 2.5, 3000.00, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demoUser"),
("buy", "ethereum", 11.0, 200.00, "2018-12-03 04:10:00", "2018-12-03 04:10:00", "2018-12-03 04:10:00", "demoUser"),
("buy", "litecoin", 35.0, 60.00, "2018-12-03 04:15:00", "2018-12-03 04:15:00", "2018-12-03 04:15:00", "demoUser");
