use cryptofolio_db;

INSERT INTO Users (firstName, lastName, email, password, createdAt, updatedAt)
VALUES ("demoFirst", "demoLast", "demo@cryptofolio.com", "myword",  "2018-12-03 04:01:00",  "2018-12-03 04:01:00");

INSERT INTO Portfolios (coin, holdings, own, createdAt, updatedAt, UserEmail)
VALUES ("bitcoin", 2.5, true, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demo@cryptofolio.com"),
("ethereum", 11.0, true, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demo@cryptofolio.com"),
("litecoin", 35.0, true, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demo@cryptofolio.com");

INSERT INTO Transactions (type, currency, quantity, price, date, createdAt, updatedAt, UserEmail)
VALUES ("buy", "bitcoin", 2.5, 3000.00, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demo@cryptofolio.com"),
("buy", "ethereum", 11.0, 200.00, "2018-12-03 04:10:00", "2018-12-03 04:10:00", "2018-12-03 04:10:00", "demo@cryptofolio.com"),
("buy", "litecoin", 35.0, 60.00, "2018-12-03 04:15:00", "2018-12-03 04:15:00", "2018-12-03 04:15:00", "demo@cryptofolio.com");
