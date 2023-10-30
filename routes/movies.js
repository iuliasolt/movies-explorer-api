const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

const { urlRegex } = require('../utils/constants');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.string().required(),
    owner: Joi.string().required(),
  }),
}), createMovie);

router.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
