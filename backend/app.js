const express = require('express'); // Import du module Express.js

const mongoose = require('mongoose');  // Import du module Mongoose pour la connexion à MongoDB

// const Thing = require('./models/thing');

// Import des routes définies dans les autres fichiers
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();   // Création d'une application Express

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://julie:zrHaJAiVUtKGhnuO@cluster0.80ftkv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée...'));

app.use(express.json());  // Utilise le middleware express.json() pour parser les corps des requêtes HTTP entrantes en JSON => permet de récupérer les données envoyées dans le corps des requêtes POST, PUT, PATCH, etc

// Définition des ROUTES pour les ressources "stuff" et "auth"
app.use('/api/stuff', stuffRoutes); 
app.use('/api/auth', userRoutes);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

// app.post('/api/stuff', (req, res, next) => {
//   delete req.body._id;
//   const thing = new Thing({
//     ...req.body
//   });
//   thing.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//     .catch(error => res.status(400).json({ error }));
// });

// app.get('/api/stuff/:id', (req, res, next) => {
//   Thing.findOne({ _id: req.params.id })
//     .then(thing => res.status(200).json(thing))
//     .catch(error => res.status(404).json({ error }));
// });

// app.put('/api/stuff/:id', (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({ error }));
// });

// app.delete('/api/stuff/:id', (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//     .catch(error => res.status(400).json({ error }));
// });


// app.use('/api/stuff', (req, res, next) => {
//   Thing.find()
//     .then(things => res.status(200).json(things))
//     .catch(error => res.status(400).json({ error }));
// });

module.exports = app;  // Exportation de l'application Express pour pouvoir l'utiliser dans d'autres fichiers