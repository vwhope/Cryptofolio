# Cryptofolio

### A simulation cryptocurrency portfolio management app

Run Application: [Launch Cryptofolio ](https://cryptofolio-us.herokuapp.com/)
 
**Features**
* Create/manage user-profile
* View seven-day pricing for five cryptocurrencies
* Build portfolio (buy/sell any of five supported cryptocurrencies)
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
* Chart.js
* Passport-jwt
* Cryptocompare API
  
**Problems to Solve**
* Dynamically serve content to user
* Authenticate user and endpoints
* Securely and reliably store data, with scalability in mind
* Provide latest cryptocurrency pricing and news
* Chart coin pricing and portfolio coin distribution
* Control user interaction with back-end database using front-end display
* Allow for separation of concerns to improve maintainability and expandability of code
* Deploy full-stack project for others to use

**Solutions** 
* Apply handlebars templating to dynamically update user's display
* Implement passport-jwt for user/endpoint authentication
* Use MySQL database for data storage
* Integrate Cryptocompare API for cryptocurrency pricing and news
* Integrate chart.js module for creating charts (line/pie)
* Combine MySQL, Sequelized, Express and AJAX for routing and CRUD operations
* Follow Model View Controller (MVC) design pattern
* Deploy project using Heroku

**Setup to run application on your system**
* Node.js and MySQL must be installed on your system 
* You must know YOUR MySQL password 
* You will store YOUR MySQL password and Key to Cryptocompare API in your .env file
    ```   
    DATABASE_URL="mysql://root:YourPasswordHere@localhost:3306/cryptofolio_db"
    CRYPTOCOMPAREKEY=YOUR KEY HERE - NO QUOTES
    ```
* Clone the Cryptofolio repo into a dirctory on your system
* From command line, while in that directory key: npm install
* Navigate to the directory "models"
* To create db and load data into cryptofolio_db tables, key:
   ```
   mysql -u root -p < schema.sql
   mysql -u root -p < seeds.sql
   ``` 
* Navigate back to project root directory, key: 
 ```
 node server.js
  ```
* in browser, navigate to "http://localhost:3000", you should see the Cryptocurrency application

**Resource Contributors**
* Home page background image: [Pixabay](https://pixabay.com/en/cosmos-dark-hd-wallpaper-milky-way-1853491/)
* Home page abstract image : [Pexels](https://www.pexels.com/photo/abstract-art-blur-bright-373543/)
* Home page coin image:[Pexels](https://www.pexels.com/photo/close-up-of-coins-315785/)
* Home page newspaper image: [AbsolutVision on Unsplash](https://unsplash.com/photos/WYd_PkCa1BY)
* Cryptocurrency images: [Atomic Labs](https://github.com/atomiclabs/cryptocurrency-icons)

**Future Enhancement Ideas**
* Add password encryption
* Add two-factor authentication
* Update UI based on enhancements/branding
* Support additional cryptocurrency
* Add additional charting features
* Add real buy/sell features
* Improve responsive design

