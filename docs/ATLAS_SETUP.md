# Étape 3 — MongoDB Atlas

## Checklist

1. Compte sur [cloud.mongodb.com](https://cloud.mongodb.com)
2. **New Project** → nom `crm`
3. **Create Cluster** → Free (M0), région Europe, nom `crm-cluster`
4. **Database Access** → Add User  
   - User : `crm_user`  
   - Mot de passe : lettres + chiffres uniquement (note-le)  
   - Rôle : Read and write to any database
5. **Network Access** → Add IP Address → `0.0.0.0/0` (commentaire : TP CRM)
6. **Database → Clusters → Connect → Drivers → Node.js**  
   Copie l’URI qui commence par `mongodb+srv://`

## Brancher le projet

Dans `backend/.env` :

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
MONGODB_URI=mongodb+srv://crm_user:MOT_DE_PASSE@crm-cluster.XXXX.mongodb.net/crm?retryWrites=true&w=majority
```

Remplace `MOT_DE_PASSE` et le host `XXXX`. Le nom de base `crm` doit être **avant** le `?`.

Relance :

```bash
cd backend
npm run dev
```

Tu dois voir : `✅ MongoDB connecté`

## Vérifier dans Atlas

**Data Explorer** → base `crm` → collection `clients` (apparaît après le premier POST).
