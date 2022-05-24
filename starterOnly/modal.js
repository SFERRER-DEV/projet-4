function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// Close form element
const closeWindow = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// hide modal event
closeWindow.addEventListener("click", hideModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Hide modal form
function hideModal() {
  modalbg.style.display = "none";
}



