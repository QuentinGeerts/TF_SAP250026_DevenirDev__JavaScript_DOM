/*
  Exercice 01 - Liste dynamique

  Créer un programme qui permet à l'utilisateur d'encoder du texte dans un champ. 
  Le programme doit en appuyant sur un bouton, ajouter sous forme d'élément de liste 
  (li) la valeur entrée dans le champ.
*/

window.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("userInput");
  const btnAdd = document.getElementById("btn-add");
  const list = document.getElementById("list");

  btnAdd.addEventListener("click", addValue);

  userInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") addValue();
  });

  function addValue() {
    // // Créer le li
    // const li = document.createElement("li");

    // // Modifier le li
    // li.textContent = userInput.value;

    // // Ajouter le li au ul
    // list.append(li);

    const cleanValue = userInput.value.trim();
    userInput.value = "";
    userInput.focus();

    if (cleanValue === "") return;

    const li = list.appendChild(document.createElement("li"));
    li.textContent = cleanValue;

    const btnRemove = li.insertAdjacentElement(
      "beforeend",
      document.createElement("button"),
    );
    btnRemove.textContent = "🗑️";
    btnRemove.addEventListener("click", removeValue);
  }

  function removeValue(event) {
    // Event => événement click
    // target => cible de l'événement => bouton
    // parentElement => parent du bouton => li
    event.target.parentElement.remove();
  }
});
