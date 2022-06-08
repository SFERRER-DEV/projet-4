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
 * - const cleanAllFormData()
 *
 */

// Récupérer un ensemble d'élements du formulaire à valider
export const fields = document.querySelectorAll(
  '.formData input[type="text"], input[type="email"], input[type="date"], input[type="number"], input[type="checkbox"], input[type="radio"]'
);
// Tableau pour stocker les valeurs des champs d'une inscription
let arrInscription = new Array();

/*
  Fonction principale contenant la logique de validation du formulaire
*/
export const checkValidity = () => {
  // Flag formulaire
  let valid = true;
  // Flag champ
  let ok = true;
  // Mémoriser les champs en erreur
  let fieldsErrorsFocus = new Array();
  // Parcourir les champs input à contrôler du formulaire
  for (let input of fields) {
    // Un test de validation doit se faire Ssi il s'agit du premier radio de groupe
    // ou pour tous les autres types de champs : text, email, number, date, checkbox
    if (input.type === "radio") {
      if (!firstRadio(input)) {
        // Ce n'est pas le premier radio du groupe
        continue;
      }
    }
    // Tester champ
    ok = func.validateField(input);
    valid &= ok;
    // Si toutes les contraintes d'un champ sont calidées
    if (ok) {
      // OK: Alors mémoriser le champ et sa valeur validée dans un tableau
      arrInscription.push({ name: input.name, value: getFieldValue(input) });
    } else {
      // KO: Sinon mémoriser ce champ en erreur
      fieldsErrorsFocus.push(input);
    }
  }
  if (fieldsErrorsFocus.length > 0) {
    fieldsErrorsFocus[0].focus();
  }
  return valid;
};

/*
    Obtenir valeur d'un champ saisi par l'utilisateur
    Déterminer la valeur d'un champ  dépend du type du champ
*/
const getFieldValue = (input) => {
  let valeur;
  switch (input.type) {
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
};

/*
    Déterminer si un radio est le premier élément de son groupe
    car seule la validité du premier radio du groupe a besoin d'être testée
*/
const firstRadio = (input) => {
  if (input.type !== "radio") {
    return false;
  }
  // Rechercher si il existe un radio prédécesseur avant le radio courant et avant le label
  let previousRadio =
    input.previousElementSibling &&
    input.previousElementSibling.previousElementSibling;
  let isFirst = false;
  if (previousRadio === null) {
    // c'est le premier radio
    isFirst = true;
  }
  return isFirst;
};

/*
    Obtenir la valeur du bouton radio sélectionné 
    pour les tournois (=le nom de la ville)
*/
const getTournament = () => {
  // Obtenir la collection des radios des tournois
  const radios = document.getElementsByName("location");
  // Obtenir un tableau avec un seul élément contenant la valeur du radio choisi
  const tournament = Array.from(radios)
    .filter((r) => r.checked)
    .map((r) => r.value);
  // Vérifier la valeur sélectionnée
  if (
    tournament !== undefined &&
    tournament.length > 0 &&
    tournament[0] !== ""
  ) {
    // Renvoyer la ville du tournoi sélectionné
    return tournament[0];
  } else {
    return "";
  }
};

/*
  Remise à Zéro de la présentation de toutes les  erreurs  de 
  validation affichées sur le formulaire
*/
export const cleanAllFormData = () => {
  // La collection fields contient tous les élements du formulaire à valider
  for (let input of fields) {
    func.resetValidation(input);
  }
};

/*
    Vider le tableau des valeurs et des champs mémorisés
    Et renvoyer le nombre d'éléments supprimés
*/
export const viderTableauMemo = () => {
  let elements = arrInscription.splice(0, arrInscription.length);
  return elements.length;
};

/*
    Ecrire sur la console toutes les valeurs mémorisées d'une inscription validée
*/
export function afficherTableauMemo() {
  console.table(arrInscription);
}
