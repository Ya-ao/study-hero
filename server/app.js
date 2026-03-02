require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config');

const userRoutes = require('./src/routes/user');
const gameRoutes = require('./src/routes/game');
const statsRoutes = require('./src/routes/stats');
const topicRoutes = require('./src/routes/topic');
const errorHandler = require('./src/middlewares/error');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({
    name: '学习英雄 API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/topics', topicRoutes);

app.use((req, res) => {
  res.status(404).json({
    code: -1,
    data: null,
    message: '接口不存在'
  });
});

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${config.env}`);
});

module.exports = app;
