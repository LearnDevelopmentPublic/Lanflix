const CategoriesController = require('./controllers/categories_controller.js');
/*
  Probably needs a better name
*/
const SeriesMovieController = require('./controllers/series_movie_controller.js');
const ViewController = require('./controllers/view_controller.js');

function initRoutes(app) {
    app.get('/', ViewController.index);
    app.get('/categories', CategoriesController.categories);
    app.get('/playground', ViewController.playground);
    app.get('/series', SeriesMovieController.series);
    app.get('/series/:id', SeriesMovieController.seriesById);
    app.get('/series/:id/episodes', SeriesMovieController.episodes);
    app.get('/series/:id/episodes/:eid', SeriesMovieController.episodesByEid);
    app.get('/movies', SeriesMovieController.movies);
    app.get('/movies/:id', SeriesMovieController.moviesById);
}

module.exports = initRoutes;
