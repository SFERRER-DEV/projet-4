import * as fm from "./form.js";
/**
 * Gérér la fenêtre du formulaire d'inscription.
 * - launchModal()
 * - hideModal()
 */

/** @type {Number} Stock la hauteur en pixels du formulaire */
export let height;

/** @type {NodeList} fragment du DOM correspondant au formulaire inscription (HTML Form element) */
export const formReserve = document.querySelector("form[name='reserve']");

/**
 * Afficher la fenêtre modale d'inscription au concours
 */
export function launchModal() {
  const form = document.getElementById("form-inscription");
  form.style.display = "block";

  // Mémoriser la hauteur intérieure du formulaire
  height = formReserve.clientHeight;
}

/**
 * Cacher la fenêtre d'inscription au concours
 */
export function hideModal() {
  // Vider le tableau des valeurs et des champs mémorisés
  if (fm.viderTableauMemo() === 8) {
    // Si le tableau contenait des champs mémorisés
    // alors il faut recharger le DOM et index.js
    // Huit champs mémorisés et validés => C'est formulaire de confirmation qui est affiché
    window.location.reload();
  } else {
    // S'assurer que la modale n'est pas visible
    // Ne pas recharger le DOM pour ne pas perdre les champs déjà saisis
    const form = document.getElementById("form-inscription");
    form.style.display = "none";
  }
}
