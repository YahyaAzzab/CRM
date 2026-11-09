const mongoose = require('mongoose');

function isUriReady(uri) {
  return Boolean(uri) && !uri.includes('<db_password>') && !uri.includes('xxxxx');
}

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!isUriReady(uri)) {
    console.warn(
      '⚠️  MONGODB_URI manquant. Suis docs/ATLAS_SETUP.md puis renseigne backend/.env'
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

function isDBReady() {
  return mongoose.connection.readyState === 1;
}

module.exports = connectDB;
module.exports.isDBReady = isDBReady;
