const User = require('../models/User');
const Record = require('../models/Record');
const aiService = require('../services/ai');
const achievementService = require('../services/achievement');
const response = require('../utils/response');
const { isToday, formatDate } = require('../utils/date');

const generateQuestions = async (req, res) => {
  try {
    const { topic, difficulty = 'medium', count = 10 } = req.body;
    
    if (!topic) {
      return res.json(response.error('请输入学习主题'));
    }

    const questions = await aiService.generateQuestions(topic, difficulty, count);
    
    if (!questions || questions.length === 0) {
      return res.json(response.error('生成题目失败，请重试'));
    }

    return res.json(response.success({ questions }));
  } catch (err) {
    console.error('Generate questions error:', err);
    return res.json(response.error('生成题目失败'));
  }
};

const submit = async (req, res) => {
  try {
    const openid = req.openid;
    const { topic, difficulty, totalQuestions, correctCount, duration, questions } = req.body;
    
    if (!topic || !questions || questions.length === 0) {
      return res.json(response.error('参数错误'));
    }

    const user = await User.findByOpenid(openid);
    
    if (!user) {
      return res.json(response.error('用户不存在', 404));
    }

    const score = Math.round((correctCount / totalQuestions) * 100);

    const record = await Record.create({
      user_id: user.id,
      topic,
      difficulty,
      total_questions: totalQuestions,
      correct_count: correctCount,
      score,
      duration,
      questions
    });

    const newTotalQuestions = user.total_questions + totalQuestions;
    const newCorrectCount = user.correct_count + correctCount;
    
    let newStreakDays = user.streak_days;
    const lastStudyDate = user.last_study_date;
    const today = formatDate(new Date());
    
    if (!lastStudyDate || !isToday(lastStudyDate)) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = formatDate(yesterday);
      
      if (lastStudyDate === yesterdayStr) {
        newStreakDays += 1;
      } else {
        newStreakDays = 1;
      }
    }

    await User.updateStats(user.id, {
      totalQuestions: newTotalQuestions,
      correctCount: newCorrectCount,
      streakDays: newStreakDays,
      lastStudyDate: today
    });

    const achievements = await achievementService.checkAll(user.id, {
      ...user,
      total_questions: newTotalQuestions,
      streak_days: newStreakDays
    }, {
      totalQuestions,
      correctCount,
      score
    });

    return res.json(response.success({
      score,
      achievements: achievements.map(a => ({
        type: a.type,
        name: a.name,
        icon: a.icon
      }))
    }));
  } catch (err) {
    console.error('Submit error:', err);
    return res.json(response.error('提交失败'));
  }
};

module.exports = {
  generateQuestions,
  submit
};
