import * as func from "./functions.js";
import * as md from "./modal.js";
/**
 * Gère les intéractions du formulaire d'inscription
 * 
 * - checkValidity(e)
 * - createFormConfirmation()
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

/*
    Créer et afficher le formulaire de confirmation
    en modifiant le DOM du formulaire validé
*/
export function createFormConfirmation() {
    // Préparer le formulaire de confirmation
    setFormConfirmation();
    // Ajouter un premier paragraphe au DOM
    const p = addParagraph('Merci pour');
    p.style.alignItems='flex-end';
    md.formReserve.appendChild(p);
    // Ajouter un second paragraphe au DOM
    md.formReserve.appendChild(addParagraph('votre inscription'));
    // Préparer le bouton pour fermer le formulaire
    const close = document.createElement('button');
    close.classList.add('btn-submit');
    close.classList.add('button');
    close.innerText = 'fermer';
    close.addEventListener("click", md.hideModal);
    // Ajouter le bouton au DOM
    md.formReserve.appendChild(close);
}

/*
    Préparer l'affichage du formulaire
    de confirmation à partir du formulaire validée
*/
function setFormConfirmation() {
    // Récupérer les éléments champs, le texte et le bouton dans une collection
    const formItems = md.formReserve.querySelectorAll(".formData, .text-label, .btn-submit");
    // Parcourir cette collection et supprimer ces éléments pour vider le formulaire validé
    formItems.forEach(item => item.remove());
    // Redimensionner le formulaire vidé avec la dimension mémorisée au moment de l'ouverture de la modale
    md.formReserve.style.height = `${md.height}px`;
}

/*
    Ajouter un paragraphe et son texte 
    dans le formulaire de confirmation
*/
let addParagraph = (strTexte) => {
    // Préparer un paragraphe: votre inscription
    let para = document.createElement('p');
    para.style.flexGrow = '1';
    para.style.width = '100%';
    para.style.display = 'flex';
    para.style.justifyContent = 'center';
    // Ecrire le texte dans le paragraphe
    para.appendChild(document.createTextNode(strTexte));
    // Renvoyer le paragraphe pour être affiché
    return para;
}
