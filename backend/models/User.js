// Import du module `mangoose` dans notre application Node.js
const mongoose = require('mongoose');

// Import du module `mongoose-unique-validator`
// `mongoose-unique-validator` = extension pour Mongoose
// => permet de valider l'unicité des champs dans les schémas de données Mongoose 
// (utile pour s'assurer par exemple que chaque valeur du champ 'email' est unique = une adresse mail ne peut être utilisée que par un seul utilisateur)
const uniqueValidator = require('mongoose-unique-validator');

// Définition du schéma de données pour l'entité "User"
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },  // Champ "email" de type String, requis, et unique
  password: { type: String, required: true }
});

// Utilisation du plugin "mongoose-unique-validator" pour vérifier l'unicité des champs
userSchema.plugin(uniqueValidator);

// Export du modèle "User" basé sur le schéma défini ci-dessus
module.exports = mongoose.model('User', userSchema);