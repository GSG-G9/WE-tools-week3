const addNewWidgetBtn = document.getElementById("add-new");
const closeSearchBoxBtn = document.getElementsByClassName("fa-times")[0];
const searchInputBoxModal = document.getElementsByClassName("search-input")[0];
const widgetsContainer = document.getElementById("widgets");
const allWidgetsItem = document.querySelectorAll(".container .widgets-item");
const cityInput = document.getElementById("city-input");
const resultContainer = document.getElementById("result");

cityInput.addEventListener("input", (e) => {
  // if(e.target.value === "") {
  //   resultContainer.childNodes[0].remove();
  // }
  renderSearchResult(searchCity(e.target.value, forTestArray));
});

addNewWidgetBtn.addEventListener("click", (e) => {
  window.scrollTo(0, 0);
  searchInputBoxModal.classList.add("block");
  searchInputBoxModal.classList.add("fade-in");
  searchInputBoxModal.classList.remove("fade-out");
  setTimeout(() => {
    searchInputBoxModal.classList.remove("fade-in");
  }, 350);
});

closeSearchBoxBtn.addEventListener("click", (e) => {
  searchInputBoxModal.classList.add("fade-out");
  setTimeout(() => {
    searchInputBoxModal.classList.remove("block");
    searchInputBoxModal.classList.remove("fade-out");
  }, 350);
});

const forTestArray = [
  {
    id: Math.floor(Math.random() * 1000000) + new Date().getTime().toString(16),
    dayName: "THR",
    todayTemp: 25,
    country: "Gaza",
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000) + new Date().getTime().toString(16),
    dayName: "THR",
    todayTemp: 25,
    country: "Cairo",
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000) + new Date().getTime().toString(16),
    dayName: "THR",
    todayTemp: 25,
    country: "Londom",
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000) + new Date().getTime().toString(16),
    dayName: "THR",
    todayTemp: 25,
    country: "Makka",
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000) + new Date().getTime().toString(16),
    dayName: "THR",
    todayTemp: 25,
    country: "Khanyounis",
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000) + new Date().getTime().toString(16),
    dayName: "THR",
    todayTemp: 25,
    country: "Rafah",
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
];

// Border Top Color
const color = ["#e5e522", "#e525d5", "#f50555", "#27ff9c", "#555", "#ec9900"];

// Render Search Result Functionality
const renderSearchResult = (arrayOfResult) => {
  // resultContainer.childNodes.forEach(item => item.remove());
  resultContainer.innerHTML = "";
  if (typeof arrayOfResult === "object") {
    return arrayOfResult.forEach((item) => {
      const resultItem = createDOMElmt("div", "class", "search-result-item");
      resultItem.textContent = item.country;
      resultItem.setAttribute("value", item.id);
      resultItem.addEventListener("click", (e) => {
        console.log(e.target.getAttribute("value"));
      });
      resultContainer.appendChild(resultItem);
    });
  }
};

// Function Get elementType, attType and attValue: return DOM Element
const createDOMElmt = (elementType, attType, attValue) => {
  const myDiv = document.createElement(elementType);
  if (attType && attValue) {
    myDiv.setAttribute(attType, attValue);
  }
  return myDiv;
};

// Function Reatuen AllDay Dom Element
const createAllDayElement = (item, parentElement) => {
  return item.weather4Days.forEach((element) => {
    const weatherDetailsDay = createDOMElmt(
      "div",
      "class",
      "weather-details--day"
    );

    const weatherDetailsAllDaysName = createDOMElmt(
      "div",
      "class",
      "weather-details--allDays__name"
    );

    const weatherDetailsAllDaysNameText = createDOMElmt("h2");

    weatherDetailsAllDaysNameText.textContent = element.dayName;
    weatherDetailsAllDaysName.appendChild(weatherDetailsAllDaysNameText);
    const weatherDetailsAllDaysIcon = createDOMElmt(
      "div",
      "class",
      "weather-details--allDays__icon"
    );
    const icon = createDOMElmt("i", "class", "fas fa-cloud-sun");
    weatherDetailsAllDaysIcon.appendChild(icon);

    const weatherDetailsAlldayTemp = createDOMElmt(
      "div",
      "class",
      "weather-details--today__temp"
    );

    weatherDetailsAlldayTemp.textContent = element.todayTemp + " C";

    weatherDetailsDay.appendChild(weatherDetailsAllDaysName);
    weatherDetailsDay.appendChild(weatherDetailsAllDaysIcon);
    weatherDetailsDay.appendChild(weatherDetailsAlldayTemp);
    parentElement.appendChild(weatherDetailsDay);
  });
};

const renderWidgets = (array) => {
  let i = 0;
  return array.forEach((item) => {
    const widgetsItem = createDOMElmt("div", "class", "widgets-item");

    widgetsItem.style.borderTop = `35px solid ${color[i]}`;

    i++;
    if (i >= color.length) {
      i = 0;
    }

    const weatherDetailsSection = createDOMElmt(
      "div",
      "class",
      "weather-details-section"
    );
    const weatherDetailsToday = createDOMElmt(
      "div",
      "class",
      "weather-details--today"
    );

    // Waether Detailes Div
    const weatherDetailsTodayBox = createDOMElmt(
      "div",
      "class",
      "weather-details--today--box"
    );

    // Day Name Div
    const weatherDetailsTodaysName = createDOMElmt(
      "div",
      "class",
      "weather-details--todays__name"
    );

    const weatherDetailsAllDaysNameText = createDOMElmt("h2");

    weatherDetailsAllDaysNameText.textContent = item.dayName;
    weatherDetailsTodaysName.appendChild(weatherDetailsAllDaysNameText);

    // Icon Div
    const weatherDetailsTodayIcon = createDOMElmt(
      "div",
      "class",
      "weather-details--today__icon"
    );

    const weatherIcons = createDOMElmt("i", "class", "fas fa-cloud-sun");
    weatherDetailsTodayIcon.appendChild(weatherIcons);

    // Weather Temp Div
    const weatherDetailsTodayTemp = createDOMElmt(
      "div",
      "class",
      "weather-details--today__temp"
    );
    weatherDetailsTodayTemp.textContent = item.todayTemp + " C";

    // Clock Section
    const clockSection = createDOMElmt("div", "class", "clock-section");

    setInterval(() => {
      clockSection.textContent = new Date().toLocaleTimeString();
    }, 1000);

    // append element to weatherDetailsTodayBox
    weatherDetailsTodayBox.append(
      weatherDetailsTodaysName,
      weatherDetailsTodayIcon,
      weatherDetailsTodayTemp
    );

    weatherDetailsToday.append(weatherDetailsTodayBox, clockSection);

    // Weather For 4 Days
    const weatherDetailsAllDays = createDOMElmt(
      "div",
      "class",
      "weather-details--allDays"
    );

    createAllDayElement(item, weatherDetailsAllDays);

    weatherDetailsSection.append(weatherDetailsToday, weatherDetailsAllDays);

    const currenciesSection = createDOMElmt(
      "div",
      "class",
      "currencies-section"
    );

    const currenciesBox = createDOMElmt("div", "class", "currencies--box");

    const currenciesIntr = createDOMElmt("div", "class", "currencies-intr");

    const currenciesIntrName = createDOMElmt(
      "div",
      "class",
      "currencies-intr--name"
    );
    currenciesIntrName.textContent = "USD";
    const currenciesIntrValue = createDOMElmt(
      "div",
      "class",
      "currencies-intr--value"
    );
    const InterCurrencySympole = createDOMElmt("span", "class", "sympole");
    InterCurrencySympole.textContent = "$";

    currenciesIntrValue.textContent = 1;
    currenciesIntrValue.insertAdjacentElement(
      "beforeend",
      InterCurrencySympole
    );

    currenciesIntr.appendChild(currenciesIntrName);
    currenciesIntr.appendChild(currenciesIntrValue);

    // Local Currency Element
    const currenciesLocal = createDOMElmt("div", "class", "currencies-local");

    const currenciesLocalName = createDOMElmt(
      "div",
      "class",
      "currencies-local--name"
    );
    currenciesLocalName.textContent = "ILS";
    const currenciesLocalValue = createDOMElmt(
      "div",
      "class",
      "currencies-local--value"
    );

    const localCurrencySympole = createDOMElmt("span", "class", "sympole");

    localCurrencySympole.textContent = "#";

    currenciesLocalValue.textContent = 3.4;
    currenciesLocalValue.insertAdjacentElement(
      "beforeend",
      localCurrencySympole
    );

    currenciesLocal.append(currenciesLocalName, currenciesLocalValue);

    currenciesBox.append(currenciesIntr, currenciesLocal);

    currenciesSection.appendChild(currenciesBox);

    widgetsItem.append(weatherDetailsSection, currenciesSection);
    widgetsContainer.appendChild(widgetsItem);
  });
};

document.addEventListener("DOMContentLoaded", (e) => {
  renderWidgets(forTestArray);
});
