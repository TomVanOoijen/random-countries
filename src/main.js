document.addEventListener("DOMContentLoaded", async function () {
  const chooseCountryCountry = document.querySelector(
    ".choose-country__country-details"
  );
  const chooseCountryName = document.querySelector(
    ".choose-country__country-details__name"
  );
  const chooseCountryButton = document.querySelector(".choose-country__button");
  const container = document.querySelector(".container");

  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Fout bij het ophalen van landen");

    const countries = await response.json();

    chooseCountryButton.addEventListener("click", () => {
      chooseCountryCountry.classList.add(
        "choose-country__country-details--active"
      );

      chooseCountryButton.textContent = "🎉";

      const timestamp = new Date().toLocaleString("nl-NL", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const randomCountry =
        countries[Math.floor(Math.random() * countries.length)];
      const chosenCountry = randomCountry.translations.nld.common;
      const flag = randomCountry.flags.svg;

      const existingFlag = chooseCountryCountry.querySelector("img");

      if (existingFlag) {
        existingFlag.src = flag;
        existingFlag.alt = `Vlag van ${chosenCountry}`;
      } else {
        chooseCountryCountry.insertAdjacentHTML(
          "afterbegin",
          `<img src="${flag}" alt="Vlag van ${chosenCountry}" class="choose-country__country-details__flag">`
        );
      }
      chooseCountryName.textContent = chosenCountry;

      const countryResults = document.createElement("div");
      countryResults.classList.add("choose-country-results");
      countryResults.innerHTML = `
      <img src=${flag} class="choose-country-results__flag" alt="Vlag van ${chosenCountry}">
      <div class="choose-country-results-details">
        <p class="choose-country-results-details__country">${chosenCountry}</p>
        <p class="choose-country-results-details__timestamp">Gekozen op ${timestamp} uur.</p>
      </div>
    `;
      container.appendChild(countryResults);
    });
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
  }
});
