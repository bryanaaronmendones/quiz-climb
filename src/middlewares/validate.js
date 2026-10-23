const { validationResult } = require('express-validator');
const { badRequest } = require('../errors/app-error');

module.exports = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    throw badRequest('INVALID_BODY', firstError.msg);
  }
  next();
};
