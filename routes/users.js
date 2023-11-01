const router = require('express').Router();

const {
  getUserById,
  updateProfile,
} = require('../controllers/users');

const { validateUpdateProfile } = require('../utils/validation');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUserById);

// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', validateUpdateProfile, updateProfile);

module.exports = router;
