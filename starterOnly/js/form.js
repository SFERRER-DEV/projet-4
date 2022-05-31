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
    // Récuper la date d'anniversaire
    //const birth = document.querySelector('#birthdate');

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

    if(valid){
        // Si les une fonction n'est pas valide alors arrêter la validation et sinon continuer pour valider la suivante
        valid &= (validateRadio(radios) && validateCheck(accept));
    }

    // Vérifier que l'intégralité des champs sont valides
    if(valid){
        console.log("=======");
        console.log("Form validation ok");
        alert("Le formulaire est valide.");
    } else {
        console.log("=======");
        console.log("Form validation ko");
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
    // Rendre valide le message du champ
    field.setCustomValidity('')
    if (validityState.valueMissing) {
      field.setCustomValidity('Ce champ est obligatoire, vous devez le renseigner.');
      console.log("=======");
      console.log((`Echec value missing: ${field.name}`))
    } else if (!validityState.valid) { 
        // Une contrainte de validation du champ est en échec, préparer son message spécifique d'erreur
        field.setCustomValidity(messages[field.name]);
        console.log("=======");
        console.log((`Echec validation: ${field.name}`))
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
const validateBirth = (field) => {
    const validityState = field.validity;
     // Rendre valide le message du champ
     field.setCustomValidity('')
    if (validityState.rangeOverflow | validityState.rangeUnderflow ) {
    // La date saisie est inférieure ou supérieure aux bornes min et max.
        field.setCustomValidity(`La date saisie n'est pas valide`);
        console.log("=======");
        console.log(`Echec validation: ${field.name} ${field.value}`);
    } 
    else if (!validityState.valid) { 
    // Une contrainte de validation du champ est en échec, préparer son message spécifique d'erreur
        field.setCustomValidity(messages[field.name]);
        console.log("=======");
        console.log((`Echec validation: ${field.name}`))
    }

    // Montrer le message d'erreur de validation du champ
    return field.reportValidity();
}
