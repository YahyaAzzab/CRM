# CRM MERN

Application CRM full-stack pour gérer des clients (prospect / client / inactif).

## Stack

- **MongoDB Atlas** — base de données cloud
- **Express** — API REST (backend)
- **React + Vite** — interface (frontend)
- **Node.js** — runtime
- **Vercel** — déploiement

## Structure

```
CRM/
├── backend/      # API Express + MongoDB
├── frontend/     # Application React (Vite)
├── docs/         # Guides Atlas + Vercel
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
| 6 | Déploiement Vercel + livrables | ✅ |

## Lancement local

### Variables

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

### Commandes

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev
```

- API : [http://localhost:4000](http://localhost:4000)
- UI : [http://localhost:5173](http://localhost:5173)

## Documentation

- Atlas : [docs/ATLAS_SETUP.md](docs/ATLAS_SETUP.md)
- Vercel : [docs/VERCEL_DEPLOY.md](docs/VERCEL_DEPLOY.md)
- Postman : [postman/CRM_API.postman_collection.json](postman/CRM_API.postman_collection.json)

## API

| Méthode | URL | Action |
|---------|-----|--------|
| GET | `/` | Santé |
| GET | `/api/clients` | Lister |
| POST | `/api/clients` | Créer |
| PUT | `/api/clients/:id` | Modifier |
| DELETE | `/api/clients/:id` | Supprimer |

## Livrables oral

1. Lien GitHub du dépôt
2. Lien Vercel frontend + lien Vercel API
3. Captures Postman (POST 201 + erreur 400/409)
4. Capture Atlas Data Explorer (sans mot de passe)
5. Ce README

## Repo

https://github.com/YahyaAzzab/CRM
