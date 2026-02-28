const Achievement = require('../models/Achievement');

const checkFirstAnswer = async (userId, user) => {
  if (user.total_questions === 0) {
    return await Achievement.unlock(userId, 'first_answer');
  }
  return null;
};

const checkAnswerCount = async (userId, totalQuestions) => {
  const achievements = [];
  
  if (totalQuestions >= 100) {
    const achievement = await Achievement.unlock(userId, 'answer_100');
    if (achievement) achievements.push(achievement);
  }
  
  if (totalQuestions >= 500) {
    const achievement = await Achievement.unlock(userId, 'answer_500');
    if (achievement) achievements.push(achievement);
  }
  
  if (totalQuestions >= 1000) {
    const achievement = await Achievement.unlock(userId, 'answer_1000');
    if (achievement) achievements.push(achievement);
  }
  
  return achievements;
};

const checkStreakDays = async (userId, streakDays) => {
  const achievements = [];
  
  if (streakDays >= 7) {
    const achievement = await Achievement.unlock(userId, 'streak_7');
    if (achievement) achievements.push(achievement);
  }
  
  if (streakDays >= 30) {
    const achievement = await Achievement.unlock(userId, 'streak_30');
    if (achievement) achievements.push(achievement);
  }
  
  return achievements;
};

const checkPerfectScore = async (userId, score) => {
  if (score === 100) {
    return await Achievement.unlock(userId, 'perfect');
  }
  return null;
};

const checkAccuracy = async (userId, correctCount, totalQuestions) => {
  if (correctCount / totalQuestions >= 0.9) {
    return await Achievement.unlock(userId, 'accuracy_90');
  }
  return null;
};

const checkAll = async (userId, user, record) => {
  const achievements = [];
  
  const firstAnswer = await checkFirstAnswer(userId, user);
  if (firstAnswer) achievements.push(firstAnswer);
  
  const answerCountAchievements = await checkAnswerCount(userId, user.total_questions + record.totalQuestions);
  achievements.push(...answerCountAchievements);
  
  const streakAchievements = await checkStreakDays(userId, user.streak_days);
  achievements.push(...streakAchievements);
  
  const perfectScore = await checkPerfectScore(userId, record.score);
  if (perfectScore) achievements.push(perfectScore);
  
  const accuracyAchievement = await checkAccuracy(userId, record.correctCount, record.totalQuestions);
  if (accuracyAchievement) achievements.push(accuracyAchievement);
  
  return achievements;
};

module.exports = {
  checkFirstAnswer,
  checkAnswerCount,
  checkStreakDays,
  checkPerfectScore,
  checkAccuracy,
  checkAll
};
