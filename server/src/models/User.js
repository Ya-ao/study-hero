const supabase = require('../utils/db');

const User = {
  async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async findByOpenid(openid) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('openid', openid)
      .single();
    
    if (error) return null;
    return data;
  },

  async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) return null;
    return data;
  },

  async update(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...userData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) return null;
    return data;
  },

  async updateStats(id, stats) {
    const { data, error } = await supabase
      .from('users')
      .update({
        total_questions: stats.totalQuestions,
        correct_count: stats.correctCount,
        streak_days: stats.streakDays,
        last_study_date: stats.lastStudyDate,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) return null;
    return data;
  }
};

module.exports = User;
