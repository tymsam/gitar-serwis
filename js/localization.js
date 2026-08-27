let translations = {};
const defaultLocale = navigator.language.split("-")[0];
const toggleLink = document.getElementById("toggle-locale");
let currentLocale = defaultLocale;

document.addEventListener("DOMContentLoaded", () => {
  setLocale(defaultLocale);
});

toggleLink.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default link behavior

  currentLocale = currentLocale === "en" ? "pl" : "en";
  setLocale(currentLocale);
});

const setLocale = async (newLocale) => {
  translations = await fetchTranslations(newLocale);
  translatePage();
};

const fetchTranslations = async (newLocale) => {
  const response = await fetch(`lang/${newLocale}.json`);

  return await response.json();
};

const translatePage = () => {
  document.querySelectorAll("[localization-key]").forEach((element) => {
    let keyString = element.getAttribute("localization-key");
    let keyArray = keyString.split(".");
    let result = translations;
    for (key of keyArray) {
      result = result[key];
    }
    element.innerHTML = result;
  });
};
