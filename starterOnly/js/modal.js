// launch modal inscription form with inscription button
const inscriptionBtn = document.getElementById("btn-opening-inscription");
// show modal inscription form event
inscriptionBtn.addEventListener("click", launchModal);

// hide modal inscription form with close 
const closeWindow = document.getElementById("cross-closing-inscription");
// hide modal inscription form event
closeWindow.addEventListener("click", hideModal);

// launch modal inscription form
function launchModal() {
  const form = document.getElementById("form-inscription");
  form.style.display = "block";
}
// hide modal inscription form
function hideModal() {
  const form = document.getElementById("form-inscription");
  form.style.display = "none";
}

