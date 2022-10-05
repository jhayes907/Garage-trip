This is Garage-Trip.

TO INSTALL:
This link  https://github.com/jhayes907/Garage-trip will bring you to the Github repo for Garage-Trip.

Fork and clone this repo to your local machine.

CD into the folder where your repo is located.

Install the Dependencies using: npm install.

create a file in the main file directoru called ".env" where you need to add SECRET SESSION=secret session.

Create your database with the following: "npm install sequelize-cl" npm sequelize-c;o db:create Garage-trip.

Then migrate your database with the following: sequelize-cli db:migrate.

Final step: Start the server.  



ABOUT:
Garage-Trip was made for the second project of my GA immersive cohort, sept 2022.
This is a full stack project showcasing my ability to navigate, understand, and implement, the frontend as well as the backend enviroment of web development. 

THE GOAL:
Garage sale Finder. 
   As a user I want to search for garage sales to go to in certain area.
   As a user I want to view a description of what is available at the sale I am interested in.
   As a user I want to be able to post my own garage sale listing.
   As a user I want to be able to edit or remove my listings or items in that listing.

TECHNOLOGIES USED:
This project was developed using the following: 

"dependencies": {
    "@ngneat/falso": "^6.1.0",
    "axios": "^0.27.2",
    "bcryptjs": "^2.4.3",
    "bootstrap": "^5.2.1",
    "connect-flash": "^0.1.1",
    "dotenv": "^16.0.2",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.17.3",
    "heroku": "^7.3.0",
    "method-override": "^3.0.0",
    "moment": "^2.29.4",
    "morgan": "^1.10.0",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "pg": "^8.8.0",
    "pg-hstore": "^2.3.4",
    "rowdy-logger": "^1.0.2",
    "sequelize": "^6.21.6",
    "sequelize-cli": "^6.5.1"
}

DATABASE:
The database models are set up with the following model configurations:

### User Model

| Column Name | Data Type | Notes                              |
| ----------- | --------- | ---------------------------------- |
| id          | Integer   | Serial Primary Key, Auto-generated |
| name        | String    | Must be provided                   |
| email       | String    | Must be unique / used for login    |
| password    | String    | Stored as a hash                   |
| createdAt   | Date      | Auto-generated                     |
| updatedAt   | Date      | Auto-generated                     |


### Listing Model

| Column Name | Data Type | Notes                              |
| ----------- | --------- | ---------------------------------- |
| id          | Integer   | Serial Primary Key, Auto-generated |
| userId      | Integer   |                                    |
| name        | String    | Must be provided                   |
| location    | String    |                                    |
| tags        | String    |                                    |
| content     | String    |                                    |
| createdAt   | Date      | Auto-generated                     |
| updatedAt   | Date      | Auto-generated                     |


### Item Model

| Column Name | Data Type | Notes                              |
| ----------- | --------- | ---------------------------------- |
| id          | Integer   | Serial Primary Key, Auto-generated |
| userId      | Integer   |                                    |
| listingId   | Integer   |                                    |
| name        | String    |                   |
| location    | String    |                                    |
| tags        | String    |                                    |
| content     | String    |                                    |
| createdAt   | Date      | Auto-generated                     |
| updatedAt   | Date      | Auto-generated                     |


### Comment Model

| Column Name | Data Type | Notes                              |
| ----------- | --------- | ---------------------------------- |
| id          | Integer   | Serial Primary Key, Auto-generated |
| userId      | Integer   |                                    |
| listingId   | Integer   |                                    |
| itemId      | Integer   |                                    |
| name        | String    |                                    |
| content     | String    |                                    |
| createdAt   | Date      | Auto-generated                     |
| updatedAt   | Date      | Auto-generated                     |












