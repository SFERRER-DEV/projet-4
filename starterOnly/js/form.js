/**
 * Gère les intéractions du formulaire d'inscription 
 */
// (key, value) => (input.name, message)
const messages = {"first":"Votre prénom doit avoir un minimum de 2 caractères et ne peut pas être vide.",
                  "last":"Votre nom doit avoir un minimum de 2 caractères et ne peut pas être vide.",
                  "email":"Votre adresse électronique doit être valide.",
                  "birthdate":"Vous devez entrer votre date de naissance.",
                  "quantity":"Vous devez saisir le nombre de concours participés ou aucun.",
                  "location":"Vous devez choisir une option le tournoi auquel participer.",
                  "accept1":"Vous devez vérifier que vous acceptez les termes et les conditions d'utilisation.",
                  "accept2":""};

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
            console.log("=======");
            console.log("Form validation 2 ko");
            // Rester sur le formulaire en erreur
            e.preventDefault();
        }
    } else {
        console.log("=======");
        console.log("Form validation 1 ko");
        // Rester sur le formulaire en erreur
        e.preventDefault();
    }
}

/*
    Fonction pour valider les champs des types 
    text, email, number et date
*/
const validateField = (field) => {
    const validityState = field.validity;
    let message = '';

    // Rendre valide le message et la présentation du champ 
    resetValidation(field);

    if (!validityState.valid) { 
      // Une contrainte de validation du champ est en échec, préparer son message spécifique d'erreur
      message = messages[field.name];
      // Marquer le container formData en erreur
      updateMessageValidation(field, message)
    }

    // Montrer le message d'erreur de validation du champ
    return field.reportValidity();
  }

 /*

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
        // Marquer le container formData en erreur
        updateMessageValidation(field, message)
      }

    // Montrer le message d'erreur de validation du champ
    return field.reportValidity();
}

/*
    Fonction pour valider les champs du type
    radio pour les tournois
*/
  const validateRadio = (radios) => {
    // Obtenir un tableau d'un élément contenant la valeur du radio choisi
    const locationValue = Array.from(radios)
                       .filter(r => r.checked)
                       .map(r => r.value);
    // Tester l'existence de la valeur sélectionnée
    if (locationValue !== undefined && locationValue.length > 0 && locationValue[0] !== '') 
    {
        console.log("=======");
        console.log(`Radio: ${locationValue[0]}`);
        return true;
    }
    else
    {
       console.log("=======");
       console.log("Radio ko");
       return false;
    }
  }
  /*
    Fonction pour valider le champ du type 
    checkbox pour les conditions
  */
 const validateCheck =(check) => {
     if(check.checked === true)
     {
        console.log("=======");
        console.log(`Checkbox: ${check.checked}`);
        return true;
     }
     else 
     {
        console.log("=======");
        console.log("Checkbox ko");
        return false;
     }
 }



/*

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

    // Effacer un éventuel message d'erreur précédent
    switch(field.type)
    {
        case "text":
        case "email":
        case "number":
        case "date":
            field.setCustomValidity('');
            break;
    }
}
/*

*/
const updateMessageValidation = (field, message) => {
    // Récupérer le noeud parent du champ passé à la fonction
    const formData = field.parentNode;
    // Vérifier que ce noeud parent correspond bien au div conteneur formData
    if (!formData.classList.contains('formData')) {
        return;
    }
    
    field.setCustomValidity(message);

    switch(field.type)
    {
        case "text":
        case "email":
        case "number":
        case "date":
            formData.setAttribute('data-error-visible', true);
            break;

        default:
            formData.setAttribute('data-error-visible', true);
            break;
    }

    console.log(`formData: ${message}`);
}