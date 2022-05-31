/**
 * Gère les intéractions du formulaire d'inscription 
 */
// (key, value) => (input.name, message)
const messages = {"first":"Votre prénom doit avoir un minimum de 2 caractères.",
                  "last":"Votre nom doit avoir un minimum de 2 caractères.",
                  "email":"Votre adresse électronique doit être valide.",
                  "birthdate":"Vous devez entrer votre date de naissance.",
                  "quantity":"Vous devez saisir le nombre de concours participés ou aucun.",
                  "location":"Vous devez choisir une option pour un tournoi.",
                  "accept1":"Vous devez vérifier que vous acceptez les termes et les conditions.",
                  "accept2":""};
/*
    Fonction principale pour la logique
    de validation du formulaire
*/
export function checkValidity(e) {
    // Flag de test pour les contraintes de validation
    let valid = true;    
    // Récupérer un premier ensemble d'élements du formulaire à valider
    const fields = document.querySelectorAll('.formData input[type="text"], input[type="email"], input[type="date"], input[type="number"]');
    // Récupérer les éléments radio pour les emplacements des tournois
    const radios = document.getElementsByName('location');
    // Récupérer la case à cocher d'acceptation des conditions
    const accept = document.querySelector('#checkbox1');

    // Parcourir les champs input du formulaire
    for(let input of fields){
        // Vérifier si les contraintes de chaque élément sont valides et afficher les messages de correction sur le navigateur.
        switch(input.type)
        {
            case "date":
                valid &= validateBirth(input)
                break;

            case "text":
            case "email":
            case "number":
            default:
                valid &= validateField(input);
        }

        if(!valid){
            // Si une contrainte d'un champ n'est pas valide, arrêter la vérification
            break;
        }
    }

    // Si la validation est déjà en échec alors les autres champs ne seront pas testés
    if(valid){
        // Si les une fonction n'est pas valide alors arrêter la validation et sinon continuer pour valider la suivante
        valid &= (validateRadio(radios) && validateCheck(accept));

        // Vérifier que l'intégralité des champs sont valides
        if(valid){
            alert("Le formulaire est valide.");
        } else {
            // Rester sur le formulaire en erreur
            e.preventDefault();
        }
    } else {
        // Rester sur le formulaire en erreur
        e.preventDefault();
    }
}

/*
    Fonction dédiée pour valider les champs des types 
    text, email, number et date
*/
const validateField = (field) => {
    const validityState = field.validity;
    let message = '';

    // Rendre valide la présentation container formData
    resetValidation(field);

    if (!validityState.valid) { 
      // Une contrainte de validation du champ est en échec, préparer son message spécifique d'erreur
      message = messages[field.name];
      // Marquer le container formData en erreur
      updateMessageValidation(field, message)
      return false;
    }

    return true;
  }

 /*
    Fonction dédiée pour valider la date de naissance
    Elle reçoit deux messages d'erreurs différents
 */
 const validateBirth = (field) => {
    const validityState = field.validity;
    let message = '';

    // Rendre valide le message et la présentation du champ 
    resetValidation(field);

    if (validityState.rangeOverflow | validityState.rangeUnderflow ) {
    // La date saisie est inférieure ou supérieure aux bornes min et max.
        message = "La date saisie n'est pas valide";
    } 
    else if (!validityState.valid) { 
    // Une contrainte de validation du champ est en échec, préparer son message spécifique d'erreur
        message = messages[field.name];
    }

    if (message !== '') { 
        // Marquer le conteneur formData en erreur
        updateMessageValidation(field, message)
        return false;
    }

    return true;
}

/*
    Fonction dédiée pour valider les champs du type
    radio des emplacements de tournois : un radio doit être sélectionné
*/
  const validateRadio = (radios) => {
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
        resetValidation(field);
        return true;
    }
    else
    {
      // Récupérer le premier radio du groupe: aucun radio n'est sélectionné par l'utilisateur,
      const field = radios[0];
      let message = messages[field.name];
      // Marquer le container formData en erreur
      updateMessageValidation(field, message)
      return false;
    }
  }

  /*
    Fonction dédiée pour valider le champ du type 
    checkbox pour les conditions
  */
 const validateCheck =(field) => {
    let message = '';
     if(field.checked === true)
     {
         // Rendre valide la présentation container formData
        resetValidation(field);
        return true;
     }
     else 
     {
        // La case n'est pas cochées, préparer son message spécifique d'erreur
        message = messages[field.name];
        // Marquer le container formData en erreur
        updateMessageValidation(field, message)
        return false;
     }
 }

/*
  Fonction pour Remettre à Zéro un champ
  avant sa validation
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
    switch(field.type)
    {
        case "text":
        case "email":
        case "number":
        case "date":
            field.setCustomValidity('');
            break;
        case "radio":
        case "checkbox":
        default:
            break;
    }
}

/*
  Fonction pour afficher les indications après la
  validation d'un champ 
*/
const updateMessageValidation = (field, message) => {
    // Récupérer le noeud parent du champ passé à la fonction
    let formData = field.parentNode;
    // Vérifier que ce noeud parent correspond bien au div conteneur formData
    if (!formData.classList.contains('formData')) {
        return;
    }

    switch(field.type)
    {
        case "text":
        case "email":
        case "number":
        case "date":
            formData.setAttribute('data-error', message);
            formData.setAttribute('data-error-visible', true);
            field.setCustomValidity(message);
            break;
        case "radio":
        case "checkbox":
            formData.setAttribute('data-error', message);
            formData.setAttribute('data-error-visible', true);
            break;
        default:
            console.log(`updateMessageValidation default case: ${field.type} `)
            break;
    }
}
