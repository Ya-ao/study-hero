const supabase = require('../utils/db');

const ACHIEVEMENTS = {
  first_answer: { name: '初出茅庐', icon: '🌱' },
  answer_100: { name: '学海无涯', icon: '📚' },
  answer_500: { name: '百题斩', icon: '⚔️' },
  answer_1000: { name: '千题王', icon: '👑' },
  streak_7: { name: '连续7天', icon: '🔥' },
  streak_30: { name: '连续30天', icon: '💪' },
  perfect: { name: '满分达人', icon: '💯' },
  accuracy_90: { name: '正确率90%', icon: '🎯' }
};

const Achievement = {
  async create(achievementData) {
    const { data, error } = await supabase
      .from('achievements')
      .insert(achievementData)
      .select()
      .single();
    
    if (error) return null;
    return data;
  },

  async findByUserId(userId) {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false });
    
    if (error) return [];
    return data;
  },

  async checkExists(userId, type) {
    const { data, error } = await supabase
      .from('achievements')
      .select('id')
      .eq('user_id', userId)
      .eq('type', type)
      .single();
    
    return !!data;
  },

  async unlock(userId, type) {
    const achievement = ACHIEVEMENTS[type];
    if (!achievement) return null;

    const exists = await this.checkExists(userId, type);
    if (exists) return null;

    return await this.create({
      user_id: userId,
      type,
      name: achievement.name,
      icon: achievement.icon
    });
  },

  getAchievementInfo(type) {
    return ACHIEVEMENTS[type] || null;
  }
};

module.exports = Achievement;
