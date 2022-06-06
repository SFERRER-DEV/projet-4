import * as func from "./functions.js";
/**
 * Gère les intéractions du formulaire d'inscription
 * 
 * - checkValidity(e)
 * 
 */

// Récupérer un ensemble d'élements du formulaire à valider
export const fields = document.querySelectorAll('.formData input[type="text"], input[type="email"], input[type="date"], input[type="number"], input[type="checkbox"], input[type="radio"]');
// Tableau pour stocker les valeurs des champs d'une inscription
export let arrInscription = new Array();

/*
  Fonction principale contenant la logique de validation du formulaire
*/
export function checkValidity(e) {
    // Flag résutlat des fonctions de validation de contraintes de champ
    let valid = true;
    // Vider le tableau des valeurs et des champs mémorisés
    arrInscription.splice(0, arrInscription.length);
    // Parcourir les champs input du formulaire
    for(let input of fields){
        // Vérifier si les contraintes de chaque élément sont valides et afficher les messages de correction sur le navigateur.
        switch(input.type)
        {
            case "radio":
                // Rechercher si il existe un radio prédécesseur avant le radio courant et avant le label 
                let previousRadio = (input.previousElementSibling && input.previousElementSibling.previousElementSibling);
                if (previousRadio !== null) {
                    break;
                }
            case "text":
            case "email":
            case "number":
            case "date":
            case "checkbox":
                valid &= func.validateField(input);
                if (valid) {
                    if(input.type === 'checkbox') {
                        // Mémoriser si une case est cochée ou non
                        arrInscription.push({name: input.name, value: input.checked});
                    } else if(input.type === 'radio') { 
                        // Mémoriser la valeur de la radio sélectionnée
                        arrInscription.push({name: input.name, value: getTournament()});
                    } else {
                        // Mémoriser la valeur du champ
                        arrInscription.push({name: input.name, value: input.value});
                    }
                }
                break;
            default:
                console.log(`Input ${input.type} not testing: ${input.name}`);
        }

        // Si les une fonction n'a pas validé les contraintes d'un champ alors ...
        if(!valid){
            // ...  arrêter toute la validation
            break;
        }
    }
    return valid;
}

/*
    Obtenir la valeur du bouton radio sélectionné 
    pour les tournois
*/
function getTournament() {
    // Obtenir la collection des radios des tournois
    const radios = document.getElementsByName('location');
    // Obtenir un tableau avec un seul élément contenant la valeur du radio choisi
    const tournament = Array.from(radios)
                            .filter(r => r.checked)
                            .map(r => r.value);
    // Vérifier la valeur sélectionnée
    if (tournament !== undefined && tournament.length > 0 && tournament[0] !== '') 
    {
        // Renvoyer la ville du tournoi sélectionné
       return tournament[0];
    } else {
        return '';
    }
}

