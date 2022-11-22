# Pour lancer le Backend
Mettre les informations pour les variables d'environnement (base de données mySql)

Pour lancer le server : `$ npm start`

# Routes
## La route POST pour créer un compte
http://localhost:3000/api/authentification/signup

## La route POST pour se logger
http://localhost:3000/api/authentification/login

## La route POST pour créer la fiche du user
http://localhost:3000/api/fiche_user/

## La route GET pour afficher tous les objets contenus dans la fiche du user
http://localhost:3000/api/fiche_user/ 

## La route GET pour afficher un objet grace à son id
http://localhost:3000/api/fiche_user/:id 

## La route PUT pour modifier un objet seclectionné par son _id
http://localhost:3000/api/fiche_user/:id 

## La route DELETE pour supprimer un objet seclectionné par son _id
http://localhost:3000/api/fiche_user/:id

## La route POST pour Liker ou Disliker un objet seclectionné par son _id
http://localhost:3000/api/fiche_user/:id/like
