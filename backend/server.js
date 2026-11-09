require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { isDBReady } = require('./config/db');
const clientsRouter = require('./routes/clients');

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const normalized = origin.replace(/\/$/, '');
      const allowed =
        CLIENT_ORIGINS.includes(normalized) ||
        normalized === 'http://localhost:5173' ||
        normalized === 'http://localhost:3000' ||
        normalized.endsWith('.vercel.app');

      return callback(null, allowed);
    },
  })
);
app.use(express.json());

app.use(async (req, res, next) => {
  if (!isDBReady() && process.env.MONGODB_URI) {
    await connectDB();
  }
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'API CRM opérationnelle',
    version: '1.0.0',
    endpoints: {
      sante: 'GET /',
      clients: 'GET|POST /api/clients',
      client: 'GET|PUT|DELETE /api/clients/:id',
    },
  });
});

app.use('/api/clients', clientsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

async function demarrer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Serveur CRM sur http://localhost:${PORT}`);
  });
}

if (require.main === module) {
  demarrer();
}

module.exports = app;
