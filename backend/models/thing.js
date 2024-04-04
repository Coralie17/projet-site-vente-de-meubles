// Import du module `mangoose` dans notre application Node.js
// Mangoose = Bibliothèque - outil de modélisation d'objet MongoDB pour Node.js
// => permet d'interagir facilement avec une base de données MongoDB en utilisant des schémas / modèles / fonctionnalités
const mongoose = require('mongoose'); 

// Définition du schéma de données pour l'entité "Thing"
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },  // Champ "title" de type String, requis
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// Export du modèle "Thing" basé sur le schéma défini ci-dessus
module.exports = mongoose.model('Thing', thingSchema);