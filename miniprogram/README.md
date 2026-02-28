# 学习英雄 - 微信小程序前端

## 项目说明

这是《学习英雄 - AI问答引导式学习》微信小程序的前端代码。

## 开发环境配置

### 1. 添加 TabBar 图标

在 `miniprogram/images/` 目录下添加以下图标文件（建议尺寸 81x81 像素）：

- `tab-home.png` - 首页图标（灰色）
- `tab-home-active.png` - 首页图标（紫色，选中状态）
- `tab-stats.png` - 统计图标（灰色）
- `tab-stats-active.png` - 统计图标（紫色，选中状态）
- `tab-profile.png` - 我的图标（灰色）
- `tab-profile-active.png` - 我的图标（紫色，选中状态）

颜色参考：
- 灰色：#999999
- 紫色：#667eea

### 2. 配置后端地址

修改 `miniprogram/config/index.js` 中的 `BASE_URL` 为你的后端服务地址：

```javascript
const BASE_URL = 'http://localhost:3000'
```

### 3. 导入项目

1. 打开微信开发者工具
2. 导入项目，选择 `miniprogram` 目录
3. 在项目设置中勾选"不校验合法域名"（开发环境）

## 项目结构

```
miniprogram/
├── components/          # 组件
│   ├── loading/         # 加载组件
│   ├── progress-bar/    # 进度条组件
│   ├── question-card/   # 问题卡片组件
│   ├── stat-card/       # 统计卡片组件
│   └── topic-card/      # 主题卡片组件
├── config/              # 配置
│   └── index.js         # 配置文件
├── pages/               # 页面
│   ├── index/           # 首页
│   ├── topic/           # 主题设置页
│   ├── game/            # 答题游戏页
│   ├── result/          # 结果页
│   ├── profile/         # 个人中心页
│   └── stats/           # 统计页
├── utils/               # 工具函数
│   ├── request.js       # 请求封装
│   ├── storage.js       # 存储封装
│   └── util.js          # 通用工具
├── images/              # 图片资源
├── app.js               # 应用入口
├── app.json             # 应用配置
└── app.wxss             # 全局样式
```

## 功能说明

### 首页
- 快速开始按钮
- 今日统计（答题数、正确率、连续天数）
- 最近学习记录

### 主题设置页
- 输入学习主题
- 热门主题推荐
- 难度选择（简单/中等/困难）
- 题目数量选择（5/10/15/20题）

### 答题游戏页
- 进度显示
- 问题卡片展示
- 选项选择
- 答案反馈

### 结果页
- 得分展示
- 错题回顾
- 再来一次/返回首页

### 个人中心页
- 用户信息
- 学习统计
- 成就展示
- 学习历史

### 统计页
- 今日统计
- 学习历史列表

## API 接口

请确保后端服务已启动并正确配置 API 接口。接口文档请参考 `server/API.md`。
