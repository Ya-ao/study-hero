const success = (data = null, message = 'success') => {
  return {
    code: 0,
    data,
    message
  };
};

const error = (message = 'error', code = -1) => {
  return {
    code,
    data: null,
    message
  };
};

module.exports = {
  success,
  error
};
