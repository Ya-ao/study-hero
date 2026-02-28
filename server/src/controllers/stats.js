const User = require('../models/User');
const Record = require('../models/Record');
const Achievement = require('../models/Achievement');
const response = require('../utils/response');
const { formatDate } = require('../utils/date');

const getToday = async (req, res) => {
  try {
    const openid = req.openid;
    
    const user = await User.findByOpenid(openid);
    
    if (!user) {
      return res.json(response.error('用户不存在', 404));
    }

    const todayRecords = await Record.findToday(user.id);
    
    const questionCount = todayRecords.reduce((sum, r) => sum + r.total_questions, 0);
    const correctCount = todayRecords.reduce((sum, r) => sum + r.correct_count, 0);
    const correctRate = questionCount > 0 ? Math.round((correctCount / questionCount) * 100) : 0;

    return res.json(response.success({
      questionCount,
      correctRate,
      streakDays: user.streak_days
    }));
  } catch (err) {
    console.error('Get today stats error:', err);
    return res.json(response.error('获取今日统计失败'));
  }
};

const getRecent = async (req, res) => {
  try {
    const openid = req.openid;
    
    const user = await User.findByOpenid(openid);
    
    if (!user) {
      return res.json(response.error('用户不存在', 404));
    }

    const records = await Record.findRecent(user.id, 5);
    
    return res.json(response.success({
      records: records.map(r => ({
        id: r.id,
        topic: r.topic,
        score: r.score,
        createTime: formatDate(r.created_at)
      }))
    }));
  } catch (err) {
    console.error('Get recent records error:', err);
    return res.json(response.error('获取最近学习记录失败'));
  }
};

const getRecordById = async (req, res) => {
  try {
    const openid = req.openid;
    const { id } = req.params;
    
    const user = await User.findByOpenid(openid);
    
    if (!user) {
      return res.json(response.error('用户不存在', 404));
    }

    const record = await Record.findById(id);
    
    if (!record || record.user_id !== user.id) {
      return res.json(response.error('记录不存在', 404));
    }
    
    return res.json(response.success({
      id: record.id,
      topic: record.topic,
      difficulty: record.difficulty,
      score: record.score,
      totalQuestions: record.total_questions,
      correctCount: record.correct_count,
      duration: record.duration,
      questions: record.questions || [],
      createTime: formatDate(record.created_at)
    }));
  } catch (err) {
    console.error('Get record error:', err);
    return res.json(response.error('获取记录详情失败'));
  }
};

const getHistory = async (req, res) => {
  try {
    const openid = req.openid;
    const { limit = 20, offset = 0 } = req.query;
    
    const user = await User.findByOpenid(openid);
    
    if (!user) {
      return res.json(response.error('用户不存在', 404));
    }

    const records = await Record.findByUserId(user.id, { limit: parseInt(limit), offset: parseInt(offset) });
    
    return res.json(response.success({
      records: records.map(r => ({
        id: r.id,
        topic: r.topic,
        score: r.score,
        totalQuestions: r.total_questions,
        correctCount: r.correct_count,
        duration: r.duration,
        createTime: formatDate(r.created_at)
      }))
    }));
  } catch (err) {
    console.error('Get history error:', err);
    return res.json(response.error('获取学习历史失败'));
  }
};

const getAchievements = async (req, res) => {
  try {
    const openid = req.openid;
    
    const user = await User.findByOpenid(openid);
    
    if (!user) {
      return res.json(response.error('用户不存在', 404));
    }

    const achievements = await Achievement.findByUserId(user.id);
    
    return res.json(response.success({
      achievements: achievements.map(a => ({
        type: a.type,
        name: a.name,
        icon: a.icon,
        unlockedAt: formatDate(a.unlocked_at)
      }))
    }));
  } catch (err) {
    console.error('Get achievements error:', err);
    return res.json(response.error('获取成就列表失败'));
  }
};

module.exports = {
  getToday,
  getRecent,
  getRecordById,
  getHistory,
  getAchievements
};
