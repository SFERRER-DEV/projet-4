import * as func from "./functions.js";
/**
 * Gère les intéractions du formulaire d'inscription
 * 
 * - const checkValidity()
 * - const getFieldValue(input)
 * - const firstRadio(input)
 * - const getTournament()
 * - const viderTableauMemo()
 * - afficherTableauMemo()
 * 
 */

// Récupérer un ensemble d'élements du formulaire à valider
export const fields = document.querySelectorAll('.formData input[type="text"], input[type="email"], input[type="date"], input[type="number"], input[type="checkbox"], input[type="radio"]');
// Tableau pour stocker les valeurs des champs d'une inscription
let arrInscription = new Array();

/*
  Fonction principale contenant la logique de validation du formulaire
*/
export const checkValidity = () => {
    // Flag
    let valid = true;
    // Valeur d'un champ et récupérée suivant son type
    let valeur = '';
    // Parcourir les champs input à contrôler du formulaire
    for(let input of fields){
        // Un test de validation doit se faire Ssi il s'agit du premier radio de groupe 
        // ou pour tous les autres types de champs : text, email, number, date, checkbox
        if (input.type === "radio") {
            if(!firstRadio(input)) {
                // Ce n'est pas le premier radio du groupe
                continue;
            }
        }
        valid = func.validateField(input);
        // OK: Continuer 
        if (valid) {
            // Mémoriser le champ et sa valeur validée dans un tableau
            valeur = getFieldValue(input);
            arrInscription.push({name: input.name, value: valeur}); 
            valeur = '';
        } else {
            // KO: Arrêter toute la validation, 
            // Si toutes les contraintes d'un champ ne sont pas validées.
            break;
        }
    }
    return valid;
}

/*
    Obtenir valeur d'un champ saisi par l'utilisateur
    Déterminer la valeur d'un champ  dépend du type du champ
*/
const getFieldValue = (input) => {
    let valeur;
    switch(input.type)
    {
        case "radio":
            // Renvoyer la valeur du radio sélectionné
            valeur = getTournament(); 
            break;
        case "checkbox":
            // Renvoyer si une case est cochée ou non
            valeur = input.checked;
            break;
        default:
            // text, email, number, date.
            // Renvoyer la valeur du champ
            valeur = input.value; 
            break;
    }
    return valeur;
}

/*
    Déterminer si un radio est le premier élément de son groupe
    car seule la validité du premier radio du groupe a besoin d'être testée
*/
const firstRadio = (input) => {
    if(input.type !== "radio") {
        return false;
    }
    // Rechercher si il existe un radio prédécesseur avant le radio courant et avant le label 
    let previousRadio = (input.previousElementSibling && input.previousElementSibling.previousElementSibling);
    if (previousRadio === null) {
        // c'est le premier radio
        return true;
    } else {
        // Ce radio a un prédécesseur
        return false;
    }
}

/*
    Obtenir la valeur du bouton radio sélectionné 
    pour les tournois (=le nom de la ville)
*/
const getTournament = () => {
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

/*
    Vider le tableau des valeurs et des champs mémorisés
    Et renvoyer le nombre d'éléments supprimés
*/
export const viderTableauMemo = () => {
        let elements = arrInscription.splice(0, arrInscription.length);
        return elements.length;
}

/*
    Ecrire sur la console toutes les valeurs mémorisées d'une inscription validée
*/
export function afficherTableauMemo() {
        console.table(arrInscription);
}