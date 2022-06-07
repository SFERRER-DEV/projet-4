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
export function checkValidity() {
    // Flag résutlat des fonctions de validation de contraintes de champ
    let valid = true;
    // Vider le tableau des valeurs et des champs mémorisés
    arrInscription.splice(0, arrInscription.length);
    // Parcourir les champs input à contrôler du formulaire
    for(let input of fields){
        // Un test de validation doit se faire Ssi il s'agit du premier radio de groupe 
        // ou pour tous les autres types de champs : text, email, number, date, checkbox
        if((input.type === "radio" && firstRadio(input)) | (input.type !== "radio")) {
            valid &= func.validateField(input);
            // OK: Continuer 
            if (valid) {
                // La valeur à mémoriser d'un champ validé dépend du type du champ contrôlé
                switch(input.type)
                {
                    case "radio":
                        // Mémoriser la valeur de la radio sélectionnée
                        arrInscription.push({name: input.name, value: getTournament()}); 
                        break;
                    case "checkbox":
                        // Mémoriser si une case est cochée ou non
                        arrInscription.push({name: input.name, value: input.checked});
                        break;
                    default:
                        // text, email, number, date.
                        // Mémoriser la valeur du champ
                        arrInscription.push({name: input.name, value: input.value}); 
                        break;
                }
            } else {
                // KO: Arrêter toute la validation, 
                // Si toutes les contraintes d'un champ ne sont pas validées.
                break;
            }
        }
    }

    return valid;
}


/*
    Déterminer si un radio est le premier élément de son
    groupe de radios
    car seul la validité du premier radio du groupe a besoin d'être testé
*/
const firstRadio = (input) => {
    if(input.type !== "radio") {
        return false;
    } else {
        // alors rechercher si il existe un radio prédécesseur avant le radio courant et avant le label 
        let previousRadio = (input.previousElementSibling && input.previousElementSibling.previousElementSibling);
        if (previousRadio === null) {
            // c'est le prmeir radio
            return true;
        } else {
            // Ce radio a un prédécesseur
            return false;
        }
    }
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

