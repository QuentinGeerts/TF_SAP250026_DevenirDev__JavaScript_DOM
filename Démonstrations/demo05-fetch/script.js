/*
  Démonstration 05 - Fetch
*/

window.addEventListener("DOMContentLoaded", () => {
  getRandomCat();
  setInterval(getRandomCat, 2000);

  getCountries();

  const myForm = document.forms["agifyForm"];

  myForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Récupération des champs du formulaire
    const countryInput = myForm["country"];
    const firstnameInput = myForm["firstname"];

    const data = {
      name: firstnameInput.value,
      country_id: countryInput.value,
    };

    // Envoi des données

    const url = `https://api.agify.io/?name=${data.name}` + (data.country_id === "" ? "" : `&country_id=${data.country_id}`);
    // const url = "https://api.agify.io/";

    const response = await fetch(url);

    const r = await response.json();
    r.countryName =
      countryInput.options[countryInput.selectedIndex].textContent;

    console.log("responseJson :>> ", r);
    /*
    age
    count
    countryName
    country_id
    name
    */

    if (data.country_id === "") {
      document.getElementById("resultat").textContent = `${r.name} est agé de ${r.age} ans.`;
    }
    else {
      document.getElementById("resultat").textContent = `${r.name} en ${r.countryName} est agé de ${r.age} ans.`;
    }


  });

  const loginForm = document.forms["loginForm"];

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = loginForm["email"];
    const passwordInput = loginForm["password"];

    const credentials = { 
      email: emailInput.value, 
      password: passwordInput.value 
    };

    console.log('credentials :>> ', credentials);

    const loginResponse = await (await fetch("https://localhost:7028/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })).json();

    console.log('loginResponse :>> ', loginResponse);
    console.log('loginResponse.token :>> ', loginResponse.token);
    console.log('loginResponse.expiration :>> ', loginResponse.expiration);

  })
});

function getRandomCat() {
  const BASE_URL = "https://cataas.com/cat";

  fetch(BASE_URL)
    .then(async (response) => {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      document.getElementById("img").src = blobUrl;
    })
    .catch((error) => console.log("error:", error));
}

async function getCountries() {
  const URL = "https://restcountries.com/v3.1/all?fields=cca2,translations";

  const response = await fetch(URL);
  const countries = await response.json();

  // Tri sur base d'une propriété d'un objet !!!
  countries.sort((c1, c2) => {
    if (c1.translations.fra.common > c2.translations.fra.common) {
      return 1;
    } else {
      return -1;
    }
  });

  console.log("countries :>> ", countries);

  const select = document.getElementById("country");

  for (const country of countries) {
    const option = select.appendChild(document.createElement("option"));
    option.textContent = country.translations.fra.common;
    option.value = country.cca2;
    if (country.cca2 === "BE") option.toggleAttribute("selected");
  }
}


