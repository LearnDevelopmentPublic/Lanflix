const mongoose = require('mongoose');
const Series = require('../models').Series;
const Movies = require('../models').Movie;
const Queries = require('../services/Queries');

module.exports = {
  series(req, res) {
      const data = Queries.series(req, res);

      data ? res.send(data) : res.send([]);
  },

	movies(req, res) {
    const data = Queries.movies(req, res);

    data ? res.send(data) : res.send([]);
  },

	browse(req, res) {
	const { series, movies } = Queries;
	Promise.all([
			movies(req, res),
			series(req, res)
		])
		//Feel free to use whatever version suits you best
		// .then( data => data.filter(curr => curr ? curr : null))
		// .then( data => [].concat(...data))
		// .then( data => data ? res.send(data) : res.send([]))
		.then( response => {
			//Filters out any bad responses, e.g undefined
			const data = response.filter(curr => curr ? curr : null);
			//Flattens array
			const tempArr = [].concat(...data);
			//Sends back data the data or if there is none then an empty array
			data ? res.send(data) : res.send([]);
		})
		.catch(err => res.sendStatus(500));
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
