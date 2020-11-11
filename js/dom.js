const widgetsContainer = document.getElementById("widgets");
const allWidgetsItem = document.querySelectorAll(".container .widgets-item");

allWidgetsItem.forEach((item) => {
  // item.remove();
});


const forTestArray = [
  {
    dayName: "THR",
    todayTemp: 25,
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
  {
    dayName: "THR",
    todayTemp: 25,
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
  {
    dayName: "THR",
    todayTemp: 25,
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
  {
    dayName: "THR",
    todayTemp: 25,
    weather4Days: [
      { dayName: "FR", todayTemp: 20 },
      { dayName: "SAT", todayTemp: 15 },
      { dayName: "SUN", todayTemp: 18 },
      { dayName: "MOn", todayTemp: 17 },
    ],
  },
];

const color = ["#e5e522", "#e525d5", "#d555d5", "#27ff9c"];

const renderWidgets = (array) => {
  return array.forEach((item) => {
    const widgetsItem = document.createElement("div");
    widgetsItem.setAttribute("class", "widgets-item");
    widgetsItem.style.borderTop = `35px solid ${color[Math.floor(Math.random()*4)]}`;

    const weatherDetailsSection = document.createElement("div");
    weatherDetailsSection.setAttribute("class", "weather-details-section");

    const weatherDetailsToday = document.createElement("div");
    weatherDetailsToday.setAttribute("class", "weather-details--today");

    // Waether Detailes Div
    const weatherDetailsTodayBox = document.createElement("div");
    weatherDetailsTodayBox.setAttribute("class", "weather-details--today--box");

    // Day Name Div
    const weatherDetailsTodaysName = document.createElement("div");
    weatherDetailsTodaysName.setAttribute(
      "class",
      "weather-details--todays__name"
    );
    const weatherDetailsAllDaysNameText = document.createElement("h2");
    weatherDetailsAllDaysNameText.textContent = item.dayName;
    weatherDetailsTodaysName.appendChild(weatherDetailsAllDaysNameText);

    // Icon Div
    const weatherDetailsTodayIcon = document.createElement("div");
    weatherDetailsTodayIcon.setAttribute(
      "class",
      "weather-details--today__icon"
    );
    const weatherIcons = document.createElement("i");
    weatherIcons.setAttribute("class", "fas fa-cloud-sun");
    weatherDetailsTodayIcon.appendChild(weatherIcons);

    // Weather Temp Div
    const weatherDetailsTodayTemp = document.createElement("div");
    weatherDetailsTodayTemp.setAttribute(
      "class",
      "weather-details--today__temp"
    );
    weatherDetailsTodayTemp.textContent = item.todayTemp + " C";

    // Clock Section
    const clockSection = document.createElement("div");
    clockSection.setAttribute("class", "clock-section");
    setInterval(() => {
      clockSection.textContent = new Date().toLocaleTimeString();
    }, 1000);

    // append element to weatherDetailsTodayBox
    weatherDetailsTodayBox.appendChild(weatherDetailsTodaysName);
    weatherDetailsTodayBox.appendChild(weatherDetailsTodayIcon);
    weatherDetailsTodayBox.appendChild(weatherDetailsTodayTemp);
    weatherDetailsToday.appendChild(weatherDetailsTodayBox);
    weatherDetailsToday.appendChild(clockSection);

    // widgetsContainer.appendChild(widgetsItem);

    // Weather For 4 Days
    const weatherDetailsAllDays = document.createElement("div");
    weatherDetailsAllDays.setAttribute("class", "weather-details--allDays");

    const allDayItem = item.weather4Days.forEach((element) => {
      const weatherDetailsDay = document.createElement("div");
      weatherDetailsDay.setAttribute("class", "weather-details--day");

      const weatherDetailsAllDaysName = document.createElement("div");
      weatherDetailsAllDaysName.setAttribute(
        "class",
        "weather-details--allDays__name"
      );

      const weatherDetailsAllDaysNameText = document.createElement("h2");
      weatherDetailsAllDaysNameText.textContent = element.dayName;
      weatherDetailsAllDaysName.appendChild(weatherDetailsAllDaysNameText);

      const weatherDetailsAllDaysIcon = document.createElement("div");
      weatherDetailsAllDaysIcon.setAttribute(
        "class",
        "weather-details--allDays__icon"
      );
      const icon = document.createElement("i");
      icon.setAttribute("class", "fas fa-cloud-sun");
      weatherDetailsAllDaysIcon.appendChild(icon);

      const weatherDetailsAlldayTemp = document.createElement("div");
      weatherDetailsAlldayTemp.setAttribute(
        "class",
        "weather-details--today__temp"
      );
      weatherDetailsAlldayTemp.textContent = element.todayTemp + " C";

      weatherDetailsDay.appendChild(weatherDetailsAllDaysName);
      weatherDetailsDay.appendChild(weatherDetailsAllDaysIcon);
      weatherDetailsDay.appendChild(weatherDetailsAlldayTemp);
      weatherDetailsAllDays.appendChild(weatherDetailsDay);
    });
    weatherDetailsSection.appendChild(weatherDetailsToday);
    weatherDetailsSection.appendChild(weatherDetailsAllDays);
    widgetsItem.appendChild(weatherDetailsSection);

    // Currency section Element
    const currenciesSection = document.createElement("div");
    currenciesSection.setAttribute("class", "currencies-section");

    // Currency Box Elemen
    const currenciesBox = document.createElement("div");
    currenciesBox.setAttribute("class", "currencies--box");

    // Inter Currency Element
    const currenciesIntr = document.createElement("div");
    currenciesIntr.setAttribute("class", "currencies-intr");

    const currenciesIntrName = document.createElement("div");
    currenciesIntrName.setAttribute("class", "currencies-intr--name");
    currenciesIntrName.textContent = "USD";

    const currenciesIntrValue = document.createElement("div");
    currenciesIntrValue.setAttribute("class", "currencies-intr--value");

    const InterCurrencySympole = document.createElement("span");
    InterCurrencySympole.setAttribute("class", "sympole");
    InterCurrencySympole.textContent = "$";

    currenciesIntrValue.textContent = 1;
    currenciesIntrValue.insertAdjacentElement(
      "beforeend",
      InterCurrencySympole
    );

    currenciesIntr.appendChild(currenciesIntrName);
    currenciesIntr.appendChild(currenciesIntrValue);

    // Local Currency Element
    const currenciesLocal = document.createElement("div");
    currenciesLocal.setAttribute("class", "currencies-local");

    const currenciesLocalName = document.createElement("div");
    currenciesLocalName.setAttribute("class", "currencies-local--name");
    currenciesLocalName.textContent = "ILS";

    const currenciesLocalValue = document.createElement("div");
    currenciesLocalValue.setAttribute("class", "currencies-local--value");

    const localCurrencySympole = document.createElement("span");
    localCurrencySympole.setAttribute("class", "sympole");
    localCurrencySympole.textContent = "#";

    currenciesLocalValue.textContent = 3.4;
    currenciesLocalValue.insertAdjacentElement(
      "beforeend",
      localCurrencySympole
    );

    currenciesLocal.appendChild(currenciesLocalName);
    currenciesLocal.appendChild(currenciesLocalValue);

    currenciesBox.appendChild(currenciesIntr);
    currenciesBox.appendChild(currenciesLocal);

    currenciesSection.appendChild(currenciesBox);

    widgetsItem.appendChild(currenciesSection);
    widgetsContainer.appendChild(widgetsItem);
  });
};

document.addEventListener("DOMContentLoaded", (e) => {
  renderWidgets(forTestArray);
});
