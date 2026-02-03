/*
  Démonstration 03 - Les formulaires
*/

// 3.  Récupération d'un formulaire

// const myForm = document.forms[0];
// const myForm = document.forms["formId"];
// const myForm = document.forms.formName; // ❤️
// const myForm = document.forms.item(0); // Idem que forms[0]
const myForm = document.forms.namedItem("formName"); // ✅

// const inputLastname = myForm.elements["lastname"];

myForm.addEventListener("submit", (e) => {
  // Accès à l'événement
  console.log("event:", e);
  e.preventDefault(); // Annuler le comportement par défaut (rafraichissement de la page)

  // Récupération des champs
  const lastnameInput = myForm["lastname"];
  const firstnameInput = myForm["firstname"];
  const emailInput = myForm["email"];
  const ageInput = myForm["age"];
  const datenaissanceInput = myForm["datenaissance"];

  let formValidity = true;

  // 1. Vérifier que les champs sont corrects
  if (!checkLastnameValidity(lastnameInput)) {
    formValidity = false;
    lastnameInput.classList.add("error-input");
  } else {
    lastnameInput.classList.remove("error-input");
  }

  // A faire pour les autres champs

  if (!formValidity) return;

  // 2. S'ils le sont => envoyer les données
  const data = {
    lastname: lastnameInput.value,
    firstname: myForm["firstname"].value,
    email: myForm["email"].value,
    age: myForm["age"].value,
    datenaissance: myForm["datenaissance"].value,
  };

  console.log("data :>> ", data);
  console.log("data.lastname :>> ", data.lastname);
  console.log("data.firstname :>> ", data.firstname);

  // 3. Envoyer à l'API
  // > utilisation de la méthode fetch
});

//#region Vérification des champs

function checkLastnameValidity(input) {
  const lastnameError = document.getElementById("lastnameError");
  if (!requiredValidator(input)) {
    lastnameError.textContent = "Le champ Lastname est requis.";
    return false;
  } else {
    lastnameError.textContent = "";
  }

  if (!minLengthValidator(input, 2)) {
    lastnameError.textContent = "Le champ Lastname doit avoir minimum 2 caractères.";
    return false;
  } else {
    lastnameError.textContent = "";
  }
  if (!maxLengthValidator(input, 100)) {
    lastnameError.textContent = "Le champ Lastname doit avoir maximum 2 caractères.";
    return false;
  } else {
    lastnameError.textContent = "";
  }
  return true;
}

//#endregion

//#region Validators
function requiredValidator(input) {
  return input.value.trim() !== "";
}

function minLengthValidator(input, min) {
  return input.value.trim().length >= min;
}

function maxLengthValidator(input, max) {
  return input.value.trim().length <= max;
}

function minValidator(input, min) {
  try {
    return parseFloat(input.value) >= min;
  } catch (error) {
    return false;
  }
}

function emailValidator(input) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    input.value.trim(),
  );
}
//#endregion
