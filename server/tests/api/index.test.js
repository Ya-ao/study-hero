const request = require('supertest');
const app = require('../app');

describe('API Endpoints', () => {
  describe('GET /', () => {
    test('should return API info', async () => {
      const res = await request(app).get('/');
      
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('学习英雄 API');
      expect(res.body.status).toBe('running');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const res = await request(app).get('/health');
      
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /api/topics/hot', () => {
    test('should return hot topics', async () => {
      const res = await request(app).get('/api/topics/hot');
      
      expect(res.status).toBe(200);
      expect(res.body.code).toBe(0);
      expect(res.body.data.topics).toContain('历史');
      expect(res.body.data.topics).toContain('科学');
    });
  });

  describe('GET /api/user/info', () => {
    test('should return error without openid', async () => {
      const res = await request(app).get('/api/user/info');
      
      expect(res.body.code).toBe(401);
    });
  });

  describe('POST /api/game/questions', () => {
    test('should return error without openid', async () => {
      const res = await request(app)
        .post('/api/game/questions')
        .send({ topic: '历史' });
      
      expect(res.body.code).toBe(401);
    });
  });

  describe('POST /api/game/submit', () => {
    test('should return error without openid', async () => {
      const res = await request(app)
        .post('/api/game/submit')
        .send({
          topic: '历史',
          difficulty: 'medium',
          totalQuestions: 10,
          correctCount: 8,
          duration: 300,
          questions: []
        });
      
      expect(res.body.code).toBe(401);
    });
  });

  describe('GET /api/stats/today', () => {
    test('should return error without openid', async () => {
      const res = await request(app).get('/api/stats/today');
      
      expect(res.body.code).toBe(401);
    });
  });

  describe('GET /api/stats/recent', () => {
    test('should return error without openid', async () => {
      const res = await request(app).get('/api/stats/recent');
      
      expect(res.body.code).toBe(401);
    });
  });

  describe('GET /api/stats/history', () => {
    test('should return error without openid', async () => {
      const res = await request(app).get('/api/stats/history');
      
      expect(res.body.code).toBe(401);
    });
  });

  describe('GET /api/stats/achievements', () => {
    test('should return error without openid', async () => {
      const res = await request(app).get('/api/stats/achievements');
      
      expect(res.body.code).toBe(401);
    });
  });

  describe('404 Not Found', () => {
    test('should return 404 for unknown route', async () => {
      const res = await request(app).get('/api/unknown');
      
      expect(res.status).toBe(404);
      expect(res.body.code).toBe(-1);
    });
  });
});
