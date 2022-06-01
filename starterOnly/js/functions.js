import * as mess from "./messages.js";
import * as util from "./util.js";
/*
 * Fonctions spécifiques dédiées à valider des champs de formulaire
 * suivant le type du champ.
 * - validateField(field)
 * - validateBirth(field)
 * - validateRadio(radios)
 * - validateCheck(check)
 */
/*
    Fonction dédiée pour valider les champs des types 
    text, email, number et date
*/
export const validateField = (field) => {
    const validityState = field.validity;
    let message = '';

    // Rendre valide la présentation container formData
    util.resetValidation(field);

    if (!validityState.valid) { 
      // Une contrainte de validation du champ est en échec, préparer son message spécifique d'erreur
      message = mess.messages[field.name];
      // Marquer le container formData en erreur
      util.updateMessageValidation(field, message)
      return false;
    }

    return true;
  }

 /*
    Fonction dédiée pour valider la date de naissance
    Des messages d'erreurs différents sont affichés :
    - un message depuis le tableau des messages spécifiques au formulaire
    - des mesassges génériques depuis l'API Validation
 */
 export const validateBirth = (field) => {
    const validityState = field.validity;
    let message = '';

    // Rendre valide le message et la présentation du champ 
    util.resetValidation(field);

    if (validityState.rangeOverflow | validityState.rangeUnderflow ) {
    // La date dépasse les bornes min et max, utiliser le message générique de l'API Validation
        message =  field.validationMessage;
    } 
    else if (!validityState.valid) { 
    // Une contrainte de validation du champ est en échec, préparer son message spécifique d'erreur
        message = mess.messages[field.name];
    }

    if (message !== '') { 
        // Marquer le conteneur formData en erreur
        util.updateMessageValidation(field, message)
        return false;
    }

    return true;
}

/*
    Fonction dédiée pour valider les champs du type
    radio des emplacements de tournois : un radio doit être sélectionné
*/
export const validateRadio = (radios) => {
    // Obtenir un tableau avec un seul élément contenant la valeur du radio choisi
    const locationValue = Array.from(radios)
                       .filter(r => r.checked)
                       .map(r => r.value);
    // Tester l'existence de la valeur sélectionnée
    if (locationValue !== undefined && locationValue.length > 0 && locationValue[0] !== '') 
    {
        // Récupérer le premier radio du groupe: un radio a été séléctionné par l'utilisateur
        const field = radios[0];
        // Rendre valide la présentation container formData
        util.resetValidation(field);
        return true;
    }
    else
    {
      // Récupérer le premier radio du groupe: aucun radio n'est sélectionné par l'utilisateur,
      const field = radios[0];
      let message = mess.messages[field.name];
      // Marquer le container formData en erreur
      util.updateMessageValidation(field, message)
      return false;
    }
  }

  /*
    Fonction dédiée pour valider le champ du type 
    checkbox pour les conditions
  */
 export const validateCheck =(field) => {
    let message = '';
     if(field.checked === true)
     {
         // Rendre valide la présentation container formData
        util.resetValidation(field);
        return true;
     }
     else 
     {
        // La case n'est pas cochées, préparer son message spécifique d'erreur
        message = mess.messages[field.name];
        // Marquer le container formData en erreur
        util.updateMessageValidation(field, message)
        return false;
     }
 }