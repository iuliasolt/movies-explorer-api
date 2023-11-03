const mongoose = require('mongoose');
const movieModel = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFound = require('../errors/NotFoundError');

const {
  messageIncorrectDataMovie,
  messageImpossibleDeleteMovie,
  messageNotFoundMovie,
} = require('../utils/constants');

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  movieModel
    .create({
      owner,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(messageIncorrectDataMovie));
      } else {
        next(e);
      }
    });
};

const getMovies = (req, res, next) => {
  movieModel
    .find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  movieModel.findById(req.params._id)
    .orFail(() => {
      throw new NotFound(messageNotFoundMovie);
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner !== req.user._id) {
        throw new ForbiddenError(messageImpossibleDeleteMovie);
      } else {
        movieModel.findByIdAndDelete(req.params._id)
          .then(() => {
            res.status(200).send({ message: `Фильм ${movie} удален` });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovies,
};
