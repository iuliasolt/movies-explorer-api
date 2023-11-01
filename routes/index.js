const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFound = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  validateSignin,
  validateSignup,
} = require('../utils/validation');

router.post('/signin', validateSignin, login);

router.post('/signup', validateSignup, createUser);

router.use(auth);

router.use(userRouter);
router.use(movieRouter);

router.use((req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

module.exports = router;
