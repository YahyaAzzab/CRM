require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const clientsRouter = require('./routes/clients');

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: CLIENT_ORIGINS.length === 1 ? CLIENT_ORIGINS[0] : CLIENT_ORIGINS,
  })
);
app.use(express.json());

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
