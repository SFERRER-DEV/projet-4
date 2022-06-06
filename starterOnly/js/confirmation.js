import * as md from "./modal.js";
/**
 * Gère l'affichage du formulaire de validation
 * 
 * - createFormConfirmation()
 * - setFormConfirmation()
 * - let addParagraph(strTexte)
 * 
 */

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