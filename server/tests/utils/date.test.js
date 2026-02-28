const { formatDate, formatDateTime, isToday, isYesterday, getTodayStart, getTodayEnd } = require('../src/utils/date');

describe('Date Utils', () => {
  test('formatDate should return YYYY-MM-DD format', () => {
    const date = new Date('2024-01-15T10:30:00');
    const result = formatDate(date);
    
    expect(result).toBe('2024-01-15');
  });

  test('formatDateTime should return YYYY-MM-DD HH:mm:ss format', () => {
    const date = new Date('2024-01-15T10:30:45');
    const result = formatDateTime(date);
    
    expect(result).toBe('2024-01-15 10:30:45');
  });

  test('isToday should return true for today', () => {
    const today = new Date();
    const result = isToday(today);
    
    expect(result).toBe(true);
  });

  test('isToday should return false for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const result = isToday(yesterday);
    
    expect(result).toBe(false);
  });

  test('isYesterday should return true for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const result = isYesterday(yesterday);
    
    expect(result).toBe(true);
  });

  test('getTodayStart should return start of day', () => {
    const start = getTodayStart();
    
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    expect(start.getSeconds()).toBe(0);
  });

  test('getTodayEnd should return end of day', () => {
    const end = getTodayEnd();
    
    expect(end.getHours()).toBe(23);
    expect(end.getMinutes()).toBe(59);
    expect(end.getSeconds()).toBe(59);
  });
});
