const STORAGE_KEYS = {
  OPENID: 'openid',
  USER_INFO: 'userInfo',
  RECENT_TOPICS: 'recentTopics',
  GAME_STATE: 'gameState'
}

function setItem(key, value) {
  try {
    wx.setStorageSync(key, value)
    return true
  } catch (e) {
    console.error('Storage setItem error:', e)
    return false
  }
}

function getItem(key, defaultValue = null) {
  try {
    const value = wx.getStorageSync(key)
    return value !== '' ? value : defaultValue
  } catch (e) {
    console.error('Storage getItem error:', e)
    return defaultValue
  }
}

function removeItem(key) {
  try {
    wx.removeStorageSync(key)
    return true
  } catch (e) {
    console.error('Storage removeItem error:', e)
    return false
  }
}

function clearAll() {
  try {
    wx.clearStorageSync()
    return true
  } catch (e) {
    console.error('Storage clearAll error:', e)
    return false
  }
}

function getOpenid() {
  return getItem(STORAGE_KEYS.OPENID)
}

function setOpenid(openid) {
  return setItem(STORAGE_KEYS.OPENID, openid)
}

function getUserInfo() {
  return getItem(STORAGE_KEYS.USER_INFO)
}

function setUserInfo(userInfo) {
  return setItem(STORAGE_KEYS.USER_INFO, userInfo)
}

function getRecentTopics() {
  return getItem(STORAGE_KEYS.RECENT_TOPICS, [])
}

function addRecentTopic(topic) {
  const topics = getRecentTopics()
  const index = topics.findIndex(t => t.topic === topic.topic)
  if (index > -1) {
    topics.splice(index, 1)
  }
  topics.unshift({
    topic: topic.topic,
    score: topic.score,
    time: Date.now()
  })
  if (topics.length > 10) {
    topics.pop()
  }
  return setItem(STORAGE_KEYS.RECENT_TOPICS, topics)
}

function getGameState() {
  return getItem(STORAGE_KEYS.GAME_STATE)
}

function setGameState(state) {
  return setItem(STORAGE_KEYS.GAME_STATE, state)
}

function clearGameState() {
  return removeItem(STORAGE_KEYS.GAME_STATE)
}

module.exports = {
  STORAGE_KEYS,
  setItem,
  getItem,
  removeItem,
  clearAll,
  getOpenid,
  setOpenid,
  getUserInfo,
  setUserInfo,
  getRecentTopics,
  addRecentTopic,
  getGameState,
  setGameState,
  clearGameState
}
