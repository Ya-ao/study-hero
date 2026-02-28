const axios = require('axios');
const User = require('../models/User');
const response = require('../utils/response');
const config = require('../../config');

const login = async (req, res) => {
  try {
    const { code, openid: devOpenid } = req.body;
    
    if (config.env === 'development' && devOpenid) {
      let user = await User.findByOpenid(devOpenid);
      
      if (!user) {
        user = await User.create({
          openid: devOpenid,
          nick_name: '学习英雄',
          avatar_url: '',
          total_questions: 0,
          correct_count: 0,
          streak_days: 0
        });
      }

      return res.json(response.success({
        openid: user.openid,
        nickName: user.nick_name,
        avatarUrl: user.avatar_url,
        stats: {
          totalQuestions: user.total_questions,
          correctCount: user.correct_count,
          streakDays: user.streak_days
        }
      }));
    }
    
    if (!code) {
      return res.json(response.error('缺少登录凭证'));
    }

    const wxRes = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: config.wechat.appid,
        secret: config.wechat.secret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, session_key } = wxRes.data;
    
    if (!openid) {
      return res.json(response.error('微信登录失败'));
    }

    let user = await User.findByOpenid(openid);
    
    if (!user) {
      user = await User.create({
        openid,
        nick_name: '学习英雄',
        avatar_url: '',
        total_questions: 0,
        correct_count: 0,
        streak_days: 0
      });
    }

    return res.json(response.success({
      openid: user.openid,
      nickName: user.nick_name,
      avatarUrl: user.avatar_url,
      stats: {
        totalQuestions: user.total_questions,
        correctCount: user.correct_count,
        streakDays: user.streak_days
      }
    }));
  } catch (err) {
    console.error('Login error:', err);
    return res.json(response.error('登录失败'));
  }
};

const getInfo = async (req, res) => {
  try {
    const openid = req.openid;
    
    const user = await User.findByOpenid(openid);
    
    if (!user) {
      return res.json(response.error('用户不存在', 404));
    }

    return res.json(response.success({
      nickName: user.nick_name,
      avatarUrl: user.avatar_url,
      stats: {
        totalQuestions: user.total_questions,
        correctCount: user.correct_count,
        streakDays: user.streak_days
      }
    }));
  } catch (err) {
    console.error('Get user info error:', err);
    return res.json(response.error('获取用户信息失败'));
  }
};

const updateInfo = async (req, res) => {
  try {
    const openid = req.openid;
    const { nickName, avatarUrl } = req.body;
    
    const user = await User.findByOpenid(openid);
    
    if (!user) {
      return res.json(response.error('用户不存在', 404));
    }

    const updateData = {};
    if (nickName) updateData.nick_name = nickName;
    if (avatarUrl) updateData.avatar_url = avatarUrl;

    const updatedUser = await User.update(user.id, updateData);
    
    return res.json(response.success({
      nickName: updatedUser.nick_name,
      avatarUrl: updatedUser.avatar_url
    }));
  } catch (err) {
    console.error('Update user info error:', err);
    return res.json(response.error('更新用户信息失败'));
  }
};

module.exports = {
  login,
  getInfo,
  updateInfo
};
