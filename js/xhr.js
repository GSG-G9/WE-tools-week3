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
		weather4Days: [
			{ dayName: "FR", todayTemp: 20 },
			{ dayName: "SAT", todayTemp: 15 },
		],
	},
];
localStorageModule.set("appData", testArr_0);
//request Xhr function - take callback - url
const requestXhr = (url, callback, errorHandle) => {
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
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
let query = () =>
	localStorageModule.get("appData").forEach((obj) => {
		requestXhr(
			weatherApiUrl(obj.location.lat, obj.location.long),
			(req) => setWeatherDataToLocalStorage(req, obj.id),
			errorHandle
		);
	});

const setWeatherDataToLocalStorage = (req, id) => {
	//need more work
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const newObj = {
		id,
		dayName: days[new Date(req.location.localtime).getDay()],
		todayTemp: req.current.temp_c,
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
