/*
  Démonstration 01 - Gestion des éléments au travers du DOM
*/

// 1.  Récupérer des éléments HTML

// 1.1.  Sur base de l'id
// > getElementById(id: string): HTMLElement | null

const maDiv = document.getElementById("maDiv");

// 1.2.  Sur base de la classe
// > getElementsByClassName(className: string): HTMLCollectionOf<Element>

const titles = document.getElementsByClassName("title");
console.log("titles :>> ", titles);

for (const title of titles) {
  console.log("title :>> ", title);
}

// 1.3.  Sur base du nom de la balise
// > getElementsByTagName(tagName: string): HTMLCollectionOf<...>
const allParagraphes = document.getElementsByTagName("p");
console.log("allParagraphes :>> ", allParagraphes);

for (const p of allParagraphes) {
  console.dir(p);
}

// 1.4.  Sur base d'un sélecteur CSS
// > querySelect(cssSelector: string): Element
const firstParagraphAfterTitle = document.querySelector(".title + p");
console.log("firstParagraphAfterTitle :>> ", firstParagraphAfterTitle);

// > querySelectAll(cssSelector: string): NodeList<Element>
const allFirstParagraphAfterTitle = document.querySelectorAll(".title + p");
console.log("allFirstParagraphAfterTitle :>> ", allFirstParagraphAfterTitle);

for (const p of allFirstParagraphAfterTitle) {
  console.log("p :>> ", p);
}

console.clear();

// 2.  Création d'un élément HTML
// > createElement(tagName: string): HTML...Element

const customButton = document.createElement("button");

// Paramétrage du bouton
customButton.textContent = "🚀 Hello World ! ❤️";
customButton.id = "btn";
customButton.title = "Waouw le monde est beau !";

customButton.className = "btn btn-light btn-color-white";
// customButton.className = "btn btn-light btn-color-white";

// Gestion des classes avec classList (préférence)
customButton.classList.replace("btn-light", "btn-dark");

console.log('customButton.classList :>> ', customButton.classList);

// Ajout d'un comportement habituel
customButton.addEventListener("click", () => {
  alert("T'as cliqué sur mon magnifique bouton, merci ! ❤️");
});

console.log("customButton :>> ", customButton);


// 3.  Insérer l'élément sur la page

// 3.1.  Ajouter en tant que dernier enfant
// > parent.append(...element: Element[]): void

const parentWrapper = document.querySelector("#wrapper");

parentWrapper.append(customButton);

// > parent.appendChild(element: Element): Element

const newP = parentWrapper.appendChild(document.createElement("p"));
newP.textContent = "Mon paragraphe fraichement créé.";

// 3.2.  Insérer à une position spécifique
// parent.insertAdjacentElement(position: InsertPosition: element: Element): Element

const smallButton = newP.insertAdjacentElement("afterbegin", document.createElement("button"));
smallButton.textContent = "‼️";


// 4.  Supprimer un élément HTML
// > parent.removeChild(element)
// > element.remove()

const removedh3 = maDiv.removeChild(document.querySelector("h3.title"));
smallButton.remove();

// 5.  Récupération de tous les enfants

console.log('maDiv.children :>> ', maDiv.children);

for (const child of maDiv.children) {
  console.log('child :>> ', child);
}

// for (let i = maDiv.children.length - 1; i > 0; i--) {
//   maDiv.children[i].remove();
// }

maDiv.textContent = "";
