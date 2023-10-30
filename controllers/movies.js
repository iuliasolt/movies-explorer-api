const mongoose = require('mongoose');
const movieModel = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFound = require('../errors/NotFoundError');

const createMovie = (req, res, next) => {
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
  const owner = req.user._id;
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
      res.status(200).send(movie);
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании карточки'));
      } else {
        next(e);
      }
    });
};

const getMovies = (req, res, next) => {
  movieModel
    .find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  movieModel.findById(req.params._id)
    .orFail(() => {
      throw new NotFound('Карточка с указанным id не найдена');
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (owner !== req.user._id) {
        throw new ForbiddenError('В доступе отказано');
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
