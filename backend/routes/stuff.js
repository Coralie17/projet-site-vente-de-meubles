// Import du framework Express.js dans notre application Node.js
// => permet de créer facilement des serveurs web et des applications web.
const express = require('express');

 // Import Middleware d'authentification
const auth = require('../middleware/auth');

// Création d'un nouvel objet routeur Express
// = un middleware qui permet de regrouper des routes associées à une certaine partie de l'application
const router = express.Router(); 

// Import du contrôleur de gestion des objets
const stuffCtrl = require('../controllers/stuff')

// Middleware pour gérer les en-têtes CORS (Cross-Origin Resource Sharing)
// Les en-têtes CORS sont utilisés pour permettre à un serveur de contrôler l'accès à ses ressources depuis une origine différente (un domaine, un protocole ou un port différent) 
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // = le serveur autorise toutes les origines à accéder à ses ressources, et donc à effectuer des requêtes vers le serveur
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Définit les en-têtes HTTP autorisés lors des requêtes CORS
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Définit les méthodes HTTP autorisées lors des requêtes CORS = que le client peut utiliser pour accéder aux ressources sur le serveur
    next(); // appel de la fonction next() pour passer le contrôle au middleware suivant dans la chaîne de middleware => permet de poursuivre le traitement de la requête
  });
  

  // ROUTES pour la gestion des objets :
   
  // router.post('/', auth, stuffCtrl.createThing);
  // router.put('/:id', auth, stuffCtrl.modifyThing);
  // router.delete('/:id', auth, stuffCtrl.deleteThing);
  // router.get('/:id', auth, stuffCtrl.getOneThing);
  // router.get('/', auth, stuffCtrl.getAllThings);

  router.post('/', auth, stuffCtrl.createThing); // Créer un objet
  router.put('/:id', auth, stuffCtrl.modifyThing); // Modifier un objet
  router.delete('/:id', auth, stuffCtrl.deleteThing);  // Supprimer un objet
  router.get('/:id', stuffCtrl.getOneThing, auth,);  // Obtenir un objet par son identifiant
  router.get('/', stuffCtrl.getAllThings, auth,); // Obtenir tous les objets

  module.exports = router; // Exporter le routeur