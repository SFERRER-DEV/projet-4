/**
 * Tableau des messages d'indication de validation des champs du formulaire
 * La propriété name du tableau a les mêmes valeurs que la propriété name des champs du formulaire
 * 
 * - findMessage(field)
 */
const messages = [
                    {name: "first", message: "Votre prénom doit avoir un minimum de 2 caractères."},
                    {name: "last", message: "Votre nom doit avoir un minimum de 2 caractères."},
                    {name: "email", message: "Votre adresse électronique doit être valide."},
                    {name: "birthdate", message: "Vous devez entrer votre date de naissance."},
                    {name: "quantity", message: "Vous devez saisir le nombre de concours participés ou aucun."},
                    {name: "location", message: "Vous devez choisir une option pour un tournoi."},
                    {name: "accept1", message: "Vous devez vérifier que vous acceptez les termes et les conditions."}
                 ];


/* 
   Rechercher et trouver un message spécifique dans le tableau
   ou sinon le remplacer par un message générique de l'APi
*/
export const findMessage =(field) => {
        let message = '';
        // Chercher si le message spécifique d'erreur existe pour un champ
        let found = messages.find(elt => elt.name === field.name);
        if (found !== undefined)
        {
            // Utiliser un message spécifique 
            message = found.message;
        } else {
            // Utiliser un message générique
            message =  field.validationMessage;
        }
        return message;
}