'use strict';
const movies = require("./Movie Data/data.json");
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const pg = require("pg");
dotenv.config();
const app = express();

const apiKey = process.env.apiKey;
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);

function Movie(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

app.use(express.json());

app.get('/', moviesHandler);
app.get('/favorite', favoriteHandler);
app.get('/trending', trendingHandler);
app.get('/search', searchHandler);
app.get('/topRated', topRatedHandler);
app.get('/similarToShawshankRedemption', similarToShawshankRedemptionHandler);
app.post("/addMovie", addMovieHandler);
app.get("/getMovies", getMoviesHandler);
app.get("getMovie/:id", getMovieHandler);
app.put("/UPDATE/:id", updateHandler);
app.delete("/DELETE/:id", deleteHandler);
app.use("*", notFoundHandler);
app.use(errorHandler);



function moviesHandler(req, res) {
    let arr = [];
    movies.data.forEach((value) => {
        let oneMovie = new Movie(value.title, value.poster_path, value.overview);
        arr.push(oneMovie);
    });
    return res.status(200).json(arr);
}

function favoriteHandler(request, response) {
    return response.send("Welcome to Favorite");
};


function trendingHandler(req, res) {
    let result = [];
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`).then(apiResponse => {
        apiResponse.data.results.map(value => {
            let oneMovie = new Movie(value.id, value.title, value.release_date, value.poster_path, value.overview);
            result.push(oneMovie);
        })
        return res.status(200).json(result);
    }).catch(error => {
        errorHandler(error, req, res);
    })
};

function searchHandler(req, res) {
    let result = [];
    const search = req.query.Movie;
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`).then(apiResponse => {
        apiResponse.data.results.map(value => {
            let oneMovie = new Movie(value.id, value.title, value.release_date, value.poster_path, value.overview);
            result.push(oneMovie);
        })
        console.log(result);
        return res.status(200).json(result);
    }).catch(error => {
        errorHandler(error, req, res);
    })
};

function topRatedHandler(req, res) {
    let result = [];
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`).then(apiResponse => {
        apiResponse.data.results.map(value => {
            let oneMovie = new Movie(value.id, value.title, value.release_date, value.poster_path, value.overview);
            result.push(oneMovie);
        })
        return res.status(200).json(result);
    }).catch(error => {
        errorHandler(error, req, res);
    })
};

function similarToShawshankRedemptionHandler(req, res) {
    let result = [];
    axios.get(`https://api.themoviedb.org/3/movie/278/similar?api_key=${apiKey}`).then(apiResponse => {
        apiResponse.data.results.map(value => {
            let oneMovie = new Movie(value.id, value.title, value.release_date, value.poster_path, value.overview);
            result.push(oneMovie);
        })
        return res.status(200).json(result);
    }).catch(error => {
        errorHandler(error, req, res);
    })
};

function addMovieHandler(req, res){
    const movie = req.body;
    const sql = `INSERT INTO moviesTable(title, release_date, poster_path, overview , comment) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    const values = [movie.title, movie.release_date, movie.poster_path, movie.overview, movie.comment];
    client.query(sql, values).then((result)=>{
        return res.status(201).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    });
};

function getMoviesHandler(req, res){
    const sql = `SELECT * FROM moviesTable`;

    client.query(sql).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    });
};

function getMovieHandler(req, res){
    let id = req.params.id;
    
    const sql = `SELECT * FROM moviesTable WHERE id=$1;`;
    const values = [id];

    client.query(sql, values).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res)
    })
};

function updateHandler(req, res){
    const id = req.params.id;
    const movie = req.body;
   
    const sql = `UPDATE moviesTable SET title=$1, release_date=$2,poster_path=$3, overview=$4, comment=$5 WHERE id=$6 RETURNING *;`;
    const values = [movie.title, movie.release_date, movie.poster_path, movie.overview, movie.comment, id];

    client.query(sql, values).then((result) => {
        return res.status(200).json(result.rows);
    }).catch((error) => {
        errorHandler(error, req, res);
    })

};

function deleteFavmovieHandler(req, res){
    const id = req.params.id

    const sql = `DELETE FROM moviesTable WHERE id=$1;`
    const values = [id];

    client.query(sql, values).then(() => {
        return res.status(204).json({})
    }).catch(error => {
        errorHandler(error, req, res);
    })
};

function errorHandler(error, req, res) {
    const err = {
        status: 500,
        responseText: `${error} Sorry, something went wrong`
    }
    return res.status(500).send(err);
}

function notFoundHandler(req, res) {
    return res.status(404).send("Page Not Found");
}

client.connect().then(() => {
    app.listen(port, () => {
        console.log(`Listen on ${port}`);
    });
})
