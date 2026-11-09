# CRM MERN

Application CRM full-stack pour gérer des clients (prospect / client / inactif).

## Stack

- **MongoDB Atlas** — base de données cloud
- **Express** — API REST (backend)
- **React** — interface (frontend)
- **Node.js** — runtime

## Structure

```
CRM/
├── backend/
│   ├── config/db.js
│   ├── models/Client.js
│   ├── routes/clients.js
│   ├── server.js
│   └── .env.example
├── frontend/     # Application React (étape 4)
└── README.md
```

## Progression

| Étape | Contenu | Statut |
|-------|---------|--------|
| 1 | Socle projet + GitHub | ✅ |
| 2 | Backend Express + API clients | ✅ |
| 3 | MongoDB Atlas (variables `.env`) | ⏳ |
| 4 | Interface React + animations | ⏳ |
| 5 | Branchement React ↔ API | ⏳ |
| 6 | Déploiement Vercel + livrables | ⏳ |

## Backend — lancement local

```bash
cd backend
npm install
npm run dev
```

Ouvre ensuite : [http://localhost:4000](http://localhost:4000)

### Endpoints API

| Méthode | URL | Action |
|---------|-----|--------|
| GET | `/` | Santé de l’API |
| GET | `/api/clients` | Lister les clients |
| GET | `/api/clients/:id` | Voir un client |
| POST | `/api/clients` | Créer un client |
| PUT | `/api/clients/:id` | Modifier un client |
| DELETE | `/api/clients/:id` | Supprimer un client |

> **Étape 3** : copie `.env.example` → `.env` et colle ton `MONGODB_URI` Atlas. Sans cette variable, le serveur démarre mais les routes clients ne peuvent pas lire/écrire la base.

## Comptes nécessaires

- [GitHub](https://github.com) — hébergement du code
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) — base (URI à l’étape 3)
- [Vercel](https://vercel.com/signup) — déploiement (étape 6), via « Continue with GitHub »
