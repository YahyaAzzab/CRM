# Étape 6 — Déployer sur Vercel

Tu créeras **2 projets** Vercel à partir du **même** dépôt GitHub.

## Partie 1 — Backend

1. [vercel.com](https://vercel.com) → Add New → Project → Import `YahyaAzzab/CRM`
2. **Project Name** : `crm-backend`
3. **Root Directory** → Edit → `backend` ⚠️ obligatoire
4. Framework : Vercel détecte Express via `server.js`
5. **Environment Variables** :
   - `MONGODB_URI` = ton URI Atlas
   - `CLIENT_ORIGIN` = laisse temporairement `http://localhost:5173` (tu le mettras à jour après le frontend)
6. Deploy
7. Copie l’URL (ex. `https://crm-backend-xxx.vercel.app`) et teste `/api/clients`

## Partie 2 — Frontend

1. Add New → Project → **même dépôt**
2. **Project Name** : `crm-frontend`
3. **Root Directory** → `frontend`
4. Build Command : `npm run build`
5. Output Directory : `dist`
6. **Environment Variables** :
   - `VITE_API_URL` = URL du backend Vercel (sans `/` final)
7. Deploy
8. Copie l’URL frontend (ex. `https://crm-frontend-xxx.vercel.app`)

## Partie 3 — CORS

1. Projet `crm-backend` → Settings → Environment Variables
2. Mets à jour `CLIENT_ORIGIN` = URL exacte du frontend (sans `/` final)
3. Deployments → Redeploy le backend

## Partie 4 — Vérification

1. Ouvre le frontend sur téléphone / autre navigateur
2. Ajoute un client, change le statut, recharge
3. Vérifie dans Atlas → Data Explorer → `crm` → `clients`

## CI/CD

Chaque `git push` sur `main` redéploie automatiquement les 2 projets.
