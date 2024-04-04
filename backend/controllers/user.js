// Import du module 'bcrypt' = Bibliothèque de hachage de mots de passe
const bcrypt = require('bcrypt');

// Import du module 'jsonwebtoken' = Bibliothèque utilisée pour générer et vérifier les jetons JWT (JSON Web Tokens)
// qui sont utilisés pour gérer authentification / autorisation
// = jetons / tokens sécurisés contenant des informations utilisateur (claims) qui peuvent être vérifiées et utilisées pour identifier et autoriser les utilisateurs dans une application
const jwt = require('jsonwebtoken');

const User = require('../models/User'); 


// Fonction 'signup' : pour s'inscrire (créer un nouvel utilisateur) dans le système
exports.signup = (req, res, next) => {
    // Hachage du mot de passe avant de l'enregistrer dans la base de données
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Créer un nouvel utilisateur avec l'email et le mot de passe haché
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // Sauvegarder l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

// Fonction 'login' : pour se connecter (authentifier un utilisateur) dans le système
exports.login = (req, res, next) => {
    // Rechercher l'utilisateur dans la base de données en fonction de son email
    User.fintOne({email: req.body.emails})
    .then(user => {
        if (user === null) {
            // Si l'utilisateur n'est pas trouvé, retourner une erreur
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
        } else {
            // Comparer le mot de passe fourni avec le mot de passe haché enregistré
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    // Si les mots de passe ne correspondent pas, retourner une erreur
                    res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
                } else {
                    // Si les identifiants sont valides, générer un jeton JWT et le renvoyer
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',  // Clé secrète pour signer le jeton / token
                            {expiresIn: '24h'}  // Temps d'expiration du jeton
                        )
                    });
                }
            })
            .catch(error => {
                res.status(500).json({error});
            })
        }
    })
    .catch(error => {
        res.status(500).json({error});
    })
};