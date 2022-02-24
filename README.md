# Movies-Library - 1

**Author Name**: AbdUlrahman Jaran

## WRRC
![image](https://scontent.famm10-1.fna.fbcdn.net/v/t1.15752-9/273744730_672605034166379_8832694800302156092_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=PdNz4dMJhHYAX8vaM9J&_nc_ht=scontent.famm10-1.fna&oh=03_AVKfi7HzEAq29HciSKRHLeFQDRAIMhzmBEu70w73QqSq_g&oe=623A0682)

## Overview
Our website aim to give the User Movies by category.
## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
- after creating files:

- write "npm install express" in Termenal

- write those in server.js:

1. const express = require("express")

2. const app = express()

3. app.listen(PORT, ()=>{ console.log("We are on Port : ----") })

- create end points (ex: app.get("/", welcomeHandler))

- Function for that end point (ex: welcomeHandler)

- to add an API you have to do those steps:

1. const axios = require("axios");

2. axios.get("URL").then(apiResponse) in The Function
You Should change URL to the API's URL with a specific API Key and complete apiResponse as your API's needs.

- to make a DATABASE:

1. Install PostgreSQL

2. Create the database URL and do the configurations (require, new pg.Client, clint.connect)

3. write this on top of the end points "app.use(express.json())"

4. make an end point and function to handle it for what you want (insert(post) , select(get), update(put), delete(delete)).

- Make Error Handlers
## Project Features
<!-- What are the features included in you app -->
The apility to see what movies information do we have and select a favorite movies.