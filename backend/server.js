const http = require('http');  // Import du module HTTP de Node.js
const app = require('./app');  // Import de l'application Express définie dans le fichier app.js

// Fonction pour normaliser le port = s'assurer que le port utilisé par le serveur est dans un format correct et valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Définition du port sur lequel le serveur va 'écouter'
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);  // Configuration du port dans l'application Express pour pouvoir y accéder ultérieurement

// Fonction de gestion des erreurs de démarrage du serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':  // Gestion des erreurs de permission (EACCES) 
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':  // Gestion des erreurs de port déjà utilisé (EADDRINUSE)
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du serveur HTTP avec l'application Express
// => va notamment permettre d'écouter les requêtes entrantes et d'y répondre en fonction des routes et des middlewares définis dans notre appli Express
const server = http.createServer(app);

// Gestion des erreurs de démarrage du serveur : 
// => ajout d'un gestionnaire d'événement pour l'événement error du serveur, qui appelle la fonction errorHandler en cas d'erreur :
server.on('error', errorHandler);
// => ajout d'un gestionnaire d'événement pour l'événement listening du serveur, qui affiche un message lorsque le serveur démarre et écoute sur le port spécifié :
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Démarrage du serveur HTTP, écoute sur le port défini
server.listen(port);  
