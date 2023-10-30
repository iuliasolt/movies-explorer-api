const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');

const {
  createUser,
  login,
} = require('../controllers/users');

const { emailRegex } = require('../utils/constants');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(emailRegex),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);

router.use(userRouter);
router.use(movieRouter);

router.use((req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

module.exports = router;
