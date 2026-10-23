const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
  }
);

const questionSetRoutes = require(`./src/routes/question-set.routes`);
app.use(`/api/v1/question-sets`, questionSetRoutes);

app.get('/api/v1/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ database: "up" });
  } catch (err) {
    res.status(503).json({ database: "down" });
  }
});

app.get('/', (req, res) => {
  res.send('QuizClimb Backend API is running!');
});

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}/api/v1`);
});

const gameInfo = require('./src/config/game-info');
app.get('/api/v1/game-info', (req, res) => {
  res.json(gameInfo);
});

const resultsRepository = require('./src/repositories/results.repository');

app.get('/api/v1/results', async (req, res) => {
  try {
    const hubKey = req.headers['x-hub-key'];
    if (!hubKey || hubKey !== process.env.HUB_KEY && hubKey !== 'dev-hub-key') {
      return res.status(401).json({ error: 'HUB_KEY_REQUIRED' });
    }
    
    const sinceParam = req.query.since ? new Date(req.query.since) : null;
    if (req.query.since && isNaN(sinceParam.getTime())) {
      return res.status(400).json({ error: 'INVALID_SINCE' });
    }

    const results = await resultsRepository.findFinishedGamePlayers(sinceParam);
    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'INTERNAL_SERVER_ERROR' });
  }
});