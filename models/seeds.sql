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


/* From database creation
Users (
    `userName` VARCHAR(255) NOT NULL ,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`userName`));

Portfolios (
    `id` INTEGER NOT NULL auto_increment ,
    `coin` VARCHAR(255) NOT NULL,
    `holdings` DECIMAL NOT NULL DEFAULT 0,
    `own` TINYINT(1) NOT NULL DEFAULT false,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `UserUserName` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`UserUserName`)
    REFERENCES `Users` (`userName`) ON DELETE NO ACTION ON UPDATE CASCADE);

Transactions (
    `id` INTEGER NOT NULL auto_increment ,
    `type` VARCHAR(255) NOT NULL,
    `currency` VARCHAR(255) NOT NULL,
    `quantity` DECIMAL NOT NULL DEFAULT 0,
    `price` DECIMAL NOT NULL DEFAULT 0, 
    `date` DATETIME NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    `UserUserName` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`UserUserName`)
    REFERENCES `Users` (`userName`) ON DELETE NO ACTION ON UPDATE CASCADE);
    */
