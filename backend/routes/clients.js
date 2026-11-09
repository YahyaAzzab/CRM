const express = require('express');
const Client = require('../models/Client');
const { isDBReady } = require('../config/db');

const router = express.Router();

router.use((req, res, next) => {
  if (!isDBReady()) {
    return res.status(503).json({
      message:
        'Base MongoDB non connectée. Ajoute MONGODB_URI dans backend/.env (voir docs/ATLAS_SETUP.md).',
    });
  }
  next();
});

function envoyerErreur(res, error) {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'Un client avec cet email existe déjà' });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Identifiant client invalide' });
  }

  console.error(error);
  return res.status(500).json({ message: 'Erreur serveur' });
}

// GET /api/clients — liste tous les clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    envoyerErreur(res, error);
  }
});

// GET /api/clients/:id — un client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client introuvable' });
    }
    res.json(client);
  } catch (error) {
    envoyerErreur(res, error);
  }
});

// POST /api/clients — créer
router.post('/', async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    envoyerErreur(res, error);
  }
});

// PUT /api/clients/:id — modifier
router.put('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return res.status(404).json({ message: 'Client introuvable' });
    }

    res.json(client);
  } catch (error) {
    envoyerErreur(res, error);
  }
});

// DELETE /api/clients/:id — supprimer
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client introuvable' });
    }

    res.json({ message: 'Client supprimé', client });
  } catch (error) {
    envoyerErreur(res, error);
  }
});

module.exports = router;
