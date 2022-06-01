import * as mess from "./messages.js";
/**
 * Fonctions utilitaires pour valider et présenter les champs de formulaire
 * 
 * - validateField(field)
 * - resetValidation(field)
 * - updateMessageValidation(field)
 * 
 */

/*
    Fonction spécifique dédiée à valider des champs de formulaire 
    suivant les types text, email, number, date, checkbox et radio
    Cette fontion affiche des messages différents  en cas d'erreur de validation :
    - Un message spécifique exsitant dans le tableau des messages pour le nom de ce champ input
    - Ou alors un des messages génériques obtenus depuis l'API Validation
*/
export const validateField = (field) => {
    const validityState = field.validity;
    let message = '';
    console.log(`Testing: ${field.type} - ${field.name}`);
    // Rendre valide la présentation du conteneur formData
    resetValidation(field);

    if ((field.type === 'date' | field.type === 'number') && (validityState.rangeUnderflow | validityState.rangeOverflow)) {
      // La valeur dépasse les bornes min et max pour les dates et les nombres, 
      // utiliser un message générique de l'API Validation
      message =  field.validationMessage;
    } else if (!validityState.valid) { 
      // Une contrainte de validation du champ est en échec alors obtenir un message de validation
      message = mess.findMessage(field);
    }

    if (message !== '') 
    {
      // Marquer le container formData en erreur
      updateMessageValidation(field, message)
      return false;
    } else {
      return true;
    }
  }

/*
  Fonction utile pour remettre à zéro un champ
  et sa présentation au début d'une validation (RAZ)
*/
const resetValidation = (field) => {
    // Récupérer le noeud parent du champ passé à la fonction
    const formData = field.parentNode;
    // Vérifier que ce noeud parent correspond bien au div conteneur formData
    if (!formData.classList.contains('formData')) {
        return;
    }

    // Faire disparaitre la bordure rouge sur le champ du formulaire
    formData.setAttribute('data-error-visible', false);

    // Effacer un éventuel message d'erreur précédent pour les champs concernés
    field.setCustomValidity('');
}

/*
  Fonction utile pour afficher les indications après la
  validation d'un champ 
*/
const updateMessageValidation = (field, message) => {
    // Récupérer le noeud parent du champ passé à la fonction
    let formData = field.parentNode;
    // Vérifier que ce noeud parent correspond bien au div conteneur formData
    if (!formData.classList.contains('formData')) {
        return;
    }
    // Marquer les erreurs
    formData.setAttribute('data-error', message);
    formData.setAttribute('data-error-visible', true);
    field.setCustomValidity(message);
}