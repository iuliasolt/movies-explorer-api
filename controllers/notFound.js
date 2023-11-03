const { NotFound } = require('../errors/NotFoundError')
const { messagePageNotFound } = require('../utils/constants');

const notFound = (req, res, next) => {
  next(new NotFound(messagePageNotFound));
};

module.exports = { notFound };
