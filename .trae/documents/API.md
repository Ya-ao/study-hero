# 学习英雄 API 接口文档

## 基础信息

| 项目 | 说明 |
|------|------|
| 基础URL | `http://localhost:3000` |
| 协议 | HTTP/HTTPS |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |

## 统一响应格式

```json
{
  "code": 0,
  "data": {},
  "message": "success"
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | number | 状态码，0表示成功，非0表示失败 |
| data | object | 返回数据 |
| message | string | 提示信息 |

## 认证方式

需要认证的接口需在请求头中携带：

```
x-openid: 用户openid
```

---

# 用户模块

## 1. 用户登录

**POST** `/api/user/login`

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | 是* | 微信登录凭证（生产环境） |
| openid | string | 是* | 用户标识（开发环境测试用） |

> *生产环境使用 `code`，开发环境可使用 `openid` 直接登录

### 请求示例

**生产环境：**
```json
{
  "code": "081xGa0w3nXZg23sWb3w3RjS0w3xGa0B"
}
```

**开发环境：**
```json
{
  "openid": "test-user-001"
}
```

### 响应示例

```json
{
  "code": 0,
  "data": {
    "openid": "oXXXX",
    "nickName": "学习英雄",
    "avatarUrl": "",
    "stats": {
      "totalQuestions": 100,
      "correctCount": 80,
      "streakDays": 5
    }
  },
  "message": "success"
}
```

---

## 2. 获取用户信息

**GET** `/api/user/info`

需要认证：是

### 响应示例

```json
{
  "code": 0,
  "data": {
    "nickName": "学习英雄",
    "avatarUrl": "https://...",
    "stats": {
      "totalQuestions": 100,
      "correctCount": 80,
      "streakDays": 5
    }
  },
  "message": "success"
}
```

---

## 3. 更新用户信息

**PUT** `/api/user/info`

需要认证：是

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| nickName | string | 否 | 昵称 |
| avatarUrl | string | 否 | 头像URL |

### 请求示例

```json
{
  "nickName": "知识达人",
  "avatarUrl": "https://example.com/avatar.png"
}
```

### 响应示例

```json
{
  "code": 0,
  "data": {
    "nickName": "知识达人",
    "avatarUrl": "https://example.com/avatar.png"
  },
  "message": "success"
}
```

---

# 答题模块

## 4. 生成题目

**POST** `/api/game/questions`

需要认证：是

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| topic | string | 是 | 学习主题 |
| difficulty | string | 否 | 难度：easy/medium/hard，默认medium |
| count | number | 否 | 题目数量，默认10 |

### 请求示例

```json
{
  "topic": "历史",
  "difficulty": "medium",
  "count": 10
}
```

### 响应示例

```json
{
  "code": 0,
  "data": {
    "questions": [
      {
        "id": 1,
        "question": "唐朝的开国皇帝是谁？",
        "options": ["李渊", "李世民", "李治", "李隆基"],
        "answer": 0
      },
      {
        "id": 2,
        "question": "赤壁之战发生在哪一年？",
        "options": ["200年", "208年", "220年", "230年"],
        "answer": 1
      }
    ]
  },
  "message": "success"
}
```

### 题目数据结构

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 题目序号 |
| question | string | 题目内容 |
| options | string[] | 选项数组（4个选项） |
| answer | number | 正确答案索引（0-3） |

---

## 5. 提交答题结果

**POST** `/api/game/submit`

需要认证：是

### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| topic | string | 是 | 学习主题 |
| difficulty | string | 否 | 难度 |
| totalQuestions | number | 是 | 题目总数 |
| correctCount | number | 是 | 正确数量 |
| duration | number | 否 | 答题时长（秒） |
| questions | array | 是 | 题目详情数组 |

### 请求示例

```json
{
  "topic": "历史",
  "difficulty": "medium",
  "totalQuestions": 10,
  "correctCount": 8,
  "duration": 120,
  "questions": [
    {
      "id": 1,
      "question": "唐朝的开国皇帝是谁？",
      "options": ["李渊", "李世民", "李治", "李隆基"],
      "answer": 0,
      "userAnswer": 0
    }
  ]
}
```

### 响应示例

```json
{
  "code": 0,
  "data": {
    "score": 80,
    "achievements": [
      {
        "type": "first_study",
        "name": "初出茅庐",
        "icon": "🎯"
      }
    ]
  },
  "message": "success"
}
```

---

# 统计模块

## 6. 获取今日统计

**GET** `/api/stats/today`

需要认证：是

### 响应示例

```json
{
  "code": 0,
  "data": {
    "questionCount": 30,
    "correctRate": 80,
    "streakDays": 5
  },
  "message": "success"
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| questionCount | number | 今日答题数量 |
| correctRate | number | 今日正确率（百分比） |
| streakDays | number | 连续学习天数 |

---

## 7. 获取最近学习记录

**GET** `/api/stats/recent`

需要认证：是

### 响应示例

```json
{
  "code": 0,
  "data": {
    "records": [
      {
        "topic": "历史",
        "score": 80,
        "createTime": "2025-02-27"
      },
      {
        "topic": "科学",
        "score": 90,
        "createTime": "2025-02-26"
      }
    ]
  },
  "message": "success"
}
```

---

## 8. 获取学习历史

**GET** `/api/stats/history`

需要认证：是

### 查询参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| limit | number | 否 | 每页数量，默认20 |
| offset | number | 否 | 偏移量，默认0 |

### 请求示例

```
GET /api/stats/history?limit=10&offset=0
```

### 响应示例

```json
{
  "code": 0,
  "data": {
    "records": [
      {
        "id": 1,
        "topic": "历史",
        "score": 80,
        "totalQuestions": 10,
        "correctCount": 8,
        "duration": 120,
        "createTime": "2025-02-27"
      }
    ]
  },
  "message": "success"
}
```

---

## 9. 获取成就列表

**GET** `/api/stats/achievements`

需要认证：是

### 响应示例

```json
{
  "code": 0,
  "data": {
    "achievements": [
      {
        "type": "first_study",
        "name": "初出茅庐",
        "icon": "🎯",
        "unlockedAt": "2025-02-27"
      },
      {
        "type": "streak_3",
        "name": "坚持不懈",
        "icon": "🔥",
        "unlockedAt": "2025-02-27"
      }
    ]
  },
  "message": "success"
}
```

---

# 主题模块

## 10. 获取热门主题

**GET** `/api/topics/hot`

需要认证：否

### 响应示例

```json
{
  "code": 0,
  "data": {
    "topics": ["历史", "科学", "地理", "文学", "艺术", "体育"]
  },
  "message": "success"
}
```

---

# 成就系统

| 类型 | 名称 | 图标 | 解锁条件 |
|------|------|------|----------|
| first_study | 初出茅庐 | 🎯 | 首次完成学习 |
| streak_3 | 坚持不懈 | 🔥 | 连续学习3天 |
| streak_7 | 周周向上 | ⭐ | 连续学习7天 |
| streak_30 | 月度学霸 | 🏆 | 连续学习30天 |
| questions_100 | 百题斩 | 💯 | 累计答题100道 |
| questions_500 | 知识达人 | 📚 | 累计答题500道 |
| perfect_score | 满分达人 | ✨ | 单次答题满分 |
| accuracy_80 | 准确率高 | 🎖️ | 正确率达到80% |

---

# 错误码说明

| code | 说明 |
|------|------|
| 0 | 成功 |
| -1 | 通用错误 |
| 404 | 资源不存在 |

---

# 附录

## 完整接口列表

| 方法 | 路径 | 认证 | 说明 |
|------|------|------|------|
| POST | /api/user/login | 否 | 用户登录 |
| GET | /api/user/info | 是 | 获取用户信息 |
| PUT | /api/user/info | 是 | 更新用户信息 |
| POST | /api/game/questions | 是 | 生成题目 |
| POST | /api/game/submit | 是 | 提交答题结果 |
| GET | /api/stats/today | 是 | 今日统计 |
| GET | /api/stats/recent | 是 | 最近记录 |
| GET | /api/stats/history | 是 | 学习历史 |
| GET | /api/stats/achievements | 是 | 成就列表 |
| GET | /api/topics/hot | 否 | 热门主题 |
