const Series = require('../../models').Series;
const Movies = require('../../models').Movie;

module.exports = {
  series(req, res) {
    Series.find(function(err, series) {
        if(err) {
            res.sendStatus(500);
        } else {
            return (series);
        }
    })
  },

  movies(req, res) {
    Movies.find(function(err, movies) {
        if(err) {
            res.sendStatus(500);
        } else {
            return (movies);
        }
    })
  }
}
