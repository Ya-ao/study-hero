const BASE_URL = 'http://101.37.25.146:3000'

const DIFFICULTY_OPTIONS = [
  { value: 'easy', label: '简单' },
  { value: 'medium', label: '中等' },
  { value: 'hard', label: '困难' }
]

const COUNT_OPTIONS = [
  { value: 5, label: '5题' },
  { value: 10, label: '10题' },
  { value: 15, label: '15题' },
  { value: 20, label: '20题' }
]

const DEFAULT_DIFFICULTY = 'medium'
const DEFAULT_COUNT = 10

const ACHIEVEMENT_ICONS = {
  first_study: '🎯',
  streak_3: '🔥',
  streak_7: '⭐',
  streak_30: '🏆',
  questions_100: '💯',
  questions_500: '📚',
  perfect_score: '✨',
  accuracy_80: '🎖️'
}

module.exports = {
  BASE_URL,
  DIFFICULTY_OPTIONS,
  COUNT_OPTIONS,
  DEFAULT_DIFFICULTY,
  DEFAULT_COUNT,
  ACHIEVEMENT_ICONS
}
