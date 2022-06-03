import * as func from "./functions.js";
import * as m from "./modal.js";
/**
 * Gère les intéractions du formulaire d'inscription
 * 
 * - checkValidity(e)
 * - createFormConfirmation()
 * 
 */

/*
  Fonction principale contenant la logique de validation du formulaire
*/
export function checkValidity(e) {
    // Flag résutlat des fonctions de validation de contraintes de champ
    let valid = true;
    // Tableau pour stocker les valeurs des champs d'une inscription
    let arrInscription = new Array();

    // Récupérer un ensemble d'élements du formulaire à valider
    const fields = document.querySelectorAll('.formData input[type="text"], input[type="email"], input[type="date"], input[type="number"], input[type="checkbox"], input[type="radio"]');

    // Parcourir les champs input du formulaire
    for(let input of fields){
        // Vérifier si les contraintes de chaque élément sont valides et afficher les messages de correction sur le navigateur.
        switch(input.type)
        {
            case "text":
            case "email":
            case "number":
            case "date":
                valid &= func.validateField(input);
                if (valid) {
                    // Mémoriser la valeur validée de ce champ
                    arrInscription.push({name: input.name, value:input.value});
                }
                break;

            case "checkbox":
                valid &= func.validateField(input);
                if (valid) {
                    // Mémoriser si cette case est cochée ou non
                    arrInscription.push({name: input.name, value:input.checked});
                }
                break;

            case "radio":
                // Rechercher si il existe un radio avant le radio courant et avant le label de cet éventuel prédécesseur
                let previousRadio = (input.previousElementSibling && input.previousElementSibling.previousElementSibling);
                if (previousRadio === null)
                {
                    // Il n'est utile de ne tester qu'un radio du groupe de radios
                    // Comme ce radio n'a pas de prédecésseur, c'est uniquement le 1er radio du groupe qui est toujours testé
                    valid &= func.validateField(input);
                    if (valid) {
                        // Mémoriser le nom de la ville du tournoi choisi
                        arrInscription.push({name: input.name, value:input.value});
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
        createFormConfirmation();
        // Ecrire sur la console toutes les valeurs d l'inscription validée
        console.log("=== new inscription ===");
        console.log(arrInscription);
    } else {
        // Rester sur le formulaire en erreur
        e.preventDefault();
    }
}

/*
    Créer et afficher le formulaire de confirmation
    en modifiant le DOM du formulaire validé
*/
function createFormConfirmation() {
    // Obtenir le fragment correspondant au formulaire validé
    const formReserve = document.querySelector("form[name='reserve']");
    // Mémoriser la hauteur intérieure du formulaire validé
    const height = formReserve.clientHeight;
    // Récupérer les éléments champs, le texte et le bouton dans une collection
    const formItems = formReserve.querySelectorAll(".formData, .text-label, .btn-submit");
    // 1) Parcourir la collection et supprimer ces éléments pour vider le formulaire validé
    formItems.forEach(item => item.remove());
    // Redimensionner le formulaire vidé
    formReserve.style.height = `${height}px`;
    // 2) Assembler le formulaire pour afficher la confirmation
    // Rendre flexible le formulaire
    formReserve.style.display = 'flex';
    formReserve.style.flexDirection = 'column';
    formReserve.style.justfyContent = 'space-between';
    formReserve.style.alignItems = 'center';
    // Préparer 1er paragraphe: Merci pour
    let firstPargraph = document.createElement('p');
    firstPargraph.style.flexGrow = '1';
    firstPargraph.style.width = '100%';
    firstPargraph.style.display = 'flex';
    firstPargraph.style.justifyContent = 'center';
    firstPargraph.style.alignItems = 'flex-end';
    firstPargraph.appendChild(document.createTextNode('Merci pour'));
    // Ajouter au DOM
    formReserve.appendChild(firstPargraph);
    // Préparer 2nd paragraphe: votre inscription
    let secondParagraph = document.createElement('p');
    secondParagraph.style.flexGrow = '1';
    secondParagraph.style.width = '100%';
    secondParagraph.style.display = 'flex';
    secondParagraph.style.justifyContent = 'center';
    secondParagraph.appendChild(document.createTextNode('votre inscription'));
    // Ajouter au DOM
    formReserve.appendChild(secondParagraph);
    // Préparer le bouton: fermer
    const close = document.createElement('button');
    close.classList.add('btn-submit');
    close.classList.add('button');
    close.innerText = 'fermer';
    close.addEventListener("click", m.hideModal);
    // Ajouter au DOM
    formReserve.appendChild(close);
}
