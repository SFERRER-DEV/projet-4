/*
 * Fonctions utilitaires utilisées
 * par les autres fonctions
 * - resetvalidation(field)
 * - updateMessageValidation(field, message)
 */

/*
  Fonction pour Remettre à Zéro un champ
  et sa présentation au début d'une validation
*/
export const resetValidation = (field) => {
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
export const updateMessageValidation = (field, message) => {
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
