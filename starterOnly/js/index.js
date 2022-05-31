import * as m from "./modal.js";
import * as f from "./form.js";

// Récupérer le bouton "Je m'inscris" pour ajouter une fonction qui lance et affiche 
// la fenêtre modale du formulaire d'inscription et qui se déclenche sur l'évènement du clique
document.getElementById("btn-opening-inscription").addEventListener("click", m.launchModal);

// Récupérer la croix du formulaire d'inscription pour cacher la fenêtre modale sur l'évènement du clique
document.getElementById("cross-closing-inscription").addEventListener("click", m.hideModal);

// Récupérer le bouton d'envoi du formulaire "C'est parti" pour ajouter une fonction qui se déclenche sur l'évènement clic
document.querySelector('form[name="reserve"] input[type="submit"]').addEventListener("click", function(e){f.checkValidity(e);});

// Régler la borne max value du calendrier pous saisir la date de naissance à aujourd'hui
document.getElementById("birthdate").setAttribute("max", new Date().toISOString().split('T')[0]);