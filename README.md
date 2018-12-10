# Cryptofolio

Watch Video: [Cryptofolio Demo](http://)
Run Application: [Launch Cryptofolio ](https://.herokuapp.com/)

### a simulation cryptocurrency portfolio management app 
**Features**
* Create/manage your user-profile
* View seven-day pricing for 5 cryptocurrencies
* Build portfolio by buying/selling any of five supported cryptocurrencies
* View buy/sell transactions
* View latest cryptocurrency-related news

**Technologies Used**
* jQuery
* JavaScript
* Node.js
* Express, Express-Handlebars
* MySQL
* Sequelized ORM
* Model View Controller (MVC) design pattern
* RESTful API design
  
**Problems to Solve**
* dynamically serve content to user
* authenticate user
* provide persistent data storage
* get latest cryptocurrency pricing and news
* chart coin pricing and portfolio coin distribution
* control user interaction with back-end database using front-end display
* allow for separation of concerns to improve maintainability and expandability of code
* deploy full-stack project for others to use

**Solutions** 
* Apply handlebars templating to dynamically update user's display
* Implement passport-JWT for user authentication
* Use MySQL database for persistent data storage
* Integrate Cryptocompare API for cryptocurrency pricing and news
* Integrate chart.js module for creating charts (line/pie)
* Combine MySQL, Sequelized, Express and AJAX for routing and CRUD operations
* Follow Model View Controller (MVC) design pattern
* Deploy project using Heroku

**Setup to run application on your own system**
* Node.js and MySQL must be installed on your system 
* You must know YOUR MySQL password 
* You will store YOUR MySQL password and Key to Crytocompare API in your .env file
    ```   
    DATABASE_URL="mysql://root:YourPasswordHere@localhost:3306/cryptofolio_db"
    CRYPTOCOMPAREKEY=YOUR KEY HERE - NO QUOTES
    ```
* clone the Cryptofolio repo into a dirctory on your system
* from command line while in that directory key: npm install
* naviagate to the directory "models"
* to create db and load data into cryptofolio_db tables key:
   ```
   mysql -u root -p < schema.sql
   mysql -u root -p < seeds.sql
   ``` 
* navigate to project root directory on your system, key: 
 ```
 node server.js
  ```
* in browser, navigate to "http://localhost:3000", you should see the Cryptocurrency application

**Resource Contributors:**
* Home page background image: [pixabay](https://pixabay.com/en/cosmos-dark-hd-wallpaper-milky-way-1853491/)
* Home page abstract image : [pexels](https://www.pexels.com/photo/abstract-art-blur-bright-373543/)
* Home page coin image:[pexels](https://www.pexels.com)
* Home page newspaper image: [AbsolutVision on Unsplash](https://unsplash.com/search/photos/newspaper)
* Cryptocurrency images: [atomiclabs](https://github.com/atomiclabs/cryptocurrency-icons)

**Future Enhancement Ideas:**
* add user authorization
* add password encryption
* add two-factor authentication
* update UI based on  enhancements/branding
* support additional cryptocurrency
* add additional charting features
* add real buy/sell features

