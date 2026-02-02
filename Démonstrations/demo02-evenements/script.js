/*
  Démonstration 02 - Les événements
*/

const btn = document.getElementById("btn");

// btn.onclick = helloWorld;
// btn.onclick = time;
// btn.onclick = () => {
//   helloWorld();
//   time();
// };

function helloWorld() {
  console.log("Hello World !");
}

function time() {
  console.log("Il est bientôt 16h.");
}

// Permet d'ajouter le callback à l'événement "click"
btn.addEventListener("click", helloWorld);
btn.addEventListener("click", time);

// Permet de retirer le callback de l'événement "click"
btn.removeEventListener("click", time);

// 2.  Types d'événements
window.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // permet d'annuler le comportement par défaut

  console.log("Clic droit exécuté.");
  console.log("event :>> ", event);
});

// 3.  Récupération d'un formulaire

// const myForm = document.forms[0];
// const myForm = document.forms["formId"];
// const myForm = document.forms.formName; // ❤️
// const myForm = document.forms.item(0); // Idem que forms[0]
const myForm = document.forms.namedItem("formName"); // ✅

// const inputLastname = myForm.elements["lastname"];
const inputLastname = myForm["lastname"];

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("event:", e);

  console.dir(myForm.values);

  console.log("inputLastname.value :>> ", inputLastname.value);
  console.dir(inputLastname);

  if (inputLastname.validity.tooShort) {
    console.log("Le champ n'est pas bon");
  }

  const ageInput = myForm["age"];
  const dateNaissanceInput = myForm["datenaissance"];

  console.log('ageInput.valueAsNumber :>> ', ageInput.valueAsNumber);
  console.log('dateNaissanceInput.valueAsDate :>> ', dateNaissanceInput.valueAsDate);

});

inputLastname.addEventListener("input", (e) => {
  console.log("e :>> ", e);

  const field = e.target;

  console.log("field :>> ", field);
});
