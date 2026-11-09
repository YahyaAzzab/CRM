# CRM MERN

Application web de gestion de la relation client (CRM) : ajouter, rechercher, modifier le statut et supprimer des contacts.

## Démo en ligne

| Rôle | URL | Description |
|------|-----|-------------|
| **Interface (frontend)** | [https://crm-5fv7.vercel.app](https://crm-5fv7.vercel.app/) | Application React utilisée par l’utilisateur pour gérer les clients |
| **API (backend)** | [https://crm-one-ashen-13.vercel.app](https://crm-one-ashen-13.vercel.app/) | Serveur Express qui expose les routes REST et parle à MongoDB |
| **Clients (JSON)** | [https://crm-one-ashen-13.vercel.app/api/clients](https://crm-one-ashen-13.vercel.app/api/clients) | Liste des clients renvoyée par l’API |
| **Code source** | [https://github.com/YahyaAzzab/CRM](https://github.com/YahyaAzzab/CRM) | Dépôt GitHub du projet |

## Stack

- **MongoDB Atlas** — base de données cloud
- **Express / Node.js** — API REST
- **React (Vite)** — interface
- **Vercel** — hébergement frontend + backend
- **Framer Motion** — animations UI

## Fonctionnalités

- Créer / modifier / supprimer un client
- Champs : nom, email, entreprise, téléphone, statut, notes
- Recherche, filtres par statut (stats cliquables), tri
- Activité récente
- Copier l’email, export CSV
- Intro animée + micro-interactions
- Gestion des erreurs API (ex. email déjà utilisé → 409)

## Structure du projet

```
CRM/
├── backend/     # API Express + modèle Client + MongoDB
├── frontend/    # Interface React
├── postman/     # Collection de tests API
└── README.md
```

## Lancement en local

### Prérequis

- Node.js
- Un cluster MongoDB Atlas + URI de connexion

### Variables d’environnement

Copier les exemples puis renseigner les valeurs :

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

`backend/.env` :

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://...
```

`frontend/.env` :

```env
VITE_API_URL=http://localhost:4000
```

### Démarrage

```bash
# Terminal 1 — API
cd backend
npm install
npm run dev

# Terminal 2 — Interface
cd frontend
npm install
npm run dev
```

- Frontend local : [http://localhost:5173](http://localhost:5173)
- API locale : [http://localhost:4000](http://localhost:4000)

## API REST

Base URL prod : `https://crm-one-ashen-13.vercel.app`

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/` | Santé de l’API |
| `GET` | `/api/clients` | Liste des clients |
| `GET` | `/api/clients/:id` | Détail d’un client |
| `POST` | `/api/clients` | Créer un client |
| `PUT` | `/api/clients/:id` | Modifier un client |
| `DELETE` | `/api/clients/:id` | Supprimer un client |

Collection Postman : [`postman/CRM_API.postman_collection.json`](postman/CRM_API.postman_collection.json)

## Déploiement

Deux projets Vercel partagent le même dépôt GitHub :

1. **Backend** — Root Directory `backend`  
   Variables : `MONGODB_URI`, `CLIENT_ORIGIN=https://crm-5fv7.vercel.app`
2. **Frontend** — Root Directory `frontend`  
   Variable : `VITE_API_URL=https://crm-one-ashen-13.vercel.app`  
   Build : `npm run build` · Output : `dist`

Chaque `git push` sur `main` redéploie automatiquement.
