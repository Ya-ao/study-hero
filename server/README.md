# 学习英雄 - 后端服务

## 项目说明

学习英雄后端服务，提供用户管理、答题、统计等API接口。

## 技术栈

- Node.js 18+
- Express
- Supabase (PostgreSQL)
- 豆包 AI API

## 项目结构

```
server/
├── config/              # 配置文件
├── database/            # 数据库脚本
├── src/
│   ├── controllers/     # 控制器
│   ├── middlewares/     # 中间件
│   ├── models/          # 数据模型
│   ├── routes/          # 路由
│   ├── services/        # 业务服务
│   └── utils/           # 工具函数
├── tests/               # 测试文件
├── app.js               # 应用入口
└── package.json
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填写配置：

```env
PORT=3000
NODE_ENV=development

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

WECHAT_APPID=your_wechat_appid
WECHAT_SECRET=your_wechat_secret

AI_API_KEY=your_ai_api_key
AI_API_URL=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

### 3. 初始化数据库

在 Supabase 控制台执行 `database/init.sql` 中的 SQL 脚本。

### 4. 启动服务

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

### 5. 运行测试

```bash
npm test
```

## API 接口

### 用户模块

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/user/login | 微信登录 |
| GET | /api/user/info | 获取用户信息 |
| PUT | /api/user/info | 更新用户信息 |

### 答题模块

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/game/questions | 生成问题 |
| POST | /api/game/submit | 提交答题结果 |

### 统计模块

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/stats/today | 今日统计 |
| GET | /api/stats/recent | 最近学习 |
| GET | /api/stats/history | 学习历史 |
| GET | /api/stats/achievements | 成就列表 |

### 主题模块

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/topics/hot | 热门主题 |

## 认证说明

所有需要认证的接口需要在请求头中携带 `x-openid`：

```
x-openid: your_openid
```

## 响应格式

### 成功响应

```json
{
  "code": 0,
  "data": {},
  "message": "success"
}
```

### 错误响应

```json
{
  "code": -1,
  "data": null,
  "message": "错误信息"
}
```
