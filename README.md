# JavaScript - Manipulation du DOM

Ce dépôt contient les démonstrations et exercices réalisés en classe sur la manipulation du DOM avec JavaScript.

## Table des matières

- [Démonstration 01 - Gestion des éléments](#démonstration-01---gestion-des-éléments)
  - [1. Récupérer des éléments HTML](#1-récupérer-des-éléments-html)
  - [2. Créer un élément HTML](#2-créer-un-élément-html)
  - [3. Insérer un élément dans le DOM](#3-insérer-un-élément-dans-le-dom)
  - [4. Supprimer un élément HTML](#4-supprimer-un-élément-html)
  - [5. Récupérer les enfants d'un élément](#5-récupérer-les-enfants-dun-élément)
- [Démonstration 02 - Les événements](#démonstration-02---les-événements)
  - [1. Ajouter et retirer des événements](#1-ajouter-et-retirer-des-événements)
  - [2. Types d'événements courants](#2-types-dévénements-courants)
  - [3. Travailler avec les formulaires](#3-travailler-avec-les-formulaires)
- [Exercice 01 - Liste dynamique](#exercice-01---liste-dynamique)

---

## Démonstration 01 - Gestion des éléments

### 1. Récupérer des éléments HTML

Il existe plusieurs méthodes pour récupérer des éléments HTML depuis le DOM :

#### 1.1. Sur base de l'id

```javascript
const maDiv = document.getElementById("maDiv");
```

- **Retourne** : Un seul élément `HTMLElement` ou `null` si non trouvé
- **Utilisation** : Quand vous savez que l'élément a un id unique

#### 1.2. Sur base de la classe

```javascript
const titles = document.getElementsByClassName("title");
```

- **Retourne** : Une `HTMLCollection` (liste live d'éléments)
- **Important** : La collection est "live", elle se met à jour automatiquement si le DOM change
- **Parcourir** : Utilisez une boucle `for...of`

```javascript
for (const title of titles) {
  console.log(title);
}
```

#### 1.3. Sur base du nom de la balise

```javascript
const allParagraphes = document.getElementsByTagName("p");
```

- **Retourne** : Une `HTMLCollection` de tous les éléments avec cette balise
- **Exemple** : Récupérer tous les paragraphes, tous les boutons, etc.

#### 1.4. Sur base d'un sélecteur CSS (⭐ Méthode recommandée)

**Pour un seul élément :**

```javascript
const firstParagraphAfterTitle = document.querySelector(".title + p");
```

- **Retourne** : Le **premier** élément correspondant au sélecteur CSS, ou `null`

**Pour tous les éléments :**

```javascript
const allFirstParagraphAfterTitle = document.querySelectorAll(".title + p");
```

- **Retourne** : Une `NodeList` (liste statique d'éléments)
- **Avantage** : Vous pouvez utiliser n'importe quel sélecteur CSS
- **Différence avec HTMLCollection** : La NodeList est statique, elle ne se met pas à jour automatiquement

### 2. Créer un élément HTML

#### 2.1. Créer l'élément

```javascript
const customButton = document.createElement("button");
```

#### 2.2. Paramétrer l'élément

**Contenu texte :**

```javascript
customButton.textContent = "🚀 Hello World ! ❤️";
```

**Attributs :**

```javascript
customButton.id = "btn";
customButton.title = "Waouw le monde est beau !";
```

**Classes CSS :**

```javascript
// Méthode 1 : className (remplace toutes les classes)
customButton.className = "btn btn-light btn-color-white";

// Méthode 2 : classList (⭐ Recommandée)
customButton.classList.add("btn");
customButton.classList.remove("btn-light");
customButton.classList.replace("btn-light", "btn-dark");
customButton.classList.toggle("active"); // Ajoute si absent, retire si présent
```

**Événements :**

```javascript
customButton.addEventListener("click", () => {
  alert("T'as cliqué sur mon magnifique bouton, merci ! ❤️");
});
```

### 3. Insérer un élément dans le DOM

Un élément créé avec `createElement` n'est pas visible tant qu'il n'est pas inséré dans le DOM.

#### 3.1. Ajouter en tant que dernier enfant

**Méthode 1 : `append()`**

```javascript
const parentWrapper = document.querySelector("#wrapper");
parentWrapper.append(customButton);
```

- Peut accepter plusieurs éléments
- Peut accepter du texte directement

**Méthode 2 : `appendChild()`**

```javascript
const newP = parentWrapper.appendChild(document.createElement("p"));
newP.textContent = "Mon paragraphe fraichement créé.";
```

- Ne peut accepter qu'un seul élément à la fois
- **Retourne** l'élément ajouté

#### 3.2. Insérer à une position spécifique

```javascript
const smallButton = newP.insertAdjacentElement("afterbegin", document.createElement("button"));
smallButton.textContent = "‼️";
```

**Positions possibles :**

- `"beforebegin"` : Avant l'élément lui-même
- `"afterbegin"` : Juste après l'ouverture de l'élément (premier enfant)
- `"beforeend"` : Juste avant la fermeture de l'élément (dernier enfant)
- `"afterend"` : Après l'élément lui-même

```html
<!-- beforebegin -->
<div>
  <!-- afterbegin -->
  <p>Contenu</p>
  <!-- beforeend -->
</div>
<!-- afterend -->
```

### 4. Supprimer un élément HTML

**Méthode 1 : Depuis le parent**

```javascript
const removedh3 = maDiv.removeChild(document.querySelector("h3.title"));
```

- Nécessite de connaître le parent
- **Retourne** l'élément supprimé

**Méthode 2 : Directement (⭐ Recommandée)**

```javascript
smallButton.remove();
```

- Plus simple et plus direct
- Ne retourne rien

### 5. Récupérer les enfants d'un élément

```javascript
console.log(maDiv.children); // HTMLCollection des enfants

for (const child of maDiv.children) {
  console.log(child);
}
```

**Vider un élément de tous ses enfants :**

```javascript
maDiv.textContent = "";
```

---

## Démonstration 02 - Les événements

### 1. Ajouter et retirer des événements

#### ❌ Ancienne méthode (à éviter)

```javascript
btn.onclick = helloWorld;
```

**Problèmes :**

- Ne peut avoir qu'un seul gestionnaire d'événement
- Écrase les gestionnaires précédents

#### ✅ Méthode recommandée : addEventListener

```javascript
btn.addEventListener("click", helloWorld);
btn.addEventListener("click", time);
```

**Avantages :**

- Peut avoir plusieurs gestionnaires pour le même événement
- Meilleur contrôle et flexibilité

#### Retirer un événement

```javascript
btn.removeEventListener("click", time);
```

**Important :** Pour pouvoir retirer un événement, la fonction doit être nommée (pas de fonction anonyme).

### 2. Types d'événements courants

#### Événements de souris

```javascript
element.addEventListener("click", callback);        // Clic gauche
element.addEventListener("dblclick", callback);     // Double-clic
element.addEventListener("contextmenu", callback);  // Clic droit
element.addEventListener("mouseenter", callback);   // Souris entre dans l'élément
element.addEventListener("mouseleave", callback);   // Souris sort de l'élément
```

#### Événements de clavier

```javascript
element.addEventListener("keydown", callback);   // Touche enfoncée
element.addEventListener("keyup", callback);     // Touche relâchée
element.addEventListener("keypress", callback);  // Touche pressée (déprécié)
```

#### Événements de formulaire

```javascript
form.addEventListener("submit", callback);     // Soumission du formulaire
input.addEventListener("input", callback);     // Valeur modifiée (en temps réel)
input.addEventListener("change", callback);    // Valeur modifiée (après blur)
input.addEventListener("focus", callback);     // Élément reçoit le focus
input.addEventListener("blur", callback);      // Élément perd le focus
```

#### L'objet Event

```javascript
element.addEventListener("click", (event) => {
  console.log(event);           // L'objet événement
  console.log(event.target);    // L'élément qui a déclenché l'événement
  console.log(event.type);      // Le type d'événement ("click")
  
  event.preventDefault();       // Annule le comportement par défaut
  event.stopPropagation();      // Empêche la propagation de l'événement
});
```

**Exemple : Bloquer le menu contextuel**

```javascript
window.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // Empêche le clic droit d'ouvrir le menu
  console.log("Clic droit exécuté.");
});
```

**Exemple : Détecter la touche Enter**

```javascript
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    // Faire quelque chose
  }
});
```

### 3. Travailler avec les formulaires

#### 3.1. Récupérer un formulaire

Il existe plusieurs façons de récupérer un formulaire :

```javascript
// Par index
const myForm = document.forms[0];

// Par id
const myForm = document.forms["formId"];

// Par nom (⭐ Recommandé)
const myForm = document.forms.formName;

// Avec item()
const myForm = document.forms.item(0);

// Avec namedItem() (✅ Recommandé)
const myForm = document.forms.namedItem("formName");
```

#### 3.2. Récupérer les champs du formulaire

```javascript
const inputLastname = myForm.elements["lastname"];
// ou plus court :
const inputLastname = myForm["lastname"];
```

#### 3.3. Gérer la soumission du formulaire

```javascript
myForm.addEventListener("submit", (e) => {
  e.preventDefault(); // ⚠️ Important : Empêche le rechargement de la page
  
  // Récupérer les valeurs
  console.log(inputLastname.value);
  
  // Accéder aux autres champs
  const ageInput = myForm["age"];
  const dateNaissanceInput = myForm["datenaissance"];
});
```

#### 3.4. Valeurs typées des inputs

```javascript
// Input type="text"
console.log(inputLastname.value); // String

// Input type="number"
console.log(ageInput.value);         // String (ex: "25")
console.log(ageInput.valueAsNumber); // Number (ex: 25)

// Input type="date"
console.log(dateNaissanceInput.value);       // String (ex: "2000-01-15")
console.log(dateNaissanceInput.valueAsDate); // Date object
```

#### 3.5. Validation des champs

```javascript
const inputLastname = myForm["lastname"];

// Vérifier la validité
if (inputLastname.validity.tooShort) {
  console.log("Le champ est trop court");
}

if (inputLastname.validity.tooLong) {
  console.log("Le champ est trop long");
}

if (inputLastname.validity.valueMissing) {
  console.log("Le champ est requis");
}

if (inputLastname.validity.valid) {
  console.log("Le champ est valide");
}
```

**Propriétés de validité disponibles :**

- `valid` : `true` si le champ est valide
- `valueMissing` : `true` si le champ requis est vide
- `tooShort` : `true` si la valeur est plus courte que `minlength`
- `tooLong` : `true` si la valeur est plus longue que `maxlength`
- `typeMismatch` : `true` si le type ne correspond pas (ex: email invalide)
- `patternMismatch` : `true` si la valeur ne correspond pas au pattern
- `rangeUnderflow` : `true` si la valeur est inférieure à `min`
- `rangeOverflow` : `true` si la valeur est supérieure à `max`

#### 3.6. Écouter les modifications en temps réel

```javascript
inputLastname.addEventListener("input", (e) => {
  const field = e.target;
  console.log("Nouvelle valeur :", field.value);
});
```

**Différence entre `input` et `change` :**

- `input` : Se déclenche à **chaque modification** (temps réel)
- `change` : Se déclenche quand l'élément **perd le focus** après modification

---

## Exercice 01 - Liste dynamique

Cet exercice combine les notions vues dans les deux démonstrations.

### Objectif

Créer une liste dynamique où l'utilisateur peut :

1. Entrer du texte dans un champ
2. Ajouter ce texte à une liste en cliquant sur un bouton
3. Supprimer un élément de la liste

### Concepts utilisés

#### 1. Attendre que le DOM soit chargé

```javascript
window.addEventListener("DOMContentLoaded", () => {
  // Votre code ici
});
```

**Pourquoi ?** Assure que tous les éléments HTML sont chargés avant d'exécuter le JavaScript.

#### 2. Récupérer les éléments

```javascript
const userInput = document.getElementById("userInput");
const btnAdd = document.getElementById("btn-add");
const list = document.getElementById("list");
```

#### 3. Ajouter un élément à la liste

```javascript
function addValue() {
  // Nettoyer et récupérer la valeur
  const cleanValue = userInput.value.trim();
  
  // Vérifier que la valeur n'est pas vide
  if (cleanValue === "") return;
  
  // Créer et ajouter le <li>
  const li = list.appendChild(document.createElement("li"));
  li.textContent = cleanValue;
  
  // Créer le bouton de suppression
  const btnRemove = li.insertAdjacentElement("beforeend", document.createElement("button"));
  btnRemove.textContent = "🗑️";
  btnRemove.addEventListener("click", removeValue);
  
  // Nettoyer le champ et remettre le focus
  userInput.value = "";
  userInput.focus();
}
```

#### 4. Supprimer un élément

```javascript
function removeValue(event) {
  // event.target = le bouton cliqué
  // parentElement = le <li> parent du bouton
  event.target.parentElement.remove();
}
```

#### 5. Gérer la touche Enter

```javascript
userInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addValue();
  }
});
```

## Ressources utiles

- [MDN - Introduction au DOM](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction)
- [MDN - Guide des événements](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Building_blocks/Events)
- [MDN - Validation des formulaires](https://developer.mozilla.org/fr/docs/Learn/Forms/Form_validation)

---

## Auteur

Cours réalisé dans le cadre de la formation **TF_SAP250026_DevenirDev** - JavaScript DOM
