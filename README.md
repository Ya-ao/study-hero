# Study-Hero 学习英雄（该应用为AI生成）

<div align="center">

**AI 驱动的游戏化学习微信小程序**

通过 AI 智能生成问答卡片，以闯关答题的形式帮助用户轻松愉快地掌握知识

[![微信小程序](https://img.shields.io/badge/平台-微信小程序-green.svg)](https://developers.weixin.qq.com/miniprogram/dev/framework/)
[![Node.js](https://img.shields.io/badge/后端-Node.js-blue.svg)](https://nodejs.org/)
[![AI Powered](https://img.shields.io/badge/AI-豆包大模型-orange.svg)](https://www.volcengine.com/)

</div>

---

## ✨ 核心亮点

### 🤖 AI 智能生成题目
- **火山引擎豆包大模型** 驱动，智能生成个性化问答内容
- 支持任意主题，AI 自动生成高质量选择题
- 包含详细答案解析，帮助用户理解知识点

### 🎮 游戏化学习体验
- 闯关模式增加学习趣味性
- 成就系统激励持续学习
- 即时反馈，答题后立即获得解析

### 📊 学习数据追踪
- 记录学习历程，统计答题数据
- 连续学习天数追踪
- 错题回顾，针对性复习

---

## 📱 功能模块

| 模块 | 功能 | 描述 |
|------|------|------|
| 🏠 首页 | 快速开始 | 一键进入主题设置页 |
| | 今日统计 | 显示今日答题数、正确率、连续天数 |
| | 最近学习 | 展示最近学习主题列表 |
| 📝 主题设置 | 主题输入 | 支持自由输入学习主题 |
| | 热门推荐 | 展示热门学习主题标签 |
| | 难度选择 | 简单/中等/困难三档 |
| | 题目数量 | 5/10/15/20题可选 |
| 🎯 答题 | 问题展示 | 卡片式展示 AI 生成的问题 |
| | 选项选择 | 单选四个选项 |
| | 进度显示 | 显示当前进度和题号 |
| | 答案解析 | 答题后展示正确答案和 AI 解析 |
| 🏆 结果 | 得分展示 | 显示最终得分和正确率 |
| | 错题回顾 | 展示答错的题目及解析 |
| | 再来一次 | 重新开始当前主题 |
| 👤 个人中心 | 用户信息 | 显示头像和昵称 |
| | 学习统计 | 总答题数、总正确率、连续天数 |
| | 成就展示 | 展示已解锁成就徽章 |

---

## 🛠️ 技术栈

### 前端
| 技术 | 说明 |
|------|------|
| 微信小程序原生框架 | 小程序基础框架 |
| JavaScript (ES6+) | 开发语言 |
| WXML | 模板语言 |
| WXSS | 样式语言 |

### 后端
| 技术 | 说明 |
|------|------|
| Node.js | 后端服务运行环境 |
| Express | Web 框架 |
| Supabase | PostgreSQL 数据库 |
| 火山引擎豆包大模型 | AI 问答生成服务 |

---

## 📁 项目结构

```
study-hero/
├── miniprogram/                 # 微信小程序前端
│   ├── pages/                   # 页面
│   │   ├── index/               # 首页
│   │   ├── topic/               # 主题设置页
│   │   ├── game/                # 答题游戏页
│   │   ├── result/              # 结果页
│   │   ├── profile/             # 个人中心
│   │   └── stats/               # 统计页
│   ├── components/              # 组件
│   │   ├── question-card/       # 问题卡片组件
│   │   ├── progress-bar/        # 进度条组件
│   │   ├── stat-card/           # 统计卡片组件
│   │   ├── topic-card/          # 主题卡片组件
│   │   └── loading/             # 加载组件
│   ├── utils/                   # 工具函数
│   ├── config/                  # 配置文件
│   └── images/                  # 静态图片
│
├── server/                      # Node.js 后端
│   ├── src/
│   │   ├── controllers/         # 控制器
│   │   ├── models/              # 数据模型
│   │   ├── routes/              # 路由
│   │   ├── services/            # 业务逻辑
│   │   │   └── ai.js            # AI 服务（核心）
│   │   ├── middlewares/         # 中间件
│   │   └── utils/               # 工具函数
│   ├── config/                  # 配置文件
│   └── database/                # 数据库初始化
│
└── .trae/documents/             # 项目文档
    ├── 产品需求文档.md
    └── 技术架构文档.md
```

---

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0
- 微信开发者工具

### 后端启动

```bash
cd server
npm install
cp .env.example .env
# 配置 .env 文件中的环境变量
npm run dev
```

### 前端启动

1. 打开微信开发者工具
2. 导入 `miniprogram` 目录
3. 修改 `miniprogram/config/index.js` 中的 `BASE_URL` 为后端地址
4. 点击编译运行

### 环境变量配置

```env
# 服务端口
PORT=3000

# 数据库配置
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# 微信小程序配置
WECHAT_APPID=your_wechat_appid
WECHAT_SECRET=your_wechat_secret

# AI 配置（火山引擎豆包大模型）
AI_API_KEY=your_ai_api_key
AI_API_URL=https://ark.cn-beijing.volces.com/api/v3/chat/completions
```

---

## 🤖 AI 问答生成

本项目核心功能由 **火山引擎豆包大模型** 驱动：

### 工作流程
1. 用户输入学习主题（如"历史知识"、"编程基础"等）
2. 选择难度等级（简单/中等/困难）和题目数量
3. AI 根据主题和难度智能生成选择题
4. 每道题目包含：问题内容、4个选项、正确答案、详细解析

### Prompt 设计
```
你是一位专业的教育专家，请围绕主题"{topic}"生成{count}道{difficulty}难度的选择题。

难度说明：
- easy: 基础知识
- medium: 中等难度  
- hard: 较高难度

要求：
1. 每道题有4个选项，只有一个正确答案
2. 题目要有趣味性
3. 包含答案解析
4. 返回JSON格式
```

---

## 🏆 成就系统

| 成就名称 | 图标 | 解锁条件 |
|----------|------|----------|
| 初出茅庐 | 🌱 | 完成首次答题 |
| 学海无涯 | 📚 | 累计答题100道 |
| 百题斩 | ⚔️ | 累计答题500道 |
| 千题王 | 👑 | 累计答题1000道 |
| 连续7天 | 🔥 | 连续学习7天 |
| 连续30天 | 💪 | 连续学习30天 |
| 满分达人 | 💯 | 单次答题满分 |
| 正确率90% | 🎯 | 单次正确率≥90% |

---

## 📊 API 接口

### 用户相关
- `GET /api/user/info` - 获取用户信息
- `PUT /api/user/info` - 更新用户信息

### 答题相关
- `POST /api/game/questions` - AI 生成题目
- `POST /api/game/submit` - 提交答题结果

### 统计相关
- `GET /api/stats/today` - 获取今日统计
- `GET /api/stats/recent` - 获取最近学习记录
- `GET /api/stats/history` - 获取学习历史
- `GET /api/stats/achievements` - 获取成就列表

详细 API 文档请查看 [server/API.md](server/API.md)

---

## 📄 License

MIT License

---

<div align="center">

**Made with ❤️ by Ya-ao**

</div>
