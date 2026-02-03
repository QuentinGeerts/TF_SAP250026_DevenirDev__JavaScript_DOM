/*
  Démonstration 04 - Promises
*/

function demo01Promise(dividende, diviseur) {
  // Promise est asynchrone
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (diviseur === 0) throw new Error("Division par zéro impossible.");
        let resultat = dividende / diviseur;
        resolve(resultat);
      } catch (error) {
        reject(error);
      }
    }, 2000);
  });
}

(async () => {
  // Version 1 avec utilisation d'une promise avec then/catch
  demo01Promise(10, 3)
    .then((resultat) => console.log("10 / 3 = " + resultat))
    .finally(() => console.log("Fin de la première opération"));

  demo01Promise(10, 0)
    .catch((error) => console.log("error:", error))
    .finally(() => console.log("Fin de la deuxième opération"));

  console.log("Fin de l'opération.");

  // const resultat = await demo01Promise(10, 3);
  // console.log("resultat :>> ", resultat);

  // Version 2 avec utilistion des mot-clefs async / await
  try {
    const resultat2 = await demo01Promise(10, 0);
    console.log("resultat2 :>> ", resultat2);
  } catch (error) {
    console.log("error :>> ", error.message);
  }
})();
