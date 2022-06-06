/**
 * Gérér la fenêtre du formulaire d'inscription.
 */

// Stock la hauteur en pixels du formulaire
export let height;

// Obtenir le fragment du DOM correspondant au formulaire inscription
export const formReserve = document.querySelector("form[name='reserve']");

// Afficher la fenêtre modale d'inscription au concours
export function launchModal() {
  const form = document.getElementById("form-inscription");
  form.style.display = "block";

  // Mémoriser la hauteur intérieure du formulaire
  height = formReserve.clientHeight;
}

// Cacher la fenêtre d'inscription au concours
export function hideModal() {
  // Recharger le DOM 
  window.location.reload();
  // S'assurer que la modale n'est pas visible
  const form = document.getElementById("form-inscription");
  form.style.display = "none";
}
