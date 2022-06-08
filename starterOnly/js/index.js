import * as mn from "./menu.js";
import * as md from "./modal.js";
import * as fm from "./form.js";
import * as fmOK from "./confirmation.js";
/**
 * Point d'entrée du programme pour gérer l'inscription
 * Ecouter les évèvements pour :
 *  - Ouvrir fermer la modale
 *  - Afficher masquer le menu responsive
 *  - Valider le formualaire
 */
// Récupérer le bouton "Je m'inscris" pour ajouter une fonction qui affiche
// la fenêtre modale du formulaire d'inscription et qui se déclenche sur l'évènement du clique
document
  .getElementById("btn-opening-inscription")
  .addEventListener("click", function (e) {
    // Si le menu responsive est affiché, il sera caché avant ...
    let x = document.getElementById("myTopnav");
    if (x.classList.contains("responsive")) {
      x.classList.remove("responsive");
    }
    // ... d'afficher le formulaire d'inscription
    md.launchModal();
  });

// Récupérer la croix du formulaire d'inscription pour cacher la fenêtre modale sur l'évènement du clique
document
  .getElementById("cross-closing-inscription")
  .addEventListener("click", md.hideModal);

// Régler la borne de validation max value du calendrier pour saisir la date de naissance à aujourd'hui
document
  .getElementById("birthdate")
  .setAttribute("max", new Date().toISOString().split("T")[0]);

// Récupérer l'icône du menu pour ajouter la fonction qui affiche le menu responsive sur mobile
document
  .querySelector(".main-navbar a.icon")
  .addEventListener("click", mn.editNav);

// Récupérer le bouton d'envoi du formulaire "C'est parti" pour ajouter une fonction qui se déclenche sur l'évènement clic
document
  .querySelector('form[name="reserve"] input[type="submit"]')
  .addEventListener("click", function (e) {
    // Vider le tableau des valeurs et des champs mémorisés
    fm.viderTableauMemo();
    // Flag résutlat des fonctions de validation de contraintes de champ
    let valid = true;
    // Vérifier que l'intégralité des champs sont valides
    valid = fm.checkValidity();
    if (valid) {
      // Ecrire les champs et leurs valeurs sur la console.
      fm.afficherTableauMemo();
      // Afficher le formulaire de confirmation
      fmOK.createFormConfirmation();
    } else {
      // Rester sur le formulaire d'inscription en erreur
      e.preventDefault();
    }
  });
