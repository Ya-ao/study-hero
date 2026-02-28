const response = require('../utils/response');

const HOT_TOPICS = ['历史', '科学', '地理', '文学', '艺术', '体育'];

const getHotTopics = async (req, res) => {
  return res.json(response.success({
    topics: HOT_TOPICS
  }));
};

module.exports = {
  getHotTopics
};
