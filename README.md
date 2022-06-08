# Projet GameOn

## Présentation

Réaliser les issues github du projet GameOn avec du JavaScript Vanilla à partir d'un repo forké pour la formation Openclassrooms de développeur d'application JS React.

- La validation du formulaire d'inscription est faite par l'API Validation avec des attributs HTML.
- Le format des données est testé en JavaScript par la fonction principale checkValidity() du fichier form.js qui est le programme du contrôle du formulaire.
- Le programme affiche toutes les erreurs de validations des champs du formulaire se positionne le focus sur le premier champ détecté en erreur.
- Le fichier functions.js contient des fonctions utilitaires nécessaires au programme principal.
- Des messages spécifiques de validation à destination de l'utilisateur proviennent d'un tableau dans le fichier messages.js et dans certains cas ce sont les messages génériques de l'API Validation qui sont affichés.
- Les attibuts data-error et data-error-visible permettent de marquer le champ du formulaire en erreur en l'entourant en rouge et en le faisant suivre de son message validation.
- Un tableau stocke le récapitulatif des valeurs validées des champs du formulaire (arrInscription).
- Le code javascrit pour contrôler le formulaire est procédural. Ses fonctions sont stockées dans des modules regroupant les fonctionalités en briques: form, functions, menu, modal, messages, confirmation.
- Le fichier index.js est le point d'entrée du programme, il écoute tous les évènements nécessaires.
- Le formulaire de confirmation est créé en modifiant le DOM. Il est réinitialisé après fermeture de la confirmation en rechargeant tout le DOM de la page.
- La présentation css desktop utilise le module Grid et la présentation mobile utilise le module Flexbox.
- Les retours à la ligne dans le titre principal utilisent du code css: il y a un ou deux retours à la ligne suivant la taille d'écran.
- Le principal breakpoint correspond à une petite tablette: 768px. Les autres breakpoints et orientations concernent uniquement la lisibilité du titre principal.
- Un menu hamburger remplace le menu desktop sur tablettes et mobiles.
- Les fichiers index.html et index.css ont été validés par les validateurs du W3C.
- Les problèmes dans le codebase sont d'abord contrôlés par l'extension SonarLint de VS Code, puis la branche dev du repo Github est liée à l'application Codeclimate.
- L'extension Prettier de VS Code a formatté tout le codebase.

## Liens

Voir le site sur github pages : [Openclassrooms projet 4: GameOn](https://sferrer-dev.github.io/projet-4/starterOnly/index.html)

Les issues sur le dépot d'origine: [Issues](https://github.com/OpenClassrooms-Student-Center/GameOn-website-FR/issues)

Code Climate: [Codebase summary projet 4](https://codeclimate.com/github/SFERRER-DEV/projet-4)
