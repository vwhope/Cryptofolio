use cryptofolio_db;

INSERT INTO Users (firstName, lastName, email, password, createdAt, updatedAt)
VALUES ("demoFirst", "demoLast", "demo@cryptofolio.com", "myword",  "2018-12-03 04:01:00",  "2018-12-03 04:01:00"),
("demoFirst2", "demoLast2", "demo2@cryptofolio.com", "myword2",  "2018-12-03 04:01:00",  "2018-12-03 04:01:00");

INSERT INTO Portfolios (coin, symbol, holdings, own, createdAt, updatedAt, UserEmail)
VALUES ("bitcoin", "BTC", 2.0, true, "2018-12-06 04:05:00", "2018-12-06 04:05:00", "demo@cryptofolio.com"),
("ethereum", "ETH", 19.0, true, "2018-12-06 04:05:00", "2018-12-06 04:05:00", "demo@cryptofolio.com"),
("litecoin", "LTC", 36.0, true, "2018-12-06 04:05:00", "2018-12-06 04:05:00", "demo@cryptofolio.com"),
("ripple", "XRP", 15.0, true, "2018-12-06 04:05:00", "2018-12-06 04:05:00", "demo@cryptofolio.com"),
("monero", "XMR", 42.0, true, "2018-12-06 04:05:00", "2018-12-06 04:05:00", "demo@cryptofolio.com");

INSERT INTO Transactions (type, currency, quantity, price, createdAt, updatedAt, UserEmail)
VALUES ("buy", "bitcoin", 2.5, 3000.00, "2018-12-03 04:05:00", "2018-12-03 04:05:00", "demo@cryptofolio.com"),
("buy", "ethereum", 11.0, 200.00, "2018-12-03 04:10:00", "2018-12-03 04:10:00", "demo@cryptofolio.com"),
("buy", "litecoin", 35.0, 60.00, "2018-12-03 04:15:00", "2018-12-03 04:15:00", "demo@cryptofolio.com"),
("buy", "ripple", 11.0, 46.112, "2018-12-03 04:10:00", "2018-12-03 04:10:00", "demo@cryptofolio.com"),
("buy", "monero", 35.0, 89.27, "2018-12-03 04:15:00", "2018-12-03 04:15:00", "demo@cryptofolio.com"),
("sell", "bitcoin", 1.0, 3000.00, "2018-12-05 04:05:00", "2018-12-05 04:05:00", "demo@cryptofolio.com"),
("sell", "ethereum", 1.0, 200.00, "2018-12-05 04:10:00", "2018-12-05 04:10:00", "demo@cryptofolio.com"),
("sell", "litecoin", 1.0, 60.00, "2018-12-05 04:15:00", "2018-12-05 04:15:00", "demo@cryptofolio.com"),
("buy", "bitcoin", 1.5, 3000.00, "2018-12-04 04:05:00", "2018-12-04 04:05:00", "demo2@cryptofolio.com"),
("buy", "ethereum", 10.0, 200.00, "2018-12-04 04:10:00", "2018-12-04 04:10:00", "demo2@cryptofolio.com"),
("buy", "litecoin", 3.0, 60.00, "2018-12-04 04:15:00", "2018-12-04 04:15:00", "demo2@cryptofolio.com"),
("buy", "ripple", 6.0, 46.11201, "2018-12-04 04:10:00", "2018-12-04 04:10:00", "demo2@cryptofolio.com"),
("buy", "monero", 9.0, 89.27, "2018-12-04 04:15:00", "2018-12-04 04:15:00", "demo2@cryptofolio.com"),
("sell", "bitcoin", 2.0, 3000.00, "2018-12-05 04:05:00", "2018-12-05 04:05:00", "demo2@cryptofolio.com"),
("sell", "monero", 1.0, 89.27, "2018-12-06 04:15:00", "2018-12-06 04:15:00", "demo2@cryptofolio.com");
