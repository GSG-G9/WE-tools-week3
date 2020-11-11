//Local Storage Module
const localStorageModule = (() => {
	return {
		set: (name, data) => localStorage.setItem(name, JSON.stringify(data)),
		get: (name) => JSON.parse(localStorage.getItem(name)),
	};
})();

const testArr_0 = [
	{
		id: Math.floor(Math.random() * 100000) + new Date().getTime().toString(16),
		cityName: "Gaza",
		location: {
			long: 34,
			lat: 31,
		},
		currencySymbol: "ILS",
		currencyValue: 1,
		dayName: "THR",
		todayTemp: 25,
		weather4Days: [
			{ dayName: "FR", todayTemp: 20 },
			{ dayName: "SAT", todayTemp: 15 },
		],
	},
	{
		id: Math.floor(Math.random() * 100000) + new Date().getTime().toString(16),
		cityName: "newyork",
		location: {
			long: 20,
			lat: 11,
		},
		currencySymbol: "USD",
		currencyValue: 1,
		dayName: "THR",
		todayTemp: 25,
		weather4Days: [
			{ dayName: "FR", todayTemp: 20 },
			{ dayName: "SAT", todayTemp: 15 },
		],
	},
	{
		id: Math.floor(Math.random() * 100000) + new Date().getTime().toString(16),
		cityName: "paris",
		location: {
			long: -4,
			lat: 20,
		},
		dayName: "THR",
		todayTemp: 25,
		currencySymbol: "EUR",
		currencyValue: 1,
		weather4Days: [
			{ dayName: "FR", todayTemp: 20 },
			{ dayName: "SAT", todayTemp: 15 },
		],
	},
];
localStorageModule.set("appData", testArr_0);

// localStorageModule.set("renderData", localStorageModule.get("appData").splice(2));
// localStorageModule.get("renderData");
//request Xhr function - take callback - url
const requestXhr = (url, callback, errorHandle) => {
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log(JSON.parse(xhr.responseText));
				callback(JSON.parse(xhr.responseText));
				return;
			}
			errorHandle(xhr.status);
			return;
		}
	};

	xhr.onerror = (error) => {
		errorHandle(error.type);
	};

	xhr.open("GET", url);
	xhr.send();
};

const errorHandle = (error) => {
	switch (error) {
		case "error":
			console.log("problem in xhr request");
			break;
		case 400:
			console.log("bad request");
			break;
		case 401:
			console.log("unauthorized");
			break;
		case 402:
			console.log("402");
			break;
		case 403:
			console.log("403");
			break;
		case 404:
			console.log("404");
			break;
		case 500:
			console.log("500");
			break;
		case 501:
			console.log("501");
			break;
		default:
			console.log("problem in  request");
			break;
	}
};

const weatherApiUrl = (lat, long) =>
	`http://api.weatherapi.com/v1/forecast.json?key=${config.weatherApiKey}&q=${lat},${long}&days=3`;
const currencyExchangeApi = (baseCurrency) =>
	`https://api.exchangeratesapi.io/latest?base=ILS&symbols=${baseCurrency}`;

const currencyExchangeApiBase = "https://api.exchangeratesapi.io/latest?base=";

let query = () =>
	localStorageModule.get("appData").forEach((obj) => {
		requestXhr(
			weatherApiUrl(obj.location.lat, obj.location.long),
			(req) => setWeatherDataToLocalStorage(req, obj.id),
			errorHandle
		);
		requestXhr(
			currencyExchangeApi(obj.currencySymbol),
			(req) => setCurrencyDataToLocalStorage(req, obj.id),
			errorHandle
		);
	});

const setCurrencyDataToLocalStorage = (req, id) => {
	const newObj = {
		id,
		currencyValue: Object.values(req.rates)[0],
	};
	const updatedArr = editObject(newObj, localStorageModule.get("appData"));
	localStorageModule.set("appData", updatedArr);
};

const setWeatherDataToLocalStorage = (req, id) => {
	//need more work
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const newObj = {
		id,
		dayName: days[new Date(req.location.localtime).getDay()],
		todayTemp: req.current.temp_c,
		weatherIcon: req.current.condition.icon.split("//")[1],
		weather4Days: [
			{
				dayName: days[new Date(req.forecast.forecastday[1].date).getDay()],
				todayTemp: req.forecast.forecastday[1].day.avgtemp_c,
			},
			{
				dayName: days[new Date(req.forecast.forecastday[2].date).getDay()],
				todayTemp: req.forecast.forecastday[2].day.avgtemp_c,
			},
		],
	};
	const updatedArr = editObject(newObj, localStorageModule.get("appData"));
	localStorageModule.set("appData", updatedArr);
};

query();

////Cached Values for Currency Exchanger

//Cached Values for Currency Exchanger
const cacheValues = (() => {
	cachedRate = {};
	return {
		set: (baseCurrency, returnRate) =>
			(cachedRate[baseCurrency] = {
				rates: returnRate,
				timestamp: Date.now(),
			}),
		get: (baseCurrency) => cachedRate[baseCurrency],
	};
})();
//Get Rates from Api and set cache
const getRates = (baseCurrency, callback) => {
	requestXhr(`${currencyExchangeApiBase}${baseCurrency}`, (res) => {
		const returnRate = res.rates;
		cacheValues.set(baseCurrency, returnRate);
		callback(returnRate);
	});
};
//General function to used with change event
const calculateRate = () => {
	const baseCurrency = baseSelect.value;
	const targetCurrency = targetSelect.value;
	if (
		cacheValues.get(baseCurrency) !== undefined &&
		Date.now() - cacheValues.get(baseCurrency).timestamp < 1000 * 60
	) {
		const rate = cacheValues.get(baseCurrency).rates[targetCurrency];
		target.value = rate * base.value;
		return;
	}
	getRates(baseCurrency, (rates) => {
		target.value = rates[targetCurrency] * base.value;
	});
};

//add event listener to currency inputs :)
[base, baseSelect, targetSelect].forEach((node) =>
	node.addEventListener("change", calculateRate)
);
