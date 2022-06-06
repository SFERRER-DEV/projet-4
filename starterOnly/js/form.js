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

        // Si les une fonction dédiée n'a pas validé les contraintes d'un champ alors ...
        if(!valid){
            // ...  arrêter toute la validation
            break;
        }
    }

    // Vérifier que l'intégralité des champs sont valides
    if(valid){
        // Ecrire sur la console toutes les valeurs d'une inscription validée
        console.table(arrInscription);
        // Fermer le formulaire de confirmation
        createFormConfirmation();
    } else {
        // Rester sur le formulaire en erreur
        e.preventDefault();
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

/*
    Créer et afficher le formulaire de confirmation
    en modifiant le DOM du formulaire validé
*/
function createFormConfirmation() {
    // Récupérer les éléments champs, le texte et le bouton dans une collection
    const formItems = md.formReserve.querySelectorAll(".formData, .text-label, .btn-submit");
    // 1) Parcourir la collection et supprimer ces éléments pour vider le formulaire validé
    formItems.forEach(item => item.remove());
    // Redimensionner le formulaire vidé avec la dimension mémorisée au moment de l'ouverture de la modale
    md.formReserve.style.height = `${md.height}px`;
    // 2) Assembler le formulaire pour afficher la confirmation
    // Rendre flexible le formulaire
    md.formReserve.style.display = 'flex';
    md.formReserve.style.flexDirection = 'column';
    md.formReserve.style.justfyContent = 'space-between';
    md.formReserve.style.alignItems = 'center';
    // Préparer 1er paragraphe: Merci pour
    let firstPargraph = document.createElement('p');
    firstPargraph.style.flexGrow = '1';
    firstPargraph.style.width = '100%';
    firstPargraph.style.display = 'flex';
    firstPargraph.style.justifyContent = 'center';
    firstPargraph.style.alignItems = 'flex-end';
    firstPargraph.appendChild(document.createTextNode('Merci pour'));
    // Ajouter au DOM
    md.formReserve.appendChild(firstPargraph);
    // Préparer 2nd paragraphe: votre inscription
    let secondParagraph = document.createElement('p');
    secondParagraph.style.flexGrow = '1';
    secondParagraph.style.width = '100%';
    secondParagraph.style.display = 'flex';
    secondParagraph.style.justifyContent = 'center';
    secondParagraph.appendChild(document.createTextNode('votre inscription'));
    // Ajouter au DOM
    md.formReserve.appendChild(secondParagraph);
    // Préparer le bouton: fermer
    const close = document.createElement('button');
    close.classList.add('btn-submit');
    close.classList.add('button');
    close.innerText = 'fermer';
    close.addEventListener("click", md.hideModal);
    // Ajouter au DOM
    md.formReserve.appendChild(close);
}
/*
    Remise à zéro et à blanc du formulaire
    Cette fonction n'est pas utilisée, le DOM est rechargée à la place
*/
function razForm() {
    // Parcourir tous les champs et effectuer un RAZ ou un RAB du champ
    for(let field of fields){
        if (field.type === "checkbox" | field.type === "radio") {
            field.checked = false;
        } if (field.type === "text" | field.type === "email") {
            field.value = '';
        } else {
            field.value = undefined;
        }
        // Effacer un éventuel message d'erreur précédent pour les champs concernés
        field.setCustomValidity('');
    }
    // Effacer les messages d'erreurs précédents du formulaire
    const formItems = md.formReserve.querySelectorAll(".formData");
    for(let item of formItems)
    {
        item.setAttribute('data-error-visible', false);
        item.setAttribute('data-error', '');
    }
}
