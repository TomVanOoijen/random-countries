const chooseCountryCountry = document.querySelector(
  ".choose-country__content-country"
);
const chooseCountryName = document.querySelector(
  ".choose-country__content-country__name"
);
const chooseCountryButton = document.querySelector(
  ".choose-country__content-button"
);
const container = document.querySelector(".container");
document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Fetch countries
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Fout bij het ophalen van landen");

    const countries = await response.json();

    chooseCountryButton.addEventListener("click", () => {
      // Check if country is already chosen
      if (
        !chooseCountryCountry.classList.contains(
          "choose-country__content-country--active"
        )
      ) {
        chooseCountryCountry.classList.add(
          "choose-country__content-country--active"
        );

        chooseCountryButton.textContent = "🎉";

        const timestamp = new Date().toLocaleString("nl-NL", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        // Choose random country
        const randomCountry =
          countries[Math.floor(Math.random() * countries.length)];
        const chosenCountry = randomCountry.translations.nld.common;
        const flag = randomCountry.flags.svg;

        // Checking if there is already a flag
        const existingFlag = chooseCountryCountry.querySelector("img");

        if (existingFlag) {
          existingFlag.src = flag;
          existingFlag.alt = `Vlag van ${chosenCountry}`;
        } else {
          chooseCountryCountry.insertAdjacentHTML(
            "afterbegin",
            `<img src="${flag}" alt="Vlag van ${chosenCountry}" class="choose-country__content-country__flag">`
          );
        }

        chooseCountryName.textContent = chosenCountry;

        // Create country results
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
      } else {
        console.log("Er is al een land gekozen.");
      }
    });
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
  }
});
