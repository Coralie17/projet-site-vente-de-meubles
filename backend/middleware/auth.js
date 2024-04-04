const jwt = require('jsonwebtoken');  // Import du module jsonwebtoken

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  // Extraction du token JWT du header Authorization
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  // Décodage du token JWT pour vérification
        const userId = decodedToken.userId;  // Extraction de l'ID utilisateur à partir du token décodé
        req.auth = {
            userId: userId  // Ajout de l'ID utilisateur à l'objet req pour une utilisation ultérieure dans les routes
        };
        // next(); // Passe au middleware suivant dans la chaîne de middleware (*)
    } catch(error) {
        res.status(401).json({error});  // Si une erreur survient (par exemple, token invalide ou expiré), renvoie une réponse d'erreur 401
    }
};