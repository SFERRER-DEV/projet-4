import * as mess from "./messages.js";
import * as util from "./util.js";
/*
 * Fonctions spécifiques dédiées à valider des champs de formulaire
 * suivant le type du champ.
 * - validateField(field)
 * - validateRadio(radios)
 */
/*
    Fonction dédiée pour valider les champs des types 
    text, email, number, date et checkbox
    Des messages d'erreurs différents sont affichés :
    - Un message spécifique exsitant dans le tableau des messages pour le nom de ce champ
    - Ou un des messages génériques depuis l'API Validation
*/
export const validateField = (field) => {
    const validityState = field.validity;
    let message = '';

    // Rendre valide la présentation container formData
    util.resetValidation(field);

    if ((field.type === 'date' | field.type === 'number') && (validityState.rangeUnderflow | validityState.rangeOverflow)) {
      // La valeur dépasse les bornes min et max pour les dates et les nombres, utiliser un message générique de l'API Validation
      message =  field.validationMessage;
    } else if (!validityState.valid) { 
      // Une contrainte de validation du champ est en échec, préparer son message spécifique d'erreur
      message = mess.messages[field.name];
    }

    if (message !== '') 
    {
      // Marquer le container formData en erreur
      util.updateMessageValidation(field, message)
      return false;
    } else {
      return true;
    }
  }

/*
    Fonction dédiée pour valider les champs du type radio 
    Un radio doit être sélectionné pour valider la fonction
*/
export const validateRadio = (radios) => {
    let message = '';
    // Obtenir un tableau avec un seul élément contenant la valeur du radio choisi
    const selection = Array.from(radios)
                       .filter(r => r.checked)
                       .map(r => r.value);
    // Récupérer le premier radio de la collection 
    const field = radios[0];
    // Tester l'existence de la valeur sélectionnée
    if (selection !== undefined && selection.length > 0 && selection[0] !== '') 
    {
        // Rendre valide la présentation container formData
        util.resetValidation(field);
        return true;
    }
    else
    {
      // Obtenir le  message spécifique d'erreur
      message = mess.messages[field.name];
      // Marquer le container formData en erreur
      util.updateMessageValidation(field, message)
      return false;
    }
  }