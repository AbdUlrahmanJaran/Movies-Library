'use strict';
const movies = require("./Movie Data/data.json");
const express = require("express");
const app = express();

function Movie(title, poster_path, overview){
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

app.get('/', moviesHandler);
app.get('/favorite', favoriteHandler);
app.use("*", notFoundHandler);

function moviesHandler(req, res){
    let result = [];
    movies.data.forEach((value) => {
        let oneMovie = new Movie(value.title, value.poster_path, value.overview);
        result.push(oneMovie);
    });
    return res.status(200).json(result);
}

function favoriteHandler(request, response){
    return response.send("Welcome to Favorite");
};

function notFoundHandler(req, res){
    return res.status(404).send("Not Found");
}

app.listen(3000, () => {
    console.log("Listen on 3000");
});