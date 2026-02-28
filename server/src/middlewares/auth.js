const response = require('../utils/response');

const auth = async (req, res, next) => {
  try {
    const openid = req.headers['x-openid'];
    
    if (!openid) {
      return res.json(response.error('未登录', 401));
    }
    
    req.openid = openid;
    next();
  } catch (err) {
    return res.json(response.error('认证失败', 401));
  }
};

module.exports = auth;
