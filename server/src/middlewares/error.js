const response = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.json(response.error(err.message || '服务器错误'));
};

module.exports = errorHandler;
