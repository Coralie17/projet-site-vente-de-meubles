const Thing = require('../models/thing') // Import du fichier thing

// Fonction 'createThing' : pour CREER UN NOUVEL OBJET 'Thing' dans la base de données, en utilisant les données envoyées dans la requête HTTP
// Cette fonction prend trois paramètres : req (la demande HTTP), res (la réponse HTTP), et next (une fonction à appeler pour passer le contrôle au middleware suivant, mais qui n'est pas utilisée dans ce cas)
exports.createThing = (req, res, next) => {
    // Supprimer l'identifiant (_id) de la requête s'il est présent
    delete req.body._id;
    // Créer une nouvelle instance de l'objet 'Thing' avec les données de la requête
    const thing = new Thing({
      ...req.body
    });
    // Sauvegarder l'objet Thing dans la base de données
    thing.save()
      // Si l'enregistrement dans la base de données est réussi => renvoie une réponse avec le code de statut HTTP 201 (Créé) et un objet JSON contenant un message indiquant que l'objet a été enregistré avec succès
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      // Si une erreur se produit lors de l'enregistrement de l'objet dans la base de données => renvoie une réponse avec le code de statut HTTP 400 (Bad Request) et un objet JSON contenant l'erreur rencontrée
      .catch(error => res.status(400).json({ error }));
  };

// Fonction 'modifyThing' : pour MODIFIER un objet Thing dans la base de données  
exports.modifyThing = (req, res, next) => {
    // Mettre à jour l'objet Thing avec les données de la requête en fonction de son identifiant (_id)
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

// Fonction 'deleteThing' : pour SUPPRIMER un objet Thing de la base de données en fonction de son identifiant (_id)
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };

// Fonction 'getOneThing' : pour RECUPERER un objet Thing de la base de données en fonction de son identifiant (_id)
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  }

// Fonction 'getAllThings' : pour RECUPERER TOUS LES OBJETS Thing de la base de données
exports.getAllThings = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  }  