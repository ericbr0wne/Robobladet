![screenshot](https://i.imgur.com/2orAXBS.png)

A news web app built with React, Express.js and C#/.NET

## RoboApp ## // Frontend

* cd roboApp
* npm install
* npm run dev

## RoboApi ## // Backend

* cd roboApi
* npm install
* _Required packages for login function_: npm install bcryptjs jsonwebtoken express-jwt
* node server.js
## RoboScraper ## // Webscraping news sites + Database CRUD

* cd roboScraper
* dotnet build
* dotnet run

## Connect your database
* Uses dependency "dotenv" to store connection string
* Add file ".env" in root folder
* Populate with connection string

  Fomat in .env:
  
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
API_KEY=
```
  
