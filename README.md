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
├── frontend/     # Application React (Vite)
├── docs/         # Guide Atlas
├── postman/      # Collection Postman
└── README.md
```

## Frontend — lancement local

```bash
cd frontend
npm install
npm run dev
```

Ouvre : [http://localhost:5173](http://localhost:5173)


## Progression

| Étape | Contenu | Statut |
|-------|---------|--------|
| 1 | Socle projet + GitHub | ✅ |
| 2 | Backend Express + API clients | ✅ |
| 3 | MongoDB Atlas + collection Postman | ✅ |
| 4 | Interface React + animations | ✅ |
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

> **MongoDB** : suis [docs/ATLAS_SETUP.md](docs/ATLAS_SETUP.md), colle ton `MONGODB_URI` dans `backend/.env`, puis importe [postman/CRM_API.postman_collection.json](postman/CRM_API.postman_collection.json) dans Postman.

## Comptes nécessaires

- [GitHub](https://github.com) — hébergement du code
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) — base (URI à l’étape 3)
- [Vercel](https://vercel.com/signup) — déploiement (étape 6), via « Continue with GitHub »
