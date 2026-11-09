const mongoose = require('mongoose');

const STATUTS = ['prospect', 'client', 'inactif'];

const clientSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
      minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    entreprise: {
      type: String,
      trim: true,
      default: '',
    },
    telephone: {
      type: String,
      trim: true,
      default: '',
    },
    statut: {
      type: String,
      enum: {
        values: STATUTS,
        message: 'Statut invalide. Valeurs autorisées : prospect, client, inactif',
      },
      default: 'prospect',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
      maxlength: [500, 'Les notes ne peuvent pas dépasser 500 caractères'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Client', clientSchema);
module.exports.STATUTS = STATUTS;
