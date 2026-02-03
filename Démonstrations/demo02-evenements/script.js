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

