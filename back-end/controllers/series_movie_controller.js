const mongoose = require('mongoose');
const Series = require('../models').Series;
const Movies = require('../models').Movie;

module.exports = {
  series(req, res) {
      Series.find(function(err, series) {
          if(err) {
              res.sendStatus(500);
          } else {
              res.send(series);
          }
      })
  },

  movies(req, res) {
      Movies.find(function(err, movies) {
          if(err) {
              res.sendStatus(500);
          } else {
              res.send(movies);
          }
      })
  },

  seriesById(req, res) {
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
  },

  moviesById(req, res) {
      var moviesId = req.params.id;
      if(!mongoose.Types.ObjectId.isValid(moviesId)) {
          return res.status(400).send("The provided movies id is invalid!");
      }
      Movies.findById(moviesId, function(err, movies) {
          if(err) {
              res.sendStatus(500);
          } else {
              res.send(movies);
          }
      })
  },

  episodes(req, res) {
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
  },

  episodesByEid(req, res) {
    var seriesId = req.params.id;
    var episodeId = req.params.eid;
    if(!mongoose.Types.ObjectId.isValid(seriesId)) {
        return res.status(400).send("The provided series id is invalid!");
    } else if(!mongoose.Types.ObjectId.isValid(episodeId)) {
        return res.status(400).send("The provided episode id is invalid!");
    }
    Series.findById(seriesId, function (err, series) {
        if(err) {
            res.sendStatus(500);
        } else {
            res.send(series.episodes.id(episodeId));
        }
    })
  }
}
