const config = require('./../../config'),
    client = require('guidebox'),
    Guidebox = new client(config.guidebox_key);

function buildMovieObject(result) {
    let movie = {
        id: result.id,
        title: result.title,
        year: result.release_year,
        imdb_id: result.imdb,
        rating: result.rating,
        rottentomatoes_id: result.rottentomatoes,
        description: result.overview,
        genres: result.genres,
        duration: result.duration,
        trailer: result.trailers.web.length ? result.trailers.web[0].embed : '',
        writers: result.writers,
        directors: result.directors,
        cast: [],
        free_web_sources: result.free_web_sources,
        subscription_web_sources: result.subscription_web_sources,
        purchase_web_sources: result.purchase_web_sources
    }

    for (let i = 0; i < 6 && i < result.cast.length; i++) {
        movie.cast.push(result.cast[i].name);
    }

    if (result.poster_400x570) {
        movie.poster = result.poster_400x570;
    } else if (result.poster_240x342) {
        movie.poster = result.poster_240x342;
    } else if (result.poster_120x171) {
        movie.poster = result.poster_120x171;
    } else {
        return res.status(500).send('Insuficient movie data');
    }

    if (result.poster_240x342) {
        movie.small_poster = result.poster_240x342;
    } else if (result.poster_120x171) {
        movie.small_poster = result.poster_120x171;
    } else {
        movie.small_poster = null;
    }

    return movie;
}

module.exports = {
    getMovieByTitle(req, res) {
        Guidebox.search.movies({
                field: 'title',
                query: req.params.title
            },
            (err, results) => {
                if (err) {
                    return res.status(404).send('Could not find movie');
                }
                return res.status(200).json(results.results[0]);

            });
    },
    getMovieById(req, res) {
        Guidebox.movies.retrieve(req.params.id,
            (err, result) => {
                if (err) {
                    return res.status(404).send('Could not find movie');
                }

                let movie = buildMovieObject(result);

                return res.status(200).json(movie);

            });
    },
    getMovie(req, res) {
        Guidebox.search.movies({
                field: 'title',
                query: req.params.title
            },
            (err, result) => {
                if (err) {
                    return res.status(404).send('Could not find movie');
                }
                if (result.results[0]) {
                    Guidebox.movies.retrieve(result.results[0].id,
                        (err, result) => {
                            if (err) {
                                return res.status(404).send('Could not find movie');
                            }

                            let movie = buildMovieObject(result);

                            return res.status(200).json(movie);
                        });
                } else {
                    return res.status(404).send('Could not find movie');
                }
            });
    }
}
