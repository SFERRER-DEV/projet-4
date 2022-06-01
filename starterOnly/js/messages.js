/*
 * Tableau des messages d'indication de validation des champs du formulaire
 * Les clés du tableau ont les valeurs de la propriété name des champs du formulaire
 */
// (key, value) => (input.name, message)
export const messages = {"first":"Votre prénom doit avoir un minimum de 2 caractères.",
                         "last":"Votre nom doit avoir un minimum de 2 caractères.",
                         "email":"Votre adresse électronique doit être valide.",
                         "birthdate":"Vous devez entrer votre date de naissance.",
                         "quantity":"Vous devez saisir le nombre de concours participés ou aucun.",
                         "location":"Vous devez choisir une option pour un tournoi.",
                         "accept1":"Vous devez vérifier que vous acceptez les termes et les conditions.",
                         "accept2":""};

                        