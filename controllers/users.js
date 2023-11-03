const { JWT_SECRET, NODE_ENV } = process.env;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const NotFound = require('../errors/NotFoundError');

const {
  messageIncorrectDataUser,
  messageUserNotFound,
  messageAlreadyEmail,
} = require('../utils/constants');

const getUserById = (req, res, next) => {
  const userId = req.user._id;
  userModel.findById(userId)
    .orFail(() => {
      throw new NotFound(messageUserNotFound);
    })
    .then((user) => res.send(user))
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      next(new BadRequest(messageIncorrectDataUser));
      if (e instanceof mongoose.Error.ValidationError) {
        return;
      } if (e.code === 11000) {
        next(new ConflictError(messageAlreadyEmail));
        return;
      } if (e instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound(messageUserNotFound));
        return;
      }
      next(e);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name, email: user.email, _id: user._id,
    }))
    .catch((e) => {
      if (e instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest(messageIncorrectDataUser));
      }
      if (e.code === 11000) {
        return next(new ConflictError(messageAlreadyEmail));
      }
      return next(e);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserById,
  createUser,
  updateProfile,
  login,
};
