const chooseCountryContent = document.querySelector(
  ".choose-country__content-country"
);
const chooseCountryContentName = document.querySelector(
  ".choose-country__content-country__name"
);
const chooseCountryContentButton = document.querySelector(
  ".choose-country__content-button"
);
const container = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Fout bij het ophalen van landen");

    const countries = await response.json();
    let selectedCountries = [];

    chooseCountryContentButton.addEventListener("click", () => {
      // if (
      //   !chooseCountryContent.classList.contains(
      //     "choose-country__content-country--active"
      //   )
      // ) {
      chooseCountryContent.classList.add(
        "choose-country__content-country--active"
      );
      chooseCountryContentButton.textContent = "🎉";

      const timestamp = new Date().toLocaleString("nl-NL", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Controleer of alle landen zijn gekozen, reset indien nodig
      if (selectedCountries.length === countries.length) {
        selectedCountries = [];
      }

      // Kies een nieuw land dat nog niet gekozen is
      let randomCountry;
      do {
        randomCountry = countries[Math.floor(Math.random() * countries.length)];
      } while (selectedCountries.includes(randomCountry.cca3)); // Gebruik landcode als unieke ID

      selectedCountries.push(randomCountry.cca3);
      console.log(selectedCountries);

      const chosenCountry = randomCountry.translations.nld.common;
      const flag = randomCountry.flags.svg;

      // Controleer of er al een vlag is
      const existingFlag = chooseCountryContent.querySelector("img");
      if (existingFlag) {
        existingFlag.src = flag;
        existingFlag.alt = `Vlag van ${chosenCountry}`;
      } else {
        chooseCountryContent.insertAdjacentHTML(
          "afterbegin",
          `<img src="${flag}" alt="Vlag van ${chosenCountry}" class="choose-country__content-country__flag">`
        );
      }

      chooseCountryContentName.textContent = chosenCountry;

      // Maak een nieuwe resultaatkaart
      const countryResults = document.createElement("div");
      countryResults.classList.add("choose-country-results");
      countryResults.innerHTML = `
          <img src="${flag}" class="choose-country-results__flag" alt="Vlag van ${chosenCountry}">
          <div class="choose-country-results-details">
            <p class="choose-country-results-details__country">${chosenCountry}</p>
            <p class="choose-country-results-details__timestamp">Gekozen op ${timestamp} uur.</p>
          </div>
        `;
      container.appendChild(countryResults);
      // } else {
      //   console.log("Er is al een land gekozen.");
      // }
    });
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
  }
});
