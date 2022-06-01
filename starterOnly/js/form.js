import * as func from "./functions.js";
/**
 * Gère les intéractions du formulaire d'inscription
 * - checkValidity(e)
 */

/*
    Fonction principale contenant la logique de validation du formulaire
*/
export function checkValidity(e) {
    // Flag de résutlat pour les fonctions de validation des contraintes de champ
    let valid = true;
    // Récupérer un ensemble d'élements du formulaire à valider
    const fields = document.querySelectorAll('.formData input[type="text"], input[type="email"], input[type="date"], input[type="number"], input[type="checkbox"], input[type="radio"]');
    // Récupérer les autres éléments c'est à dire les radios pour les emplacements de tournois
    const radios = document.getElementsByName('location');

    // Parcourir les champs input du formulaire
    for(let input of fields){
        // Vérifier si les contraintes de chaque élément sont valides et afficher les messages de correction sur le navigateur.
        switch(input.type)
        {
            case "text":
            case "email":
            case "number":
            case "date":
            case "checkbox":
                valid &= func.validateField(input);
                break;
            case "radio":
                // Rechercher si il existe un radio avant le radio courant et avant le label de cet éventuel prédécesseur
                let previousRadio = (input.previousElementSibling && input.previousElementSibling.previousElementSibling);
                if (previousRadio === null)
                {
                    // Il n'est utile de ne tester qu'un radio du groupe de radios
                    // Comme ce radio n'a pas de prédecésseur, c'est uniquement le 1er radio du groupe qui est toujours testé
                    valid &= func.validateField(input);
                }
                break;
            default:
                console.log(`Input ${input.type} not testing: ${input.name}`);
        }

        // Si les une fonction dédiée n'a pas validé les contraintes d'un champ alors ...
        if(!valid){
            // ...  arrêter toute la validation
            break;
        }
    }

    // Vérifier que l'intégralité des champs sont valides
    if(valid){
        alert("Le formulaire est valide.");
    } else {
        // Rester sur le formulaire en erreur
        e.preventDefault();
    }
}
