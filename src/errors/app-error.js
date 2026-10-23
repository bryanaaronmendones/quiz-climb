function badRequest(code, message) {
  const error = new Error(message);
  error.status = 400;
  error.code = code;
  return error;
}

function unauthorized(message = 'Unauthorized') {
  const error = new Error(message);
  error.status = 401;
  return error;
}

function forbidden(message) {
  const error = new Error(message);
  error.status = 403;
  return error;
}

function notFound(code, message) {
  const error = new Error(message);
  error.status = 404;
  error.code = code;
  return error;
}

function conflict(code, message) {
  const error = new Error(message);
  error.status = 409;
  error.code = code;
  return error;
}

module.exports = { badRequest, unauthorized, forbidden, notFound, conflict };