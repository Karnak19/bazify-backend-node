const jwt = require('jsonwebtoken');
const { isStringJSONParsable } = require('./util');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function checkToken(req, res, next) {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw new Error('no Authorization header found');

    const [bearer, token] = authorization.split(' ');

    if (bearer === 'Bearer' && token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(403);
    next(error);
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: isStringJSONParsable(err.message)
      ? JSON.parse(err.message)
      : err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
  checkToken,
};
