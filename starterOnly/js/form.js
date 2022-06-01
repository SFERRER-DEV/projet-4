import * as func from "./functions.js";
/**
 * Gère les intéractions du formulaire d'inscription
 * - checkValidity(e)
 */

/*
    Fonction principale contenant la logique de validation du formulaire
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
                valid &= func.validateBirth(input)
                break;

            case "text":
            case "email":
            case "number":
            default:
                valid &= func.validateField(input);
        }

        if(!valid){
            // Si une contrainte d'un champ n'est pas valide, arrêter la vérification
            break;
        }
    }

    // Si la validation est déjà en échec alors les autres champs ne seront pas testés
    if(valid){
        // Si les une fonction n'est pas valide alors arrêter la validation et sinon continuer pour valider la suivante
        valid &= (func.validateRadio(radios) && func.validateCheck(accept));

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
