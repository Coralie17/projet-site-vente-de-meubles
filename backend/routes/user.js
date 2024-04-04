const express = require('express');
const router = express.Router(); // Création d'un routeur Express

const userCtrl = require('../controllers/user');  // Import du contrôleur de gestion des utilisateurs

// Routes pour la gestion des utilisateurs
router.post('/signup', userCtrl.signup);  // Inscription d'un nouvel utilisateur
router.post('/login', userCtrl.login);  // Connexion d'un utilisateur existant

module.exports = router; // Exporter le routeur