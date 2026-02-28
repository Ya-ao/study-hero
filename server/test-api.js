const http = require('http');

function makeRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function runTests() {
  console.log('=== API 测试开始 ===\n');

  console.log('1. 测试根路径');
  const root = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  });
  console.log(JSON.stringify(root, null, 2));
  console.log();

  console.log('2. 测试健康检查');
  const health = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/health',
    method: 'GET'
  });
  console.log(JSON.stringify(health, null, 2));
  console.log();

  console.log('3. 测试热门主题');
  const topics = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/topics/hot',
    method: 'GET'
  });
  console.log(JSON.stringify(topics, null, 2));
  console.log();

  console.log('4. 测试用户登录 (开发模式)');
  const loginBody = JSON.stringify({ openid: 'test-user-001' });
  const login = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(loginBody)
    }
  }, loginBody);
  console.log(JSON.stringify(login, null, 2));
  console.log();

  console.log('5. 测试获取用户信息 (需要认证)');
  const userInfo = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/user/info',
    method: 'GET',
    headers: {
      'x-openid': 'test-user-001'
    }
  });
  console.log(JSON.stringify(userInfo, null, 2));
  console.log();

  console.log('6. 测试今日统计 (需要认证)');
  const today = await makeRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/api/stats/today',
    method: 'GET',
    headers: {
      'x-openid': 'test-user-001'
    }
  });
  console.log(JSON.stringify(today, null, 2));
  console.log();

  console.log('=== API 测试完成 ===');
}

runTests().catch(console.error);
