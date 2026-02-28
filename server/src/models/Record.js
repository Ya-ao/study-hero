const supabase = require('../utils/db');

const Record = {
  async create(recordData) {
    const { data, error } = await supabase
      .from('study_records')
      .insert(recordData)
      .select()
      .single();
    
    if (error) return null;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabase
      .from('study_records')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return null;
    return data;
  },

  async findByUserId(userId, options = {}) {
    const { limit = 20, offset = 0 } = options;
    
    const { data, error } = await supabase
      .from('study_records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) return [];
    return data;
  },

  async findRecent(userId, limit = 5) {
    const { data, error } = await supabase
      .from('study_records')
      .select('id, topic, score, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) return [];
    return data;
  },

  async findToday(userId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data, error } = await supabase
      .from('study_records')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', today.toISOString());
    
    if (error) return [];
    return data;
  },

  async countByUserId(userId) {
    const { count, error } = await supabase
      .from('study_records')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    
    if (error) return 0;
    return count;
  }
};

module.exports = Record;
