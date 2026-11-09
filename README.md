# CRM MERN

Application CRM full-stack pour gérer des clients (prospect / client / inactif).

## Stack

- **MongoDB Atlas** — base de données cloud
- **Express** — API REST (backend)
- **React + Vite** — interface (frontend)
- **Node.js** — runtime

## Structure

```
CRM/
├── backend/      # API Express + MongoDB
├── frontend/     # Application React (Vite)
├── docs/         # Guide Atlas
├── postman/      # Collection Postman
└── README.md
```

## Progression

| Étape | Contenu | Statut |
|-------|---------|--------|
| 1 | Socle projet + GitHub | ✅ |
| 2 | Backend Express + API clients | ✅ |
| 3 | MongoDB Atlas + collection Postman | ✅ |
| 4 | Interface React + animations | ✅ |
| 5 | Branchement React ↔ API | ✅ |
| 6 | Déploiement Vercel + livrables | ⏳ |

## Lancement local

### 1. Variables d’environnement

`backend/.env` :

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://crm_user:MOT_DE_PASSE@crm-cluster.XXXX.mongodb.net/crm?retryWrites=true&w=majority
```

`frontend/.env` :

```env
VITE_API_URL=http://localhost:4000
```

Guide Atlas : [docs/ATLAS_SETUP.md](docs/ATLAS_SETUP.md)

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

→ [http://localhost:4000](http://localhost:4000)

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

→ [http://localhost:5173](http://localhost:5173)

## API

| Méthode | URL | Action |
|---------|-----|--------|
| GET | `/` | Santé de l’API |
| GET | `/api/clients` | Lister |
| POST | `/api/clients` | Créer |
| PUT | `/api/clients/:id` | Modifier |
| DELETE | `/api/clients/:id` | Supprimer |

Collection Postman : [postman/CRM_API.postman_collection.json](postman/CRM_API.postman_collection.json)

## Comptes

- [GitHub](https://github.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- [Vercel](https://vercel.com/signup) — Continue with GitHub
