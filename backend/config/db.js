const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<db_password>') || uri.includes('xxxxx')) {
    console.warn(
      '⚠️  MONGODB_URI manquant ou placeholder. Ajoute ton URI Atlas dans backend/.env (étape 3).'
    );
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connecté');
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB :', error.message);
    return false;
  }
}

module.exports = connectDB;
