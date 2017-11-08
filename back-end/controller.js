var path = require('path');
var mongoose = require('mongoose');

var Categories = require('./models').Categories;
var Series = require('./models').Series;

var controllers = {
    index: index,
    categories: categories,
    playground: playground,
    series: series,
    seriesById: seriesById,
    episodes: episodes
};

function index(req, res) {
    res.sendFile(__dirname + '/front-end/index.html');
}

function categories(req, res) {
    Categories.find(function(err, categories) {
        if(err) {
            res.sendStatus(500);
        } else {
            res.send(categories);
        }
    })
}

function playground(req, res) {
    // this may be a security risk, but it allows for a separation of front- and back-end code
    res.sendFile(path.resolve(__dirname, '..', 'front-end', 'component-playground', 'index.html' ));
}

function series(req, res) {
    Series.find(function(err, series) {
        if(err) {
            res.sendStatus(500);
        } else {
            res.send(series);
        }
    })
}

function seriesById(req, res) {
    var seriesId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(seriesId)) {
        return res.status(400).send("The provided series id is invalid!");
    }
    Series.findById(seriesId, function(err, series) {
        if(err) {
            res.sendStatus(500);
        } else {
            res.send(series);
        }
    })
}

function episodes(req, res) {
    var seriesId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(seriesId)) {
        return res.status(400).send("The provided series id is invalid!");
    }
    Series.findById(seriesId, function (err, series) {
        if(err) {
            res.sendStatus(500);
        } else {
            res.send(series.episodes);
        }
    })
}

module.exports = controllers;
