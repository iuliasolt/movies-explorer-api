const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserById,
  updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUserById);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
}), updateProfile);

module.exports = router;
